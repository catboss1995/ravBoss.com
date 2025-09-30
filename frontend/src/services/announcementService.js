// 布告欄數據服務
import axios from 'axios';
import fantasyImage1 from '../assets/announcements/1110.jpg';
import fantasyImage2 from '../assets/announcements/1110.jpg';
import fantasyImage3 from '../assets/announcements/1110.jpg';
import fantasyImage4 from '../assets/announcements/1110.jpg';
import fantasyImage5 from '../assets/announcements/1110.jpg';

// 布告欄數據服務類
class AnnouncementService {
  constructor() {
    // 模擬圖片，實際項目中可替換為真實圖片路徑
    this.images = {
      fantasy1: fantasyImage1,
      fantasy2: fantasyImage2,
      fantasy3: fantasyImage3,
      fantasy4: fantasyImage4,
      fantasy5: fantasyImage5,
    };
    
    // 默認布告欄數據
    this.defaultAnnouncements = [
      {
        id: "f1",
        title: "新作品發布：龍族守護者",
        category: "作品",
        description: "最新完成的龍族系列插畫作品已上線，歡迎到作品集欣賞完整的創作過程和設計理念。",
        content: "《龍族守護者》系列作品是我近期的重點創作，融合了東方與西方龍的元素，展現龍與人類和諧共存的奇幻世界。此系列包含5幅精心繪製的場景和角色設計，每一幅都蘊含豐富的故事背景。歡迎前往作品集頁面，欣賞完整的創作過程和設計理念。",
        image: "fantasy1",
        tags: ["New", "作品"],
        reward: "精彩內容",
        important: true,
        postedAt: Date.now() - 2 * 60 * 60 * 1000 // 2小時前
      },
      {
        id: "f2",
        title: "委託服務優惠月",
        category: "活動",
        description: "九月委託服務享有特別優惠，包含角色設計、場景繪製等項目，歡迎洽詢。",
        content: "為慶祝創作第三週年，本月推出委託服務優惠活動！所有角色設計、場景繪製和概念設計項目均享有85折優惠。此外，首次委託的客戶還可獲得一份精美的數位素描小禮。優惠期間：9月1日至9月30日，名額有限，預約從速！",
        image: "fantasy2",
        tags: ["Event", "限時"],
        reward: "優惠價格",
        important: true,
        postedAt: Date.now() - 1 * 24 * 60 * 60 * 1000 // 1天前
      },
      {
        id: "f3",
        title: "招募：插畫合作夥伴",
        category: "招募",
        description: "誠徵志同道合的插畫師共同合作專案，歡迎有興趣的創作者聯繫。",
        content: "正在籌備一個奇幻主題的插畫合集專案，需要3-5位具有相似風格的插畫師共同參與。專案預計為期3個月，作品將以數位畫冊形式出版，並在多個平台展示。我們提供合理的報酬和作品版權共享。如果你對奇幻世界充滿熱情，並且擅長角色或場景設計，歡迎與我聯繫！",
        image: "fantasy3",
        tags: ["招募"],
        reward: "合作分潤",
        important: false,
        postedAt: Date.now() - 2 * 24 * 60 * 60 * 1000 // 2天前
      },
      {
        id: "f4",
        title: "網站功能更新通知",
        category: "系統",
        description: "新增瀑布流展示、圖片管理系統等功能，提升瀏覽體驗。",
        content: "網站進行了一次重大更新，新增了多項功能以提升用戶體驗：1. 作品集新增瀑布流展示模式；2. 圖片管理系統支持更多格式和更大容量；3. 新增暗黑模式支持；4. 優化了移動端顯示效果；5. 修復了已知的顯示問題。感謝大家一直以來的支持與反饋！",
        image: "fantasy4",
        tags: ["System"],
        reward: "",
        important: false,
        postedAt: Date.now() - 3 * 24 * 60 * 60 * 1000 // 3天前
      },
      {
        id: "f5",
        title: "手繪技法分享",
        category: "教學",
        description: "分享最新的數位手繪技巧和創作心得，歡迎交流學習。",
        content: "本週將發布一系列數位繪畫技巧教學，包括光影處理、質感表現、角色設計等方面的技巧分享。這些教學基於我近期創作過程中的心得，適合有一定基礎的繪畫愛好者。教學內容將分批在社群平台更新，同時歡迎大家在評論區交流自己的創作經驗！",
        image: "fantasy5",
        tags: ["教學"],
        reward: "知識分享",
        important: false,
        postedAt: Date.now() - 5 * 24 * 60 * 60 * 1000 // 5天前
      },
      {
        id: "f6",
        title: "社群互動活動",
        category: "活動",
        description: "在社群平台分享喜愛的作品並標記我們，有機會獲得限定周邊。",
        content: "即日起至月底，在任何社群平台分享你最喜愛的作品並標記官方帳號，即有機會獲得限定設計的周邊禮品！參與方式：1. 選擇你最喜歡的一幅作品；2. 分享到你的社群平台；3. 標記官方帳號並附上#奇幻創作分享 標籤；4. 公開你的貼文以便我們能看到。我們將從參與者中抽選10名幸運粉絲，贈送精美周邊一份！",
        image: "fantasy2",
        tags: ["Social"],
        reward: "限定周邊",
        important: false,
        postedAt: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7天前
      },
      {
        id: "f7",
        title: "創作材料推薦",
        category: "分享",
        description: "推薦好用的繪圖工具和材料，幫助大家提升創作效率。",
        content: "經過長時間的測試和比較，我想分享一些個人認為最適合奇幻風格創作的數位工具和實體材料。數位工具：推薦的繪圖軟件、常用畫筆設置和實用插件；實體材料：適合速寫和著色的紙張、顏料和筆刷推薦。這些工具和材料都經過實際創作檢驗，希望能對大家的創作過程有所幫助！",
        image: "fantasy3",
        tags: ["推薦"],
        reward: "實用資訊",
        important: false,
        postedAt: Date.now() - 10 * 24 * 60 * 60 * 1000 // 10天前
      }
    ];
  }
  
  // 獲取布告欄數據
  async getAnnouncements() {
    try {
      // 嘗試從API獲取數據
      const response = await axios.get("/api/announcements");
      return response.data;
    } catch (error) {
      console.log("從API獲取布告欄數據失敗，使用默認數據", error);
      // 如果API請求失敗，返回默認數據
      return this.defaultAnnouncements;
    }
  }
  
  // 獲取布告欄圖片
  getAnnouncementImage(imageKey) {
    return this.images[imageKey] || null;
  }
  
  // 格式化時間顯示
  formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes} 分鐘前`;
    } else if (hours < 24) {
      return `${hours} 小時前`;
    } else {
      return `${days} 天前`;
    }
  }
  
  // 格式化日期
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// 創建並導出服務實例
const announcementService = new AnnouncementService();
export default announcementService;