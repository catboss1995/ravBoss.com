<template>
  <div class="page-container">
    <h1 class="page-title">服務條款</h1>
    
    <div class="terms-content">
      <section class="terms-section">
        <h2>1. 服務範圍</h2>
        <p>
          RavBoss.com 提供包括但不限於插畫設計、角色設計、概念美術、商業設計等創作服務。
          具體服務內容以雙方確認的委託合約為準。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>2. 委託流程</h2>
        <ul>
          <li>客戶提交委託需求和相關資料</li>
          <li>我們提供報價和預計完成時間</li>
          <li>客戶確認委託並支付訂金（通常為總金額的50%）</li>
          <li>開始創作並定期提供進度更新</li>
          <li>完成作品並交付，客戶支付尾款</li>
        </ul>
      </section>
      
      <section class="terms-section">
        <h2>3. 付款條件</h2>
        <p>
          委託確認後需支付50%訂金，剩餘款項於作品完成交付時支付。
          我們接受銀行轉帳、PayPal等付款方式。逾期付款可能影響交付時程。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>4. 修改政策</h2>
        <p>
          每個委託項目包含最多3次免費修改機會。超出免費修改次數的調整將收取額外費用。
          重大修改（如風格變更、重新繪製等）將重新評估報價。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>5. 著作權與使用權</h2>
        <p>
          完成的作品著作權歸客戶所有，客戶享有商業使用權。
          創作者保留作品的署名權和展示權，可將作品用於作品集展示。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>6. 交付與驗收</h2>
        <p>
          作品將以數位檔案形式交付，包含高解析度原檔和適用於不同用途的格式。
          客戶應在收到作品後7天內完成驗收，逾期視為驗收通過。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>7. 取消政策</h2>
        <p>
          委託開始後如需取消，已支付的訂金將根據完成進度決定退還金額。
          已完成超過50%的工作將不予退還訂金。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>8. 免責聲明</h2>
        <p>
          我們不對因作品使用而產生的任何直接或間接損失承擔責任。
          客戶應確保委託內容不侵犯他人權益，相關法律責任由客戶承擔。
        </p>
      </section>
      
      <section class="terms-section">
        <h2>9. 聯絡資訊</h2>
        <p>
          如對本條款有任何疑問，請聯絡我們：<br>
          Email: contact@ravboss.com<br>
          電話: +886-123-456-789
        </p>
      </section>
      
      <div class="terms-footer">
        <p><strong>本條款最後更新日期：2025年9月25日</strong></p>
        <p>RavBoss.com 保留隨時修改本條款的權利，修改後的條款將在網站上公佈。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms'
}
</script>

<style scoped>
.terms-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.terms-section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
}

.terms-section:last-of-type {
  border-bottom: none;
}

.terms-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.terms-section p {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.terms-section ul {
  margin-left: 1.5rem;
  color: #2c3e50;
}

.terms-section li {
  margin-bottom: 0.5rem;
}

.terms-footer {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
}

.terms-footer p {
  margin-bottom: 0.5rem;
  color: #7f8c8d;
}

.terms-footer p:last-child {
  margin-bottom: 0;
}
</style>