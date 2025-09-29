const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('正在啟動 RavBoss 後端伺服器...');
console.log('環境:', process.env.NODE_ENV || 'development');
console.log('連接埠:', PORT);

// 中間件
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 連接 MongoDB（允許失敗繼續運行）
let mongoConnected = false;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ravboss-adventure', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoConnected = true;
    console.log('已連接到 MongoDB');
  } catch (error) {
    console.log('MongoDB 連接失敗，將使用模擬資料模式');
    console.log('請檢查 .env 中的 MONGODB_URI 設定');
    mongoConnected = false;
  }
};

// 嘗試連接資料庫
connectMongoDB();

mongoose.connection.on('error', (err) => {
  console.log('MongoDB 連接中斷:', err.message);
  mongoConnected = false;
});

// 路由
app.get('/', (req, res) => {
  res.json({ message: 'RavBoss.com API 服務器運行中' });
});

// 引入路由模組
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const portfolioRoutes = require('./routes/portfolio');
const commissionRoutes = require('./routes/commission');
const storeRoutes = require('./routes/store');
const announcementRoutes = require('./routes/announcements');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/commission', commissionRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/announcements', announcementRoutes);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服務器內部錯誤' });
});

// 404 處理
app.use((req, res) => {
  res.status(404).json({ message: '路由不存在' });
});

app.listen(PORT, () => {
  console.log(`服務器運行在 http://localhost:${PORT}`);
});

module.exports = app;