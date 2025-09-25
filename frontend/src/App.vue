<style lang="scss">
@use "./styles/navbar.scss" as *;
</style>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">


        <!-- 所有按鈵在同一行，Logo 在中間 -->
        <router-link to="/portfolio" class="nav-link">
          <div class="nav-text">
            <div class="chinese">冒險歷程</div>
            <div class="english">Portfolio</div>
          </div>
        </router-link>
        <router-link to="/commission" class="nav-link">
          <div class="nav-text">
            <div class="chinese">鐵匠鋪</div>
            <div class="english">Commission</div>
          </div>
        </router-link>
        <router-link to="/store" class="nav-link">
          <div class="nav-text">
            <div class="chinese">公會市集</div>
            <div class="english">Goods</div>
          </div>
        </router-link>
        <router-link to="/news" class="nav-link">
          <div class="nav-text">
            <div class="chinese">冒險日誌</div>
            <div class="english">Blog</div>
          </div>
        </router-link>

        <!-- Logo 在中間 -->
        <router-link to="/" class="nav-logo">
          <img src="./assets/LOGO-s.png" alt="旅程起點 Journey Start" />
        </router-link>

        <router-link to="/terms" class="nav-link">
          <div class="nav-text">
            <div class="chinese">委託契約</div>
            <div class="english">Terms</div>
          </div>
        </router-link>
        <router-link to="/about" class="nav-link">
          <div class="nav-text">
            <div class="chinese">工會資訊</div>
            <div class="english">About</div>
          </div>
        </router-link>
        <router-link to="/board" class="nav-link">
          <div class="nav-text">
            <div class="chinese">告示板</div>
            <div class="english">Board</div>
          </div>
        </router-link>
        <router-link to="/links" class="nav-link">
          <div class="nav-text">
            <div class="chinese">冒險者</div>
            <div class="english">Friends Links</div>
          </div>
        </router-link>
        <router-link to="/login" class="nav-link login-icon">
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
export default {
  name: "App",
};
</script>
