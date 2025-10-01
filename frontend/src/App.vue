<style lang="scss" scoped>
@use "./styles/navbar.scss" as *;
@use "./styles/anSpark.scss" as *;
</style>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <!-- 漢堡選單按鈕 (僅在移動設備顯示) -->
        <div class="hamburger-menu" :class="{ 'active': mobileMenuOpen }" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- 導航選單 (在桌面顯示為水平，在移動設備點擊漢堡選單後顯示為垂直) -->
        <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
          <!-- 左側選單項目 -->
          <div class="nav-group left-group">
            <router-link to="/portfolio" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">冒險相簿</div>
                <div class="english">Portfolio</div>
              </div>
            </router-link>
            <router-link to="/commission" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">委託鐵匠鋪</div>
                <div class="english">Commission</div>
              </div>
            </router-link>
            <router-link to="/terms" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">委託契約</div>
                <div class="english">Terms</div>
              </div>
            </router-link>
            <router-link to="/news" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">冒險日誌</div>
                <div class="english">Blog</div>
              </div>
            </router-link>
          </div>

          <!-- Logo (始終顯示在中間) -->
          <router-link to="/" class="nav-logo" @click="closeMobileMenu">
            <img ref="logoTilt" src="./assets/LOGO-s.png" alt="旅程起點 Journey Start" style="transform-style: preserve-3d; transform: translateZ(20px) !important;"/>
          </router-link>

          <!-- 右側選單項目 -->
          <div class="nav-group right-group">
            <router-link to="/store" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">公會市集</div>
                <div class="english">Goods</div>
              </div>
            </router-link>
            <router-link to="/about" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">工會資訊</div>
                <div class="english">About</div>
              </div>
            </router-link>
            <router-link to="/board" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">告示板</div>
                <div class="english">Board</div>
              </div>
            </router-link>
            <router-link to="/links" class="nav-link button-container forge-btn" @click="closeMobileMenu">
              <div class="nav-text">
                <div class="chinese">冒險者</div>
                <div class="english">Friends Links</div>
              </div>
            </router-link>
            <!-- <router-link to="/login" class="nav-link button-container forge-btn login-icon desktop-login" @click="closeMobileMenu">
              <i class="fas fa-user"></i>
            </router-link> -->
          </div>
        </div>

        <!-- 移動設備上的登入按鈕 -->
        <!-- <router-link to="/login" class="nav-link mobile-login-icon">
          <i class="fas fa-user"></i>
        </router-link> -->
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2025 RavBoss.com | 鴉行會版權所有</p>
    </footer>
  </div>
</template>

<script>
import VanillaTilt from 'vanilla-tilt';
export default {
  name: "App",
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  mounted() {
    console.log('App mounted');
    // 使用 nextTick 確保 DOM 已渲染
    this.$nextTick(() => {
      console.log('Logo 元素:', this.$refs.logoTilt);
      this.initTilt();
    });
    
    window.addEventListener('resize', this.handleResize);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      // 當選單打開時，禁止頁面滾動
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    
    closeMobileMenu() {
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
      }
    },
    
    initTilt() {
      if (this.$refs.logoTilt && window.innerWidth > 768) {
        console.log('初始化 tilt 效果');
        
        // 確保沒有其他樣式覆蓋我們的 transform-style
        this.$refs.logoTilt.style.transformStyle = 'preserve-3d';
        
        // 使用更明顯的參數
        VanillaTilt.init(this.$refs.logoTilt, {
          max: 25,            // 增加最大傾斜角度
          speed: 300,         // 適中的速度
          glare: true,        // 啟用眩光效果
          "max-glare": 0.5,   // 增加眩光強度
          scale: 1.1,         // 增加懸停時的縮放比例
          reset: true,        // 當鼠標離開時重置傾斜
          perspective: 800,   // 減小透視值，使 3D 效果更明顯
        });
        
        // 添加檢查
        console.log('Tilt 實例創建狀態:', !!this.$refs.logoTilt.vanillaTilt);
      } else {
        console.warn('Logo 元素不存在或視窗寬度過小，無法初始化 tilt 效果');
      }
    },
    
    handleResize() {
      // 在視窗大小改變時關閉移動選單
      if (window.innerWidth > 768 && this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
      }
      
      // 重新初始化 tilt 效果
      if (this.$refs.logoTilt && this.$refs.logoTilt.vanillaTilt) {
        this.$refs.logoTilt.vanillaTilt.destroy();
      }
      this.initTilt();
    }
  }
};
</script>