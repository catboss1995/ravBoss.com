<template>
  <div class="page-container">
    <h1 class="page-title">委託服務</h1>
    
    <div class="commission-content">
      <div class="commission-info">
        <h2>委託流程</h2>
        <div class="process-steps">
          <div class="step">
            <h3>1. 提交需求</h3>
            <p>填寫委託表單，詳細描述您的需求</p>
          </div>
          <div class="step">
            <h3>2. 報價確認</h3>
            <p>我們會在24小時內回覆報價</p>
          </div>
          <div class="step">
            <h3>3. 開始創作</h3>
            <p>確認委託後開始創作過程</p>
          </div>
          <div class="step">
            <h3>4. 完成交付</h3>
            <p>完成作品並交付給您</p>
          </div>
        </div>
      </div>
      
      <div class="commission-form-container">
        <h2>委託表單</h2>
        <form @submit.prevent="submitCommission" class="commission-form">
          <div class="form-group">
            <label class="form-label">姓名 *</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="form-input" 
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              class="form-input" 
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label">委託類型 *</label>
            <select v-model="form.type" class="form-select" required>
              <option value="">請選擇</option>
              <option value="插畫">插畫</option>
              <option value="角色設計">角色設計</option>
              <option value="概念美術">概念美術</option>
              <option value="商業設計">商業設計</option>
              <option value="其他">其他</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">預算範圍</label>
            <select v-model="form.budget" class="form-select">
              <option value="">請選擇</option>
              <option value="1000-3000">NT$ 1,000 - 3,000</option>
              <option value="3000-5000">NT$ 3,000 - 5,000</option>
              <option value="5000-10000">NT$ 5,000 - 10,000</option>
              <option value="10000+">NT$ 10,000 以上</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">詳細需求 *</label>
            <textarea 
              v-model="form.description" 
              class="form-textarea" 
              rows="5"
              placeholder="請詳細描述您的委託需求..."
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">完成期限</label>
            <input 
              v-model="form.deadline" 
              type="date" 
              class="form-input"
            >
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="submitting"
          >
            {{ submitting ? '提交中...' : '提交委託' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Commission',
  data() {
    return {
      form: {
        name: '',
        email: '',
        type: '',
        budget: '',
        description: '',
        deadline: ''
      },
      submitting: false
    }
  },
  methods: {
    async submitCommission() {
      this.submitting = true
      
      try {
        await axios.post('/api/commission', this.form)
        alert('委託已成功提交！我們會盡快與您聯絡。')
        this.resetForm()
      } catch (error) {
        console.error('提交委託失敗:', error)
        alert('提交失敗，請稍後再試。')
      } finally {
        this.submitting = false
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        type: '',
        budget: '',
        description: '',
        deadline: ''
      }
    }
  }
}
</script>

<style scoped>
.commission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.commission-info h2,
.commission-form-container h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.step h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step p {
  color: #7f8c8d;
}

.commission-form {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

@media (max-width: 768px) {
  .commission-content {
    grid-template-columns: 1fr;
  }
}
</style>