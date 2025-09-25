const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

// 註冊路由
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        // 驗證必填欄位
        if (!username || !email || !password) {
            return res.status(400).json({
                message: '請填寫所有必填欄位'
            })
        }

        // 檢查用戶名或電子郵件是否已存在
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            return res.status(400).json({
                message: '用戶名或電子郵件已被使用'
            })
        }

        // 創建新用戶
        const user = new User({
            username,
            email,
            password,
            // 第一個註冊的用戶自動成為管理員
            isAdmin: (await User.countDocuments()) === 0
        })

        await user.save()

        // 生成 JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({
            message: '註冊成功',
            token,
            user: user.toPublicJSON()
        })

    } catch (error) {
        console.error('註冊錯誤:', error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: '資料驗證失敗',
                errors: Object.values(error.errors).map(e => e.message)
            })
        }

        res.status(500).json({ message: '伺服器錯誤，請稍後再試' })
    }
})

// 登入路由
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        console.log('🔍 登入請求:', { username, password: '***' })

        // 驗證必填欄位
        if (!username || !password) {
            console.log('❌ 缺少必填欄位')
            return res.status(400).json({
                message: '請輸入用戶名和密碼'
            })
        }

        // 查找用戶（支援用戶名或電子郵件登入）
        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        })
        console.log('👤 找到用戶:', user ? user.username : '無')

        if (!user) {
            console.log('❌ 用戶不存在')
            return res.status(401).json({
                message: '用戶名或密碼錯誤'
            })
        }

        // 驗證密碼
        const isPasswordValid = await user.comparePassword(password)
        console.log('🔐 密碼驗證結果:', isPasswordValid)

        if (!isPasswordValid) {
            console.log('❌ 密碼驗證失敗')
            return res.status(401).json({
                message: '用戶名或密碼錯誤'
            })
        }

        // 更新最後登入時間
        await user.updateLastLogin()

        // 生成 JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            message: '登入成功',
            token,
            user: user.toPublicJSON()
        })

    } catch (error) {
        console.error('登入錯誤:', error)
        res.status(500).json({ message: '伺服器錯誤，請稍後再試' })
    }
})

// 驗證 token 中間件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: '未提供認證令牌' })
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '無效的認證令牌' })
        }

        try {
            // 從數據庫獲取最新的用戶資訊
            const user = await User.findById(decoded.userId).select('-password')

            if (!user) {
                return res.status(404).json({ message: '用戶不存在' })
            }

            req.user = user
            next()
        } catch (error) {
            console.error('Token 驗證錯誤:', error)
            res.status(500).json({ message: '伺服器錯誤' })
        }
    })
}

// 驗證 token 路由
router.get('/verify', authenticateToken, (req, res) => {
    res.json({
        valid: true,
        user: req.user.toPublicJSON()
    })
})

// 獲取當前用戶資訊
router.get('/me', authenticateToken, (req, res) => {
    res.json(req.user.toPublicJSON())
})

// 更新用戶資料
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { displayName, bio, avatar } = req.body

        const user = await User.findById(req.user._id)

        if (displayName !== undefined) user.profile.displayName = displayName
        if (bio !== undefined) user.profile.bio = bio
        if (avatar !== undefined) user.profile.avatar = avatar

        await user.save()

        res.json({
            message: '資料更新成功',
            user: user.toPublicJSON()
        })

    } catch (error) {
        console.error('更新資料錯誤:', error)
        res.status(500).json({ message: '伺服器錯誤' })
    }
})

// 登出路由（客戶端處理，服務端記錄）
router.post('/logout', authenticateToken, (req, res) => {
    // 在實際應用中，可以將 token 加入黑名單
    // 或實現 token 撤銷機制
    res.json({ message: '登出成功' })
})

// 導出認證中間件供其他路由使用
router.authenticateToken = authenticateToken

module.exports = router