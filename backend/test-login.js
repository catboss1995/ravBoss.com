const mongoose = require('mongoose')
const User = require('./models/User')

async function testLogin() {
  try {
    // 連接 MongoDB
    await mongoose.connect('mongodb://localhost:27017/ravboss-adventure')
    console.log(' MongoDB 連接成功')

    // 查找管理員
    const admin = await User.findOne({ username: 'admin' })

    if (!admin) {
      console.log(' 找不到管理員用戶')

      // 創建管理員
      const newAdmin = new User({
        username: 'admin',
        email: 'admin@ravboss.com',
        password: 'admin123',
        isAdmin: true
      })

      await newAdmin.save()
      console.log(' 新管理員創建成功')
    } else {
      console.log(' 找到管理員:', admin.username, admin.email)

      // 測試密碼
      const isValid = await admin.comparePassword('admin123')
      console.log('密碼驗證:', isValid ? ' 正確' : '錯誤')

      if (!isValid) {
        // 重設密碼
        admin.password = 'admin123'
        await admin.save()
        console.log('密碼已重設')
      }
    }

  } catch (error) {
    console.error('錯誤:', error)
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB 連接已關閉')
    process.exit()
  }
}

testLogin()