<template>
  <div class="page-container">
    <h1 class="page-title">歡迎來到 RavBoss.com</h1>
    
    <div class="hero-section">
      <h2>專業的創作服務</h2>
      <p>提供高品質的設計和創作服務，包含插畫、設計、委託創作等。</p>
      <div class="hero-buttons">
        <router-link to="/portfolio" class="btn btn-primary">查看作品</router-link>
        <router-link to="/commission" class="btn btn-success">開始委託</router-link>
      </div>
    </div>

    <div class="features grid grid-3">
      <div class="card">
        <h3 class="card-title">專業作品集</h3>
        <p>瀏覽我們的精選作品，感受專業的創作品質。</p>
        <router-link to="/portfolio" class="btn">查看更多</router-link>
      </div>
      
      <div class="card">
        <h3 class="card-title">委託服務</h3>
        <p>提供客製化的創作服務，滿足您的特殊需求。</p>
        <router-link to="/commission" class="btn">立即委託</router-link>
      </div>
      
      <div class="card">
        <h3 class="card-title">最新公告</h3>
        <p>了解最新消息和服務更新。</p>
        <router-link to="/announcements" class="btn">查看公告</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.hero-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #7f8c8d;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features {
  margin-top: 2rem;
}
</style>