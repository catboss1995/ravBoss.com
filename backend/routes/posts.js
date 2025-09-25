const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

// 導入認證中間件
const authenticateToken = (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: '未提供認證令牌' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: '無效的認證令牌' })
    }

    try {
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

// 管理員權限檢查中間件
const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: '需要管理員權限' })
  }
  next()
}

// 獲取所有文章（公開路由）
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      featured,
      status = 'published' 
    } = req.query

    // 構建查詢條件
    const query = { status }
    
    if (category) {
      query.category = category
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true'
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    // 分頁設置
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // 執行查詢
    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('author', 'username profile.displayName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Post.countDocuments(query)
    ])

    res.json({
      posts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalPosts: total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    })

  } catch (error) {
    console.error('獲取文章錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 獲取單篇文章
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profile.displayName profile.avatar')

    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }

    // 只有已發布的文章或管理員才能查看
    if (post.status !== 'published' && (!req.user || !req.user.isAdmin)) {
      return res.status(404).json({ message: '文章不存在' })
    }

    // 增加觀看次數
    await post.incrementViews()

    res.json(post)

  } catch (error) {
    console.error('獲取文章錯誤:', error)
    
    if (error.name === 'CastError') {
      return res.status(404).json({ message: '文章不存在' })
    }
    
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 創建新文章（需要認證）
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      content,
      category = 'adventure',
      tags = [],
      featured = false,
      featuredImage = '',
      status = 'published'
    } = req.body

    // 驗證必填欄位
    if (!title || !content) {
      return res.status(400).json({ 
        message: '標題和內容為必填欄位' 
      })
    }

    // 創建新文章
    const post = new Post({
      title,
      content,
      category,
      tags: Array.isArray(tags) ? tags : [],
      author: req.user._id,
      featured,
      featuredImage,
      status
    })

    await post.save()
    
    // 返回包含作者資訊的文章
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username profile.displayName')

    res.status(201).json({
      message: '文章創建成功',
      post: populatedPost
    })

  } catch (error) {
    console.error('創建文章錯誤:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: '資料驗證失敗',
        errors: Object.values(error.errors).map(e => e.message)
      })
    }
    
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 更新文章（需要管理員權限）
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      featured,
      featuredImage,
      status
    } = req.body

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }

    // 更新文章欄位
    if (title !== undefined) post.title = title
    if (content !== undefined) post.content = content
    if (category !== undefined) post.category = category
    if (tags !== undefined) post.tags = Array.isArray(tags) ? tags : []
    if (featured !== undefined) post.featured = featured
    if (featuredImage !== undefined) post.featuredImage = featuredImage
    if (status !== undefined) post.status = status

    await post.save()

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username profile.displayName')

    res.json({
      message: '文章更新成功',
      post: updatedPost
    })

  } catch (error) {
    console.error('更新文章錯誤:', error)
    
    if (error.name === 'CastError') {
      return res.status(404).json({ message: '文章不存在' })
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: '資料驗證失敗',
        errors: Object.values(error.errors).map(e => e.message)
      })
    }
    
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 刪除文章（需要管理員權限）
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }

    res.json({ message: '文章已刪除' })

  } catch (error) {
    console.error('刪除文章錯誤:', error)
    
    if (error.name === 'CastError') {
      return res.status(404).json({ message: '文章不存在' })
    }
    
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 獲取熱門文章
router.get('/featured/popular', async (req, res) => {
  try {
    const { limit = 5 } = req.query
    
    const posts = await Post.getPopular(parseInt(limit))
    
    res.json(posts)

  } catch (error) {
    console.error('獲取熱門文章錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 獲取精選文章
router.get('/featured/highlights', async (req, res) => {
  try {
    const { limit = 3 } = req.query
    
    const posts = await Post.getFeatured(parseInt(limit))
    
    res.json(posts)

  } catch (error) {
    console.error('獲取精選文章錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 按分類獲取文章
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params
    const { page = 1, limit = 10 } = req.query
    
    const posts = await Post.getByCategory(category, parseInt(page), parseInt(limit))
    const total = await Post.countDocuments({ category, status: 'published' })
    
    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalPosts: total
      }
    })

  } catch (error) {
    console.error('按分類獲取文章錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 喜歡文章（需要認證）
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }

    post.likes += 1
    await post.save()

    res.json({ 
      message: '已喜歡文章',
      likes: post.likes 
    })

  } catch (error) {
    console.error('喜歡文章錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 添加評論（需要認證）
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: '評論內容不能為空' })
    }

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: '文章不存在' })
    }

    const comment = {
      author: req.user.username || req.user.profile?.displayName || '匿名冒險者',
      content: content.trim()
    }

    await post.addComment(comment.author, comment.content)

    res.status(201).json({
      message: '評論添加成功',
      comment
    })

  } catch (error) {
    console.error('添加評論錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 獲取文章統計（管理員）
router.get('/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      categoryCounts
    ] = await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ status: 'published' }),
      Post.countDocuments({ status: 'draft' }),
      Post.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]),
      Post.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ])
    ])

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews: totalViews[0]?.total || 0,
      categoryCounts: categoryCounts.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {})
    })

  } catch (error) {
    console.error('獲取統計錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

module.exports = router