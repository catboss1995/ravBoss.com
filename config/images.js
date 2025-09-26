// 圖片配置管理
export const imageConfig = {
  // CDN 基礎URL
  CDN_BASE: 'https://cdn.jsdelivr.net/gh/catboss1995/ravBoss.com@main/images',
  
  // 本地資源基礎路徑  
  LOCAL_BASE: '/src/assets',
  
  // 圖片質量設置
  QUALITY: {
    thumbnail: 70,    // 縮圖質量
    medium: 80,       // 中等質量
    high: 90          // 高質量
  },
  
  // 圖片尺寸設置
  SIZES: {
    category: {
      width: 300,
      height: 150
    },
    portfolio: {
      thumbnail: { width: 400, height: 300 },
      medium: { width: 800, height: 600 },
      large: { width: 1200, height: 900 }
    }
  }
};

// 圖片URL生成器
export class ImageManager {
  static getCategoryImage(category) {
    const categoryMap = {
      '全部': 'all.jpg',
      '場景插畫': 'scene.jpg', 
      '人物插畫': 'character.jpg', // 使用 public 資料夾中的圖片
      '手繪': 'handdrawn.jpg',
      '隨筆/塗鴉/梗圖': 'sketch.jpg',
    };
    
    const filename = categoryMap[category] || 'default.jpg';
    
    // 特殊處理本地圖片
    if (category === '人物插畫') {
      return filename; // 直接返回 public 資料夾路徑
    }
    
    return `${imageConfig.CDN_BASE}/categories/${filename}`;
  }
  
  static getPortfolioImage(workId, size = 'medium') {
    return `${imageConfig.CDN_BASE}/portfolio/work_${workId}_${size}.jpg`;
  }
  
  static getBannerImage(bannerName = 'hero') {
    const bannerMap = {
      'hero': 'fantasy-river-scene.jpg',
      'default': 'fantasy-river-scene.jpg'
    };
    
    const filename = bannerMap[bannerName] || bannerMap['default'];
    return `${imageConfig.CDN_BASE}/banners/${filename}`;
  }
  
  static getPlaceholderImage(width, height, text = '') {
    return `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(text)}`;
  }
}

export default ImageManager;