<style lang="scss" scoped>
@use "../styles/links.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">旅伴名冊 Fellow Allies</h1>

    <!-- 名片區域 -->
    <div class="business-cards-section">
      <h2 class="section-title">盟友名片</h2>
      <div class="business-cards-grid">
        <div 
          v-for="card in businessCards" 
          :key="card.name"
          class="business-card"
        >
          <div 
            class="card-background"
            :style="{ 
              backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : 'none',
              background: !card.backgroundImage ? card.background : 'none'
            }"
          ></div>
          <!-- 調試用，顯示圖片路徑 -->
          <div v-if="card.id === 1" style="position: absolute; top: 5px; left: 5px; font-size: 10px; background: rgba(0,0,0,0.5); color: white; padding: 2px;">
            {{ card.backgroundImage }}
          </div>
          <div class="card-content">
            <div class="card-avatar">
              <img :src="card.avatar" :alt="card.name" />
            </div>
            <div class="card-info">
              <h3 class="card-name">{{ card.name }}</h3>
              <p class="card-location">{{ card.location }}</p>
              <p class="card-title">{{ card.title }}</p>
            </div>
            <div class="card-actions">
              <button 
                v-if="card.portfolio" 
                @click="openLink(card.portfolio)"
                class="card-btn card-btn-primary"
              >
                作品集
              </button>
              <button 
                v-if="card.contact" 
                @click="openLink(card.contact)"
                class="card-btn card-btn-secondary"
              >
                聯絡
              </button>
              <button 
                v-if="card.support" 
                @click="openLink(card.support)"
                class="card-btn card-btn-accent"
              >
                贊助
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="links-grid grid grid-2">
      <div class="links-category card">
        <h3 class="card-title">冒險據點</h3>

        <div class="links-list">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <div class="link-content">
              <img 
                v-if="link.image" 
                :src="link.image" 
                :alt="link.name"
                class="link-image"
              />
              <div class="link-info">
                <span class="link-name">{{ link.name }}</span>
                <span class="link-description">{{ link.description }}</span>
              </div>
              <div class="link-external">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">藝術工會</h3>

        <div class="links-list">
          <a
            v-for="link in creativeLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <div class="link-content">
              <img 
                v-if="link.image" 
                :src="link.image" 
                :alt="link.name"
                class="link-image"
              />
              <div class="link-info">
                <span class="link-name">{{ link.name }}</span>
                <span class="link-description">{{ link.description }}</span>
              </div>
              <div class="link-external">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">商會聯盟</h3>

        <div class="links-list">
          <a
            v-for="link in businessLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <div class="link-content">
              <img 
                v-if="link.image" 
                :src="link.image" 
                :alt="link.name"
                class="link-image"
              />
              <div class="link-info">
                <span class="link-name">{{ link.name }}</span>
                <span class="link-description">{{ link.description }}</span>
              </div>
              <div class="link-external">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">盟友名錄</h3>

        <div class="links-list">
          <a
            v-for="link in friendLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <div class="link-content">
              <img 
                v-if="link.image" 
                :src="link.image" 
                :alt="link.name"
                class="link-image"
              />
              <div class="link-info">
                <span class="link-name">{{ link.name }}</span>
                <span class="link-description">{{ link.description }}</span>
              </div>
              <div class="link-external">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入圖片
import logoImage from '../assets/LOGO-s.png'
import bg01 from '../assets/fantasy-river-scene.jpg'

export default {
  name: "Links",
  data() {
    return {
      socialLinks: [
        {
          name: "Twitter",
          url: "https://twitter.com/ravboss",
          description: "冒險日誌和創作分享",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg"
        },
        {
          name: "Instagram",
          url: "https://instagram.com/ravboss",
          description: "創作過程和靈感記錄",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/instagram.svg"
        },
        {
          name: "Facebook",
          url: "https://facebook.com/ravboss",
          description: "冒險者集會所",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg"
        },
      ],
      creativeLinks: [
        {
          name: "Pixiv",
          url: "https://pixiv.net/users/ravboss",
          description: "插畫作品展示",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/pixiv.svg"
        },
        {
          name: "ArtStation",
          url: "https://artstation.com/ravboss",
          description: "專業作品集",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/artstation.svg"
        },
        {
          name: "DeviantArt",
          url: "https://deviantart.com/ravboss",
          description: "創作社群",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/deviantart.svg"
        },
      ],
      businessLinks: [
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/ravboss",
          description: "商業合作聯絡",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/linkedin.svg"
        },
        {
          name: "Behance",
          url: "https://behance.net/ravboss",
          description: "設計作品展示",
          image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/behance.svg"
        },
      ],
      friendLinks: [
        {
          name: "創作者聯盟",
          url: "https://example.com/creators",
          description: "創作者交流平台",
          image: "https://via.placeholder.com/40x40/667eea/ffffff?text=CA"
        },
        {
          name: "設計師社群",
          url: "https://example.com/designers", 
          description: "設計師資源分享",
          image: "https://via.placeholder.com/40x40/f093fb/ffffff?text=DC"
        },
        {
          name: "RavBoss 官網",
          url: "https://ravboss.com",
          description: "主要創作平台",
          image: logoImage
        },
      ],
      businessCards: [
        {
          id: 1,
          avatar: "https://catboss1995.github.io/resume-portfolio/assets/profile-fEj_plNt.jpg",
          backgroundImage: "../assets/fantasy-river-scene.jpg",
          name: "連璽臻",
          location: "台北，士林", 
          title: "前端 / UIUX設計 / 插畫",
          company: "創意工作室",
          description: "專精於品牌視覺設計與使用者體驗",
          portfolio: "https://lihi.cc/P1SXc",
          contact: "mailto:catboss1995@aol.com",
          support: "https://support.example.com"
        },
        {
          id: 2,
          avatar: "https://assets.codepen.io/1807688/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1617384712&width=512",  // 使用已匯入的 LOGO
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          name: "創作夥伴",
          location: "高雄，台灣",
          title: "動畫師",
          company: "動畫工作室",
          description: "2D/3D 動畫製作與角色設計",
          portfolio: "https://tutorial.jumpdesign.tw/",
          contact: "mailto:catboss1995@aol.com",
          support: "https://www.ntubimdbirc.tw/course/20250313I002"
        },
        {
          id: 3,
          avatar: "https://via.placeholder.com/60x60/48bb78/ffffff?text=TC",
          background: "linear-gradient(135deg, #48bb78 0%, #38d9a9 100%)",
          name: "Tech Creator",
          location: "台中，台灣",
          title: "前端工程師",
          company: "科技新創",
          description: "Vue.js & React 開發專家",
          links: [
            { name: "GitHub", url: "https://github.com/techcreator", icon: "" },
            { name: "技術部落格", url: "https://techblog.example.com", icon: "" },
            { name: "Twitter", url: "https://twitter.com/techcreator", icon: "" }
          ]
        }
      ]
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    }
  }
};
</script>
