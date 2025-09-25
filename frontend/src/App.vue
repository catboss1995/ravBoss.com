<style lang="scss" scoped>
@use "./styles/navbar.scss" as *;
@use "./styles/anSpark.scss" as *;
</style>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">

        <!-- 所有按鈕在同一行，Logo 在中間 -->
        <router-link to="/portfolio" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">冒險歷程</div>
            <div class="english">Portfolio</div>
          </div>
        </router-link>
        <router-link to="/commission" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">鐵匠鋪</div>
            <div class="english">Commission</div>
          </div>
        </router-link>
        <router-link to="/store" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">公會市集</div>
            <div class="english">Goods</div>
          </div>
        </router-link>
        <router-link to="/news" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">冒險日誌</div>
            <div class="english">Blog</div>
          </div>
        </router-link>

        <!-- 為 Logo 添加內聯樣式以確保優先級 -->
        <router-link to="/" class="nav-logo">
          <img  ref="logoTilt" src="./assets/LOGO-s.png" alt="旅程起點 Journey Start" style="transform-style: preserve-3d ; transform: translateZ(20px) !important;"/>
        </router-link>

        <router-link to="/terms" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">委託契約</div>
            <div class="english">Terms</div>
          </div>
        </router-link>
        <router-link to="/about" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">工會資訊</div>
            <div class="english">About</div>
          </div>
        </router-link>
        <router-link to="/board" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">告示板</div>
            <div class="english">Board</div>
          </div>
        </router-link>
        <router-link to="/links" class="nav-link button-container forge-btn">
          <div class="nav-text">
            <div class="chinese">冒險者</div>
            <div class="english">Friends Links</div>
          </div>
        </router-link>
        <router-link to="/login" style="width: 55%; border-radius: 90%;" class="nav-link button-container forge-btn login-icon">
          <i class="fas fa-user"></i>
        </router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2025 冒險者檔案</p>
    </footer>
  </div>
</template>

<script>
import VanillaTilt from 'vanilla-tilt';
export default {
  name: "App",
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
    initTilt() {
      if (this.$refs.logoTilt) {
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
        console.warn('Logo 元素不存在，無法初始化 tilt 效果');
      }
    },
    
    handleResize() {
      if (this.$refs.logoTilt && this.$refs.logoTilt.vanillaTilt) {
        this.$refs.logoTilt.vanillaTilt.destroy();
      }
      this.initTilt();
    }
  }
};
</script>

