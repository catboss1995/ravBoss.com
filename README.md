# RavBoss.com

一個使用 Vue.js + Vite 前端和 Node.js + Express + MongoDB 後端的創作者作品展示網站。

## 專案結構

```
ravBoss.com/
├── frontend/          # Vue.js + Vite 前端
├── backend/           # Node.js + Express 後端
├── pages/            # 原始 HTML 頁面 (已遷移至 Vue 組件)
└── .github/          # GitHub Actions 配置
```

## 功能特色

- 🎨 作品集展示
- 💼 委託服務系統
- 📢 公告管理
- 🛒 商店功能
- 🔗 社群連結
- 📱 響應式設計

## 技術棧

### 前端
- Vue 3
- Vue Router
- Pinia (狀態管理)
- Vite (建構工具)
- Axios (HTTP 客戶端)

### 後端
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT 身份驗證
- CORS
- Helmet (安全性)

## 快速開始

### 先決條件
- Node.js (版本 16 或以上)
- MongoDB (本地安裝或雲端服務)
- Git

### 安裝與運行

1. **複製專案**
   ```bash
   git clone https://github.com/yourusername/ravBoss.com.git
   cd ravBoss.com
   ```

2. **設置後端**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # 編輯 .env 文件，設置您的 MongoDB 連接字串和其他配置
   npm run dev
   ```

3. **設置前端**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **啟動 MongoDB**
   - 確保 MongoDB 服務正在運行
   - 預設連接：`mongodb://localhost:27017/ravboss`

### 開發模式

- 前端：`http://localhost:3000`
- 後端：`http://localhost:5000`

## API 端點

### 作品集
- `GET /api/portfolio` - 獲取所有作品
- `GET /api/portfolio/:id` - 獲取特定作品
- `POST /api/portfolio` - 新增作品 (需要身份驗證)

### 公告
- `GET /api/announcements` - 獲取所有公告
- `POST /api/announcements` - 新增公告 (需要身份驗證)

### 委託
- `POST /api/commission` - 提交委託請求

### 商店
- `GET /api/store` - 獲取商品列表

## 部署

### 使用 GitHub Actions

本專案包含 GitHub Actions 工作流程，可自動部署到各種平台：

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **配置部署祕密**
   - 在 GitHub 儲存庫設置中添加必要的祕密變數
   - 包括資料庫連接字串、API 金鑰等

### 手動部署

1. **建構前端**
   ```bash
   cd frontend
   npm run build
   ```

2. **準備後端**
   ```bash
   cd backend
   npm install --production
   ```

3. **配置環境變數**
   - 設置生產環境的 `.env` 文件
   - 確保 MongoDB 連接正確

## 環境變數

### 後端 (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

### 前端
- 開發環境：自動代理到 `http://localhost:5000`
- 生產環境：需要配置正確的 API 基礎 URL

## 貢獻

1. Fork 此專案
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟一個 Pull Request

## 許可證

此專案使用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情

## 聯絡

- 網站：https://ravboss.com
- Email：contact@ravboss.com

## 更新日誌

### v1.0.0 (2025-09-25)
- 初始版本發布
- Vue 3 + Vite 前端架構
- Node.js + Express 後端 API
- MongoDB 資料庫整合
- 基本功能實現（作品集、委託、公告、商店）