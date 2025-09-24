const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 正在啟動 RavBoss 後端伺服器...');
console.log('📊 環境:', process.env.NODE_ENV);
console.log('🔌 連接埠:', PORT);

// 中間件
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 連接 MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ravboss', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('已連接到 MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 連接錯誤:', err);
});

// 路由
app.get('/', (req, res) => {
  res.json({ message: 'RavBoss.com API 服務器運行中' });
});

// 引入路由模組
const portfolioRoutes = require('./routes/portfolio');
const commissionRoutes = require('./routes/commission');
const storeRoutes = require('./routes/store');
const announcementRoutes = require('./routes/announcements');

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