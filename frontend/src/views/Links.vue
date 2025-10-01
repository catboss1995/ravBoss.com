<style lang="scss" scoped>
@use "../styles/links.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">商會夥伴 Fellow Allies</h1>

    <!-- 名片區域 -->
    <div class="business-cards-section">
      <div class="business-cards-grid">
        <div 
          v-for="card in processedBusinessCards" 
          :key="card.id"
          :class="[
            'card-container', 
            { 
              'active': activeCardId === card.id,
              'image-ad': card.adImage && hasAdContent(card) // 有廣告圖片且有廣告內容時使用圖片廣告
            }
          ]"
        >
          <div class="business-card"
              @mouseenter="setActiveCard(card.id)"
              @mouseleave="setActiveCard(null)">
            <!-- 卡片主體內容 -->
            <div class="card-content">
              <div class="card-image" :style="getCardBackgroundStyle(card)">
                <div class="card-avatar">
                  <img :src="card.avatar" :alt="card.name" />
                </div>
              </div>
              
              <div class="card-info">
                <h3 class="card-name">{{ card.name }}</h3>
                <p class="card-location" v-if="card.location">{{ card.location }}</p>
                <p class="card-title">{{ card.title }}</p>
                
                <!-- 社群按鈕 - 改為文字按鈕 -->
                <div class="card-social">
                  <!-- 對於有 links 屬性的名片 -->
                  <template v-if="card.links">
                    <button 
                      v-for="(link, index) in card.links" 
                      :key="index" 
                      class="social-button text-button" 
                      @click.stop="openLink(link.url)"
                    >
                      {{ getShortName(link.name) }}
                    </button>
                  </template>
                  <!-- 對於有 portfolio, contact, support 屬性的名片 -->
                  <template v-else>
                    <button class="social-button text-button" @click.stop="openLink(card.portfolio)">
                      作品
                    </button>
                    <button class="social-button text-button" @click.stop="openLink(card.contact)">
                      聯絡
                    </button>
                    <button class="social-button text-button" @click.stop="openLink(card.support)">
                      諮詢
                    </button>
                  </template>
                </div>
              </div>
            </div>
            
            <!-- 廣告區塊 - 只有當卡片有廣告內容時才顯示 -->
            <div class="ad-section" v-if="hasAdContent(card)">
              <!-- 沒有指定廣告圖片時使用文字廣告 -->
              <template v-if="!card.adImage && hasAdContent(card)">
                <div class="ad-block" @click.stop="openLink(card.adLinks?.[0]?.url || '#')">
                  {{ card.adLinks?.[0]?.title || '查看作品集' }}
                </div>
                <div class="ad-block" @click.stop="openLink(card.adLinks?.[1]?.url || '#')">
                  {{ card.adLinks?.[1]?.title || '聯絡合作' }}
                </div>
                <div class="ad-block" @click.stop="openLink(card.adLinks?.[2]?.url || '#')">
                  {{ card.adLinks?.[2]?.title || '預約諮詢' }}
                </div>
              </template>
              
              <!-- 有指定廣告圖片時使用圖片廣告 -->
              <template v-else>
                <div class="ad-block ad-image-block" @click.stop="openLink(card.adLinks?.[0]?.url || '#')">
                  <img :src="getAdImage(card)" :alt="card.adLinks?.[0]?.title" class="ad-image">
                  <!-- 毛玻璃效果的文字覆蓋層 -->
                  <div class="ad-text-overlay">
                    <div class="ad-title">{{ card.adLinks?.[0]?.title }}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 匯入圖片
import bg01 from '../assets/fantasy-river-scene.jpg'
import logo02 from '../assets/logo02.jpg'
import logo03 from '../assets/logo03.jpg'
import logo04 from '../assets/logo04.jpg'
import logo05 from '../assets/avatar.webp'
// 匯入廣告圖片
import adImage1 from '../assets/ads01.jpg'
import adImage2 from '../assets/ads02.jpg'
import adImage6 from '../assets/ads06.jpg'


export default {
  name: "Links",
  data() {
    return {
      bg01,
      // 廣告圖片
      adImages: {
        adImage1,
        adImage2,
        adImage6
      },
      activeCardId: null, // 追蹤當前活動的卡片ID
      businessCards: [
        {
          id: 1,
          avatar: "https://catboss1995.github.io/resume-portfolio/assets/profile-fEj_plNt.jpg",
          backgroundImage: bg01,
          name: "連璽臻",
          location: "迷因烏鴉", // 添加了 location 屬性
          title: "前端 / UIUX設計 / 插畫",
          company: "創意工作室",
          description: "專精於品牌視覺設計與使用者體驗",
          links: [
            { name: "電子履歷", url: "https://lihi.cc/P1SXc", icon: "" },
            { name: "EMAIL", url: "mailto:catboss1995@aol.com", icon: "" },
          ],
          // adLinks: [
          //   { title: "查看作品集", url: "https://lihi.cc/P1SXc" },
          //   { title: "聯絡合作", url: "mailto:catboss1995@aol.com" },
          //   { title: "預約諮詢", url: "https://calendly.com/example" }
          // ]
        },
        {
          id: 2,
          avatar: "https://assets.codepen.io/1807688/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1617384712&width=512",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          name: "田甜甜老師",
          location: "北商前端講師", // 添加了 location 屬性
          title: "網頁前端課程招生中！點圖查看詳細資訊",
          company: "北商",
          description: "前端課程講師，專注於實務教學與專案開發",
          adImage: "adImage1", // 指定使用哪個廣告圖片
          links: [
            { name: "教學資源網站", url: "https://tutorial.jumpdesign.tw/", icon: "" },
            { name: "課程", url: "https://www.ntubimdbirc.tw/course/20250313I002", icon: "" }
          ],
          adLinks: [
            { title: "前端課程熱烈招生中", url: "https://www.ntubimdbirc.tw/course/20250313I002" },
          ]
        },
        {
          id: 3,
          avatar: logo02,
          background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
          name: "雜貓窩萬事屋",
          location: "北極魔法工作室", // 添加了 location 屬性
          title: "項圈、石頭與魔法",
          company: "魔法工坊",
          description: "專精於手工藝品與魔法飾品製作",
          adImage: "adImage2", // 指定使用哪個廣告圖片
          links: [
            { name: "蝦皮", url: "https://shopee.tw/zimgela", icon: "" },
            { name: "網頁", url: "https://techblog.example.com", icon: "" },
            { name: "臉書", url: "https://facebook.com/techcreator", icon: "" }
          ],
          adLinks: [
            { title: "雜貓窩萬事屋專頁", url: "https://www.facebook.com/cats06" },
          ]
        },
        {
          id: 4,
          avatar: logo03,
          background: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
          name: "Sylvain Mark 同羽工作室",
          location: "願寶石的祝福常伴美好的生活!", // 添加了 location 屬性
          title: "#銀#輕珠寶 #首飾 #訂製 #彫金",
          company: "魔法工坊",
          description: "專精於手工藝品與魔法飾品製作",
          links: [
            { name: "Instagram", url: "https://www.instagram.com/sylvain.mark/", icon: "" },
            { name: "Threads", url: "https://www.threads.com/@sylvain.mark", icon: "" },
            { name: "Facebook", url: "https://www.facebook.com/SylvainMark", icon: "" },
          ],
          // 注意：這裡沒有 adLinks，所以不應該顯示廣告區塊
        },
        {
          id: 5,
          avatar: logo04,
          background: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
          name: "諾葉🦊 ",
          location: "亮亮光狐狸", // 添加了 location 屬性
          title: "療癒系繪師/手作小物",
          company: "",
          description: "",
          links: [
            { name: "微光手作坊", url: "https://www.threads.com/@tiny.light.foxy", icon: "" },
            { name: "Instagram", url: "https://www.instagram.com/noyeh1109", icon: "" },
          ],
        },
        {
          id: 6,
          avatar: logo05,
          background: "linear-gradient(135deg, #209cff 0%, #68e0cf 100%)",
          name: "神川紀也",
          location: "Akiya Kamikawa", // 添加了 location 屬性
          title: "精選神速高品質繪師",
          company: "住在折原臨也褲襠裡的可愛小精靈",
          description: "住在折原臨也褲襠裡的可愛小精靈",
          adImage: "adImage6", // 指定使用哪個廣告圖片
          links: [
            { name: "網頁", url: "https://portaly.cc/AkiyaKamikawa", icon: "" },
            { name: "facebook", url: "https://www.facebook.com/Akiya.Love.Izaya/", icon: "" },
            { name: "X", url: "https://x.com/AkiyaKamikawaX", icon: "" }
          ],
          adLinks: [
            { title: "T恤預購中，10月1日截單", url: "https://forms.gle/2GBaQncurfhQwGvW8" },
          ]
        },
        {
          id: 7,
          avatar: "https://via.placeholder.com/100x100/E8E8E8/666666?text=頭貼",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          name: "有選單樣板",
          location: "歡迎加入，請洽站主", // 添加了 location 屬性
          title: "描述串",
          company: "",
          description: "",
          links: [
            { name: "電子履歷", url: "https://www.threads.com/@tin555", icon: "" },
            { name: "EMAIL", url: "https://www.threads.com/@tin555", icon: "" },
          ],
          adLinks: [
            { title: "查看作品集", url: "https://www.threads.com/@tin555" },
            { title: "聯絡合作", url: "https://www.threads.com/@tin555" },
            { title: "預約諮詢", url: "https://www.threads.com/@tin555" }
          ]
        },
      ]
    };
  },
  computed: {
    processedBusinessCards() {
      return this.businessCards.map(card => ({
        ...card,
        backgroundImage: card.id === 1 ? this.bg01 : card.backgroundImage
      }));
    }
  },
  methods: {
    openLink(url) {
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
    },
    getCardBackgroundStyle(card) {
      if (card.backgroundImage) {
        return {
          backgroundImage: `url(${card.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      } else if (card.background) {
        return {
          background: card.background
        };
      }
      return {};
    },
    getAdImage(card) {
      // 如果卡片指定了廣告圖片，則使用該圖片，否則使用默認的 adImage1
      return this.adImages[card.adImage || 'adImage1'];
    },
    // 獲取社群名稱的簡短版本（最多10個字）
    getShortName(name) {
      // 社群媒體名稱對應的簡短名稱
      const shortNames = {
        'GitHub': 'Git',
        '網頁': '網頁',
        'Twitter': '推特',
        '技術部落格': '網誌',
        'Facebook': 'FB',
        '臉書': 'FB',
      };
      
      // 如果有預定義的簡短名稱，則使用它
      if (shortNames[name]) {
        return shortNames[name];
      }
      
      // 否則截取前10個字符
      return name.length > 10 ? name.substring(0, 10) : name;
    },
    getLinkIcon(linkName) {
      // 根據鏈接名稱返回相應的SVG路徑
      const icons = {
        'GitHub': 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        'Twitter': 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
        '技術部落格': 'M19.513 8.199l-4.702-4.702c-0.198-0.198-0.459-0.307-0.739-0.307h-9.069c-0.579 0-1.050 0.471-1.050 1.050v19.512c0 0.579 0.471 1.050 1.050 1.050h14.172c0.579 0 1.050-0.471 1.050-1.050v-14.452c0-0.28-0.109-0.541-0.312-0.745zM14.718 4.75l4.261 4.261h-4.261v-4.261zM19.125 22.702h-14.25v-19.404h8.293v5.409c0 0.579 0.471 1.050 1.050 1.050h4.907v12.945z',
        'Facebook': 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
      };
      
      return icons[linkName] || null;
    },
    // 設置當前活動的卡片
    setActiveCard(id) {
      this.activeCardId = id;
    },
    // 檢查卡片是否有廣告內容
    hasAdContent(card) {
      return Array.isArray(card.adLinks) && card.adLinks.length > 0;
    }
  }
};
</script>