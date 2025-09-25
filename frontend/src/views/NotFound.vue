<template>
  <div class="page-container">
    <div class="not-found-content">
      <div class="error-code">404</div>

      <h1 class="error-title">頁面未找到</h1>

      <p class="error-message">抱歉，您要查找的頁面不存在或已被移除。</p>

      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">返回首頁</router-link>

        <button @click="goBack" class="btn">返回上頁</button>
      </div>

      <div class="helpful-links">
        <h3>您可能想要：</h3>

        <ul>
          <li>
            <router-link to="/portfolio">查看作品集</router-link>
          </li>

          <li>
            <router-link to="/commission">委託創作</router-link>
          </li>

          <li>
            <router-link to="/board">最新公告</router-link>
          </li>

          <li>
            <router-link to="/about">關於我們</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.not-found-content {
  max-width: 600px;
  padding: 2rem;
  margin: 0 auto;
  text-align: center;
}

.error-code {
  margin-bottom: 1rem;
  color: #3498db;
  font-size: 8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .1);
}

.error-title {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 2rem;
}

.error-message {
  margin-bottom: 2rem;
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;

  gap: 1rem;
}

.helpful-links {
  padding: 2rem;
  text-align: left;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.helpful-links h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.helpful-links ul {
  display: grid;
  padding: 0;
  list-style: none;

  gap: .5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.helpful-links li {
  text-align: center;
}

.helpful-links a {
  display: block;
  padding: .5rem 1rem;
  color: #3498db;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color .3s;
}

.helpful-links a:hover {
  color: white;
  background-color: #3498db;
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
