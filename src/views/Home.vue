<style lang="scss" scoped>
@use "../styles/home.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">旅程起點 Journey Start</h1>

    <div class="hero-section">
      <h2>歡迎來到冒險者的世界</h2>

      <p>這裡是你冒險旅程的起點，記錄著每一個精彩瞬間和創作故事。</p>

      <div class="hero-buttons">
        <router-link to="/portfolio" class="btn btn-primary">翻閱冒險相簿</router-link>

        <router-link to="/commission" class="btn btn-success">前往鐵匠鋪</router-link>
      </div>
    </div>

    <div class="features grid grid-3">
      <div class="card">
        <h3 class="card-title">冒險相簿</h3>

        <p>記錄著每一次冒險的精彩瞬間和創作軌跡。</p>

        <router-link to="/portfolio" class="btn">翻閱更多</router-link>
      </div>

      <div class="card">
        <h3 class="card-title">鐵匠鋪</h3>

        <p>為你打造專屬的裝備和道具，滿足冒險需求。</p>

        <router-link to="/commission" class="btn">立即委託</router-link>
      </div>

      <div class="card">
        <h3 class="card-title">告示板</h3>

        <p>查看最新的冒險資訊和重要公告。</p>

        <router-link to="/board" class="btn">查看告示</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

