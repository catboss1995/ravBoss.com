<template>
  <div class="page-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">頁面未找到</h1>
      <p class="error-message">
        抱歉，您要查找的頁面不存在或已被移除。
      </p>
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">返回首頁</router-link>
        <button @click="goBack" class="btn">返回上頁</button>
      </div>
      
      <div class="helpful-links">
        <h3>您可能想要：</h3>
        <ul>
          <li><router-link to="/portfolio">查看作品集</router-link></li>
          <li><router-link to="/commission">委託創作</router-link></li>
          <li><router-link to="/announcements">最新公告</router-link></li>
          <li><router-link to="/about">關於我們</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found-content {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.error-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.helpful-links {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
}

.helpful-links h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.helpful-links ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.helpful-links li {
  text-align: center;
}

.helpful-links a {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.helpful-links a:hover {
  background-color: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .helpful-links ul {
    grid-template-columns: 1fr;
  }
}
</style>