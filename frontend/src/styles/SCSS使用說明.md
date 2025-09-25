# 頁面樣式 SCSS 檔案使用說明

## 檔案結構

```
src/styles/
├── navbar.scss        # 導航欄樣式
├── pages.scss         # 主樣式檔案（匯入所有頁面樣式）
├── home.scss          # 首頁樣式
├── about.scss         # 工會資訊頁面樣式
├── portfolio.scss     # 冒險歷程頁面樣式
├── commission.scss    # 鐵匠鋪頁面樣式
├── store.scss         # 公會市集頁面樣式
├── news.scss          # 冒險日誌頁面樣式
├── board.scss # 告示板頁面樣式
├── terms.scss         # 委託契約頁面樣式
├── links.scss         # 冒險者頁面樣式
└── login.scss         # 登入頁面樣式
```

## 如何在 Vue 元件中使用

### 方法 1：匯入對應頁面的 SCSS 檔案
```vue
<style lang="scss" scoped>
@use '../styles/news.scss';
</style>
```

### 方法 2：匯入所有頁面樣式（不推薦，會增加檔案大小）
```vue
<style lang="scss" scoped>
@use '../styles/pages.scss';
</style>
```

### 方法 3：選擇性匯入多個檔案
```vue
<style lang="scss" scoped>
@use '../styles/navbar.scss';
@use '../styles/home.scss';
</style>
```

## 頁面對應關係

| Vue 元件 | SCSS 檔案 | 說明 |
|---------|----------|------|
| App.vue | navbar.scss | 導航欄樣式 |
| Home.vue | home.scss | 首頁樣式 |
| About.vue | about.scss | 工會資訊頁面 |
| Portfolio.vue | portfolio.scss | 冒險歷程頁面 |
| Commission.vue | commission.scss | 鐵匠鋪頁面 |
| Store.vue | store.scss | 公會市集頁面 |
| News.vue | news.scss | 冒險日誌頁面 |
| Board.vue | board.scss | 告示板頁面 |
| Terms.vue | terms.scss | 委託契約頁面 |
| Links.vue | links.scss | 冒險者頁面 |
| Login.vue | login.scss | 登入頁面 |

## 特點

1. **模組化設計**：每個頁面的樣式獨立管理
2. **SCSS 語法**：使用嵌套、變數等現代 CSS 預處理器功能
3. **響應式設計**：所有樣式都包含行動裝置適配
4. **易於維護**：修改特定頁面樣式時不影響其他頁面

## 如何更新現有 Vue 檔案

將現有的 `<style scoped>` 改為：
```vue
<style lang="scss" scoped>
@use '../styles/對應的檔名.scss';
</style>
```

然後刪除 `<style>` 標籤內原有的 CSS 代碼。

## 已完成的檔案

News.vue - 已更新為使用 news.scss
其他檔案 - 需要手動更新或使用工具批量更新

## 使用建議

1. **單一頁面開發**：只匯入對應頁面的 SCSS 檔案
2. **全域樣式修改**：修改 style.scss 主檔案
3. **導航欄修改**：修改 navbar.scss
4. **新增頁面**：創建新的 SCSS 檔案並添加到 pages.scss 中

這種結構讓樣式管理更加清晰，也便於團隊協作和後續維護。