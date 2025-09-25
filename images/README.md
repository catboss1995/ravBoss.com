# 圖片管理指南

## 圖片儲存策略

### 方案一：GitHub + jsDelivr CDN (推薦)

#### 優點：
免費  
全球CDN加速  
版本控制  
自動快取  

#### 使用方法：
1. 將圖片放到 `/images/` 資料夾
2. 提交到 GitHub
3. 使用 jsDelivr CDN 自動訪問

```
CDN URL 格式：
https://cdn.jsdelivr.net/gh/catboss1995/ravBoss.com@main/images/[路徑]

範例：
https://cdn.jsdelivr.net/gh/catboss1995/ravBoss.com@main/images/categories/all.jpg
```

### 方案二：免費圖床服務

#### Cloudflare Images
- 免費額度：10萬張圖片/月
- 自動優化和壓縮
- 全球CDN

#### ImgBB
- 免費無限制上傳
- 直接外連
- API支援

#### 使用免費圖床的配置：
```javascript
// 在 config/images.js 中修改 CDN_BASE
CDN_BASE: 'https://your-cloudflare-images-url.com'
// 或
CDN_BASE: 'https://i.ibb.co/your-account'
```

## 圖片規格建議

### 分類縮圖 (categories/)
- **尺寸**：300x150px (2:1比例)
- **格式**：JPG/WebP
- **大小**：< 50KB
- **品質**：70-80%

### 作品圖片 (portfolio/)
- **縮圖**：400x300px (< 100KB)
- **中圖**：800x600px (< 300KB) 
- **大圖**：1200x900px (< 500KB)
- **格式**：JPG/WebP

## 資料夾結構

```
ravBoss.com/
├── images/
│   ├── categories/           # 分類縮圖
│   │   ├── all.jpg
│   │   ├── scene.jpg
│   │   ├── character.jpg
│   │   ├── handdrawn.jpg
│   │   └── sketch.jpg
│   └── portfolio/            # 作品圖片
│       ├── work_1_thumb.jpg
│       ├── work_1_medium.jpg
│       ├── work_1_large.jpg
│       ├── work_2_thumb.jpg
│       └── ...
└── frontend/src/assets/      # 僅放小圖示和LOGO
    └── LOGO-s.png
```

## 部署流程

### 1. 準備圖片
```bash
# 壓縮圖片 (建議使用工具)
# TinyPNG, ImageOptim, 或線上壓縮工具
```

### 2. 上傳到指定位置
```bash
# 複製圖片到對應資料夾
cp your-images/* /images/categories/
cp your-portfolio/* /images/portfolio/
```

### 3. 提交到GitHub
```bash
git add images/
git commit -m "Add portfolio images"
git push origin main
```

### 4. 等待CDN生效 (約2-5分鐘)
```
測試URL：
https://cdn.jsdelivr.net/gh/catboss1995/ravBoss.com@main/images/categories/all.jpg
```

## 圖片優化建議

### 自動化工具：
1. **GitHub Actions** - 自動壓縮上傳的圖片
2. **ImageKit** - 即時圖片優化
3. **Cloudinary** - 免費額度內自動優化

### 手動優化：
1. **TinyPNG** - 線上壓縮
2. **Squoosh** - Google開源壓縮工具
3. **ImageOptim** - Mac圖片優化工具

## 故障排除

### 圖片載入失敗：
- 檢查CDN URL是否正確
- 確認GitHub上傳成功
- 等待CDN快取更新（最多10分鐘）

### 圖片載入太慢：
- 檢查圖片大小是否過大
- 使用WebP格式
- 啟用圖片懶載入