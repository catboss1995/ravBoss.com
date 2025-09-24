<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">RavBoss.com</router-link>
        <div class="nav-menu">
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/about" class="nav-link">關於</router-link>
          <router-link to="/portfolio" class="nav-link">作品集</router-link>
          <router-link to="/commission" class="nav-link">委託</router-link>
          <router-link to="/announcements" class="nav-link">公告</router-link>
          <router-link to="/store" class="nav-link">商店</router-link>
          <router-link to="/links" class="nav-link">連結</router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="footer">
      <p>&copy; 2025 RavBoss.com. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全域樣式會在 style.css 中定義 */
</style>