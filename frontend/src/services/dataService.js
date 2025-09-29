/**
 * 數據服務 - 用於前台和後台之間共享數據
 */

// 預設數據
const defaultData = {
  // 作品集數據
  portfolio: [
    {
      id: 1,
      title: "森林中的萊菲",
      category: "場景插畫",
      description: "享受森林時光的萊菲與小松鼠們",
      image: "/assets/c.webp",
      gallery: ["/assets/c.webp", "/assets/character_ligh.webp", "/assets/sceneB.webp"],
      tags: ["奇幻", "森林", "角色設計"],
      createdAt: "2024-03-15T10:00:00Z",
      software: ["Photoshop", "Procreate"],
      dimensions: "1920x1080",
      featured: true,
      youtube: ""
    },
    {
      id: 2,
      title: "寶藏菲爾",
      category: "人物插畫",
      description: "大盜菲爾與他的祕寶",
      image: "/assets/flll.webp",
      gallery: ["/assets/flll.webp", "/assets/hand.webp", "/assets/kalu.webp"],
      tags: ["角色設計", "大盜", "寶藏"],
      createdAt: "2024-02-20T10:00:00Z",
      software: ["Clip Studio Paint"],
      dimensions: "1080x1350",
      featured: false,
      youtube: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "弓箭手小麥",
      category: "手繪",
      description: "手繪龍族戰士設計稿",
      image: "/assets/hand.webp",
      gallery: ["/assets/hand.webp", "/assets/sketch.webp"],
      tags: ["手繪", "戰士", "龍族"],
      createdAt: "2024-01-10T10:00:00Z",
      software: ["傳統手繪"],
      dimensions: "A4",
      featured: false,
      youtube: ""
    },
    {
      id: 4,
      title: "龐克兔兔",
      category: "隨筆/塗鴉/梗圖",
      description: "隨手畫北極家的兔子",
      image: "/assets/sketch.webp",
      gallery: ["/assets/sketch.webp", "/assets/iyaya.webp"],
      tags: ["龐克", "兔子", "塗鴉"],
      createdAt: "2024-04-01T10:00:00Z",
      software: ["iPad Pro", "Apple Pencil"],
      dimensions: "2048x2732",
      featured: false,
      youtube: ""
    },
    {
      id: 5,
      title: "城市一角",
      category: "場景插畫",
      description: "咖鹿與羊在城市一角的夜生活",
      image: "/assets/kalu.webp",
      gallery: ["/assets/kalu.webp", "/assets/sceneB.webp", "/assets/c.webp"],
      tags: ["城市", "夜景", "生活"],
      createdAt: "2024-03-28T10:00:00Z",
      software: ["Photoshop", "Blender"],
      dimensions: "3840x2160",
      featured: true,
      youtube: ""
    }
  ],
  
  // 新聞數據
  news: [
    { 
      id: 1, 
      title: '新作品《森林中的萊菲》發布！', 
      category: 'news', 
      content: '經過數週的精心創作，全新場景插畫作品《森林中的萊菲》正式與大家見面！這是一幅充滿魔法感的森林場景，描繪了萊菲與森林小動物們互動的溫馨時刻。作品採用了明亮的色調和細膩的筆觸，希望能帶給大家一種置身於奇幻森林的感覺。\n\n創作這幅作品時，我特別注重光影的處理，希望通過樹葉間灑落的陽光，營造出一種夢幻而溫暖的氛圍。萊菲的表情和姿態也經過多次調整，最終呈現出這種與自然和諧共處的狀態。\n\n感謝一直以來支持我的冒險者們，希望這幅新作品能夠得到大家的喜愛！',
      createdAt: '2024-05-15T10:00:00Z',
      views: 1250,
      tags: ['新作品', '場景插畫']
    },
    { 
      id: 2, 
      title: '2024年委託服務升級公告', 
      category: 'news', 
      content: '親愛的冒險者們，感謝大家對我們委託服務的支持！為了提供更好的服務體驗，我們決定從2024年6月1日起，對委託服務進行全面升級。\n\n升級內容包括：\n1. 新增更多委託類型，包括動態插畫和表情包設計\n2. 優化委託流程，提供更清晰的進度追蹤\n3. 引入分級定價系統，滿足不同預算需求\n4. 增加作品修改次數，確保您對最終成果滿意\n\n同時，我們也將提供更多的作品展示和案例分析，幫助您更好地了解我們的創作風格和能力。\n\n期待在未來的創作中與您合作！',
      createdAt: '2024-05-10T14:30:00Z',
      views: 890,
      tags: ['委託服務', '升級']
    },
    { 
      id: 3, 
      title: '參展通知：2024幻想藝術展', 
      category: 'adventure', 
      content: '很高興宣布，我將參加今年7月在台北舉辦的「2024幻想藝術展」！這是一個匯集了來自全球的奇幻與科幻藝術作品的盛會，我將展出包括《森林中的萊菲》、《寶藏菲爾》在內的多幅作品。\n\n展覽詳情：\n- 時間：2024年7月15日至7月20日\n- 地點：台北市立藝術中心\n- 票價：全票NT$300，學生票NT$200\n\n現場我還會有限量版畫冊和周邊商品發售，購買還有機會獲得我的親筆簽名！如果您在現場看到我，別忘了過來打個招呼！\n\n希望能在展會上見到各位冒險者！',
      createdAt: '2024-05-05T09:15:00Z',
      views: 723,
      tags: ['展覽', '活動', '幻想藝術']
    }
  ],
  
  // 商店數據
  store: [
    { 
      id: 1, 
      name: '奇幻冒險畫冊', 
      category: '魔法道具', 
      price: 800, 
      stock: 10, 
      description: '收錄了2023-2024年間創作的20幅精選插畫作品，採用高質量印刷，A4大小精裝本。',
      image: '/assets/book.webp',
      rating: 4.8
    },
    { 
      id: 2, 
      name: '角色徽章套組', 
      category: '冒險裝備', 
      price: 150, 
      stock: 25, 
      description: '包含萊菲、菲爾、小麥等6個角色的金屬徽章，直徑5cm，背面有別針設計。',
      image: '/assets/badge.webp',
      rating: 4.5
    },
    { 
      id: 3, 
      name: '龍族戰士明信片', 
      category: '珍藏物品', 
      price: 120, 
      stock: 50, 
      description: '弓箭手小麥系列明信片，共5張，採用進口藝術紙印製，附精美信封。',
      image: '/assets/postcard.webp',
      rating: 4.7
    },
    { 
      id: 4, 
      name: '森林魔法筆記本', 
      category: '魔法道具', 
      price: 250, 
      stock: 15, 
      description: '以《森林中的萊菲》為封面的精裝筆記本，內頁採用道林紙，適合鋼筆和水彩筆使用。',
      image: '/assets/notebook.webp',
      rating: 4.6
    }
  ],
  
  // 委託數據
  commission: [
    { 
      id: 1, 
      name: '小明', 
      type: '人物插畫', 
      budget: 'NT$ 3000-5000', 
      status: 'pending',
      email: 'ming@example.com',
      description: '希望畫一個騎士角色，全身像，有盔甲和武器，風格偏寫實。',
      createdAt: '2024-05-01T10:00:00Z'
    },
    { 
      id: 2, 
      name: '小華', 
      type: '場景插畫', 
      budget: 'NT$ 5000-8000', 
      status: 'in-progress',
      email: 'hua@example.com',
      description: '需要一個城堡的背景圖，有魔法元素，風格可以偏向奇幻。',
      createdAt: '2024-04-28T15:30:00Z'
    },
    { 
      id: 3, 
      name: '阿杰', 
      type: '表情包', 
      budget: 'NT$ 1000-2000', 
      status: 'completed',
      email: 'jay@example.com',
      description: '想要一組龍族角色的表情包，大概6-8個不同表情。',
      createdAt: '2024-04-15T09:45:00Z'
    },
    { 
      id: 4, 
      name: '小美', 
      type: '商業插畫', 
      budget: 'NT$ 10000以上', 
      status: 'approved',
      email: 'mei@example.com',
      description: '需要為我們的飲料品牌設計一個主視覺，風格可愛，有夏日感。',
      createdAt: '2024-04-20T14:20:00Z'
    }
  ]
};

// 輔助函數 - 將ISO日期字符串轉換為本地日期時間格式
function formatDateForInput(isoString) {
  if (!isoString) return '';
  
  // 創建日期對象
  const date = new Date(isoString);
  
  // 格式化為 YYYY-MM-DDThh:mm 格式 (HTML datetime-local 輸入格式)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 輔助函數 - 將本地日期時間格式轉換為ISO日期字符串
function parseInputDate(localDateString) {
  if (!localDateString) return new Date().toISOString();
  
  // 創建日期對象並轉換為ISO字符串
  const date = new Date(localDateString);
  return date.toISOString();
}

// 數據服務類
class DataService {
  constructor() {
    this.initializeData();
  }
  
  // 初始化數據
  initializeData() {
    // 檢查本地存儲中是否已有數據
    if (!localStorage.getItem('portfolioData')) {
      localStorage.setItem('portfolioData', JSON.stringify(defaultData.portfolio));
    }
    
    if (!localStorage.getItem('newsData')) {
      localStorage.setItem('newsData', JSON.stringify(defaultData.news));
    }
    
    if (!localStorage.getItem('storeData')) {
      localStorage.setItem('storeData', JSON.stringify(defaultData.store));
    }
    
    if (!localStorage.getItem('commissionData')) {
      localStorage.setItem('commissionData', JSON.stringify(defaultData.commission));
    }
  }
  
  // 重置數據到預設值
  resetData() {
    localStorage.setItem('portfolioData', JSON.stringify(defaultData.portfolio));
    localStorage.setItem('newsData', JSON.stringify(defaultData.news));
    localStorage.setItem('storeData', JSON.stringify(defaultData.store));
    localStorage.setItem('commissionData', JSON.stringify(defaultData.commission));
  }
  
  // 獲取所有作品集
  getPortfolio() {
    return JSON.parse(localStorage.getItem('portfolioData') || '[]');
  }
  
  // 獲取所有新聞
  getNews() {
    return JSON.parse(localStorage.getItem('newsData') || '[]');
  }
  
  // 獲取所有商品
  getStore() {
    return JSON.parse(localStorage.getItem('storeData') || '[]');
  }
  
  // 獲取所有委託
  getCommission() {
    return JSON.parse(localStorage.getItem('commissionData') || '[]');
  }
  
  // 添加作品
  addPortfolio(item) {
    const portfolio = this.getPortfolio();
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      gallery: item.gallery || [],
      featured: item.featured || false
    };
    portfolio.unshift(newItem);
    localStorage.setItem('portfolioData', JSON.stringify(portfolio));
    return newItem;
  }
  
  // 添加新聞
  addNews(item) {
    const news = this.getNews();
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      views: 0
    };
    news.unshift(newItem);
    localStorage.setItem('newsData', JSON.stringify(news));
    return newItem;
  }
  
  // 添加商品
  addStore(item) {
    const store = this.getStore();
    const newItem = {
      ...item,
      id: Date.now(),
      rating: 5.0
    };
    store.unshift(newItem);
    localStorage.setItem('storeData', JSON.stringify(store));
    return newItem;
  }
  
  // 添加委託
  addCommission(item) {
    const commission = this.getCommission();
    const newItem = {
      ...item,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    commission.unshift(newItem);
    localStorage.setItem('commissionData', JSON.stringify(commission));
    return newItem;
  }
  
  // 更新作品
  updatePortfolio(id, updates) {
    const portfolio = this.getPortfolio();
    const index = portfolio.findIndex(item => item.id === id);
    if (index !== -1) {
      portfolio[index] = { 
        ...portfolio[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem('portfolioData', JSON.stringify(portfolio));
      return portfolio[index];
    }
    return null;
  }
  
  // 更新新聞
  updateNews(id, updates) {
    const news = this.getNews();
    const index = news.findIndex(item => item.id === id);
    if (index !== -1) {
      news[index] = { ...news[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('newsData', JSON.stringify(news));
      return news[index];
    }
    return null;
  }
  
  // 更新商品
  updateStore(id, updates) {
    const store = this.getStore();
    const index = store.findIndex(item => item.id === id);
    if (index !== -1) {
      store[index] = { ...store[index], ...updates };
      localStorage.setItem('storeData', JSON.stringify(store));
      return store[index];
    }
    return null;
  }
  
  // 更新委託
  updateCommission(id, updates) {
    const commission = this.getCommission();
    const index = commission.findIndex(item => item.id === id);
    if (index !== -1) {
      commission[index] = { ...commission[index], ...updates };
      localStorage.setItem('commissionData', JSON.stringify(commission));
      return commission[index];
    }
    return null;
  }
  
  // 刪除作品
  deletePortfolio(id) {
    const portfolio = this.getPortfolio();
    const filtered = portfolio.filter(item => item.id !== id);
    localStorage.setItem('portfolioData', JSON.stringify(filtered));
    return true;
  }
  
  // 刪除新聞
  deleteNews(id) {
    const news = this.getNews();
    const filtered = news.filter(item => item.id !== id);
    localStorage.setItem('newsData', JSON.stringify(filtered));
    return true;
  }
  
  // 刪除商品
  deleteStore(id) {
    const store = this.getStore();
    const filtered = store.filter(item => item.id !== id);
    localStorage.setItem('storeData', JSON.stringify(filtered));
    return true;
  }
  
  // 刪除委託
  deleteCommission(id) {
    const commission = this.getCommission();
    const filtered = commission.filter(item => item.id !== id);
    localStorage.setItem('commissionData', JSON.stringify(filtered));
    return true;
  }
  
  // 獲取單個作品
  getPortfolioItem(id) {
    const portfolio = this.getPortfolio();
    return portfolio.find(item => item.id === id) || null;
  }
  
  // 獲取單個新聞
  getNewsItem(id) {
    const news = this.getNews();
    return news.find(item => item.id === id) || null;
  }
  
  // 獲取單個商品
  getStoreItem(id) {
    const store = this.getStore();
    return store.find(item => item.id === id) || null;
  }
  
  // 獲取單個委託
  getCommissionItem(id) {
    const commission = this.getCommission();
    return commission.find(item => item.id === id) || null;
  }
  
  // 格式化日期為輸入框格式
  formatDateForInput(isoString) {
    return formatDateForInput(isoString);
  }
  
  // 解析輸入框日期
  parseInputDate(localDateString) {
    return parseInputDate(localDateString);
  }
}

// 創建並導出單例
const dataService = new DataService();
export default dataService;