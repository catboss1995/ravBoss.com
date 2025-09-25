const mongoose = require('mongoose')
const User = require('../models/User')

// MongoDB 連接字串
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ravboss-adventure'

async function createInitialAdmin() {
  try {
    // 連接 MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log(' MongoDB 連接成功')

    // 檢查是否已有管理員
    const existingAdmin = await User.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      console.log('  管理員用戶已存在:', existingAdmin.username)
      console.log('  刪除現有管理員並重新創建...')
      await User.deleteOne({ username: 'admin' })
    }

    // 創建初始管理員
    const admin = new User({
      username: 'admin',
      email: 'admin@ravboss.com',
      password: 'admin123',
      isAdmin: true,
      profile: {
        displayName: '首席冒險者',
        bio: '這是冒險者檔案的管理員帳號'
      }
    })

    await admin.save()
    console.log(' 管理員用戶創建成功!')
    console.log(' 登入資訊:')
    console.log(' 用戶名: admin')
    console.log(' 密碼: admin123')
    console.log(' 電子郵件: admin@ravboss.com')

  } catch (error) {
    console.error(' 創建管理員失敗:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log(' MongoDB 連接已關閉')
    process.exit()
  }
}

// 執行腳本
createInitialAdmin()