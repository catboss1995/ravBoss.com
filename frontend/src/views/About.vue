<template>
  <div class="page-container">
    <h1 class="page-title">關於我們</h1>
    
    <div class="about-content">
      <div class="about-text">
        <h2>RavBoss 創作工作室</h2>
        <p>
          歡迎來到 RavBoss 創作工作室！我們是一個專注於提供高品質創作服務的團隊，
          致力於為客戶帶來獨特而專業的創作體驗。
        </p>
        
        <h3>我們的服務</h3>
        <ul>
          <li>插畫設計</li>
          <li>角色設計</li>
          <li>概念美術</li>
          <li>商業設計</li>
          <li>客製化委託</li>
        </ul>
        
        <h3>聯絡資訊</h3>
        <p>
          如果您對我們的服務有任何疑問，或想要進行委託創作，
          歡迎透過以下方式聯絡我們：
        </p>
        <ul>
          <li>Email: contact@ravboss.com</li>
          <li>電話: +886-123-456-789</li>
        </ul>
      </div>
      
      <div class="about-image">
        <div class="placeholder-image">
          <p>工作室照片</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.about-text h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.about-text h3 {
  color: #34495e;
  margin: 1.5rem 0 0.5rem 0;
}

.about-text ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.about-text li {
  margin-bottom: 0.5rem;
}

.placeholder-image {
  background-color: #ecf0f1;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>