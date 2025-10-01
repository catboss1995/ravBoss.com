<style lang="scss" scoped>
@use "../styles/terms.scss" as *;
</style>

<template>
  <div class="page-container">
    <!-- 導航按鈕 -->
    <button class="nav-toggle" @click="toggleNav">
      <i class="fas fa-scroll"></i>
    </button>

    <!-- 遮罩層 -->
    <div class="overlay" :class="{ show: navOpen }" @click="closeNav"></div>

    <!-- 浮動導航 -->
    <div class="floating-nav" :class="{ open: navOpen }">
      <div class="nav-card">
        <button class="nav-close" @click="closeNav">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="nav-title">
          <i class="fas fa-scroll"></i>
          契約卷軸
        </div>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'title' }"
          @click="scrollToSection('title')"
        >
          <i class="fas fa-crown"></i>
          契約標題
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'workflow' }"
          @click="scrollToSection('workflow')"
        >
          <i class="fas fa-tasks"></i>
          委託流程
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'scope' }"
          @click="scrollToSection('scope')"
        >
          <i class="fas fa-hammer"></i>
          鍛造範圍
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'process' }"
          @click="scrollToSection('process')"
        >
          <i class="fas fa-list-ol"></i>
          鍛造流程
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'payment' }"
          @click="scrollToSection('payment')"
        >
          <i class="fas fa-coins"></i>
          付款條件
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'modification' }"
          @click="scrollToSection('modification')"
        >
          <i class="fas fa-edit"></i>
          修改政策
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'copyright' }"
          @click="scrollToSection('copyright')"
        >
          <i class="fas fa-copyright"></i>
          著作權
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'delivery' }"
          @click="scrollToSection('delivery')"
        >
          <i class="fas fa-shipping-fast"></i>
          交付驗收
        </button>
        
        <button 
          class="nav-item" 
          :class="{ active: currentSection === 'contact' }"
          @click="scrollToSection('contact')"
        >
          <i class="fas fa-envelope"></i>
          聯絡資訊
        </button>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="scroll-container">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="scroll-content">
          <div class="bottom-rod"></div>
          
          <div class="terms-content">
            <!-- 標題區域 -->
            <div class="scroll-title" ref="title">
              <h1>契約卷軸</h1>
              <div class="subtitle">Terms & Conditions</div>
            </div>
            
            <!-- 委託流程區域 -->
            <section class="workflow-section" ref="workflow">
              <h2>委託流程 Commission Process</h2>
              <div class="workflow-container">
                <!-- 第一排 -->
                <div class="workflow-row">
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="step-title">寄出委託信</div>
                    <div class="step-details">
                      仕事信箱<br>
                      <span class="email">catboss1995@aol.com</span><br>
                      <router-link to="/commission" class="link">點此直接填表寄信</router-link>
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-reply"></i>
                    </div>
                    <div class="step-title">收取回信</div>
                    <div class="step-details">
                      確認報價與截稿日<br>
                      等細節項目
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="step-title">確認草稿</div>
                    <div class="step-details">
                      <span class="highlight">修改次數</span><br>
                      接受3次小改<br>
                      1次大改
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-money-bill"></i>
                    </div>
                    <div class="step-title">繳交訂金</div>
                    <div class="step-details">
                      <span class="highlight">3千元以下收全款<br>以上收65%訂金</span><br>
                      <span class="link">收款方法?</span>
                    </div>
                  </div>
                </div>
                
                <!-- 第二排 -->
                <div class="workflow-row">
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-palette"></i>
                    </div>
                    <div class="step-title">製　作</div>
                    <div class="step-details">
                      需要中途確認節點<br>
                      與討論歡迎提出
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="step-title">確認完稿</div>
                    <div class="step-details">
                      此流程僅接受小改<br>
                      <span class="highlight">不接受大改</span>
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-credit-card"></i>
                    </div>
                    <div class="step-title">繳交尾款</div>
                    <div class="step-details">
                      <span class="highlight">付齊剩下金額</span>
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-circle">
                      <i class="fas fa-download"></i>
                    </div>
                    <div class="step-title">收取成品</div>
                    <div class="step-details">
                      <span class="highlight">結案後不接受修改</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="note-section">
                <h3>
                  <i class="fas fa-info-circle"></i> 
                  特殊案件說明
                </h3>
                <p>
                  如果案件較為特殊可討論客製化程度，其他領域，歡迎查看合作夥伴
                </p>
              </div>
            </section>
            
            <!-- 各個章節 -->
            <section class="terms-section" ref="scope">
              <h2>1. 鍛造範圍</h2>
              <p>
                本鐵匠鋪提供包括但不限於奇幻插畫、角色設定、世界觀設計、
                概念藝術等創作服務。具體鍛造內容以雙方確認的鍛造契約為準。
              </p>
            </section>
            
            <section class="terms-section" ref="process">
              <h2>2. 繪圖委託鍛造流程</h2>
              <ul>
                <li>冒險者提交鍛造需求和設計要求</li>
                <li>鐵匠評估材料成本並提供報價</li>
                <li>冒險者確認訂單並支付訂金（超過3千通常為總金額的65%）</li>
                <li>開始鍛造並定期回報進度</li>
                <li>完成道具並交付，冒險者支付尾款</li>
              </ul>
            </section>
            
            <section class="terms-section" ref="payment">
              <h2>3. 付款條件</h2>
              <p>
                委託確認後需支付65%訂金，剩餘款項於作品完成交付時支付。
                我們接受銀行轉帳、PayPal等付款方式。逾期付款可能影響交付時程。
              </p>
            </section>
            
            <section class="terms-section" ref="modification">
              <h2>4. 修改政策</h2>
              <p>
                每個委託項目包含最多3次免費修改機會。
                超出免費修改次數的調整將收取額外費用。
                重大修改（如風格變更、重新繪製等）將重新評估報價。
              </p>
            </section>
            
            <section class="terms-section" ref="copyright">
              <h2>5. 著作權與使用權</h2>
              <p>
                完成的作品著作權歸客戶所有，客戶享有商業使用權。
                創作者保留作品的署名權和展示權，可將作品用於作品集展示。
              </p>
            </section>
            
            <section class="terms-section" ref="delivery">
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
            
            <section class="terms-section" ref="contact">
              <h2>9. 聯絡資訊</h2>
              <p>
                如對本條款有任何疑問，請聯絡我們：<br>
                Email: catboss1995@aol.com<br>
              </p>
            </section>
            
            <div class="terms-footer">
              <p><strong>本條款最後更新日期：2025年9月25日</strong></p>
              <p>RavBoss.com 保留隨時修改本條款的權利，修改後的條款將在網站上公佈。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      navOpen: false,
      currentSection: 'title'
    }
  },
  mounted() {
    this.setupScrollListener()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen
    },
    closeNav() {
      this.navOpen = false
    },
    scrollToSection(section) {
      this.currentSection = section
      
      const element = this.$refs[section]
      if (element) {
        const elementTop = element.offsetTop
        const offset = 100 // 偏移量，確保不被導航遮住
        
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        })
      }
      
      this.closeNav()
    },
    setupScrollListener() {
      window.addEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const sections = ['title', 'workflow', 'scope', 'process', 'payment', 'modification', 'copyright', 'delivery', 'contact']
      
      // 找到當前視窗中的章節
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = this.$refs[section]
        if (element) {
          const elementTop = element.offsetTop - 150
          if (scrollTop >= elementTop) {
            this.currentSection = section
            break
          }
        }
      }
    }
  }
}
</script>
