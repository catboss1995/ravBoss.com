<template>
  <div class="page-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>
    
    <div v-else-if="work" class="work-detail">
      <button @click="goBack" class="btn back-btn">← 返回作品集</button>
      
      <div class="work-header">
        <h1 class="page-title">{{ work.title }}</h1>
        <div class="work-meta">
          <span class="work-category">{{ work.category }}</span>
          <span class="work-date">{{ formatDate(work.date) }}</span>
        </div>
      </div>
      
      <div class="work-content">
        <div class="work-image">
          <div class="placeholder-image">
            <p>{{ work.title }} - 主圖</p>
          </div>
        </div>
        
        <div class="work-info">
          <h3>作品描述</h3>
          <p class="work-description">{{ work.description }}</p>
          
          <h3>技術規格</h3>
          <ul class="work-specs">
            <li><strong>尺寸:</strong> {{ work.dimensions || '1920x1080' }}</li>
            <li><strong>軟體:</strong> {{ work.software || 'Adobe Photoshop, Illustrator' }}</li>
            <li><strong>完成時間:</strong> {{ work.duration || '約 2-3 天' }}</li>
          </ul>
          
          <h3>創作過程</h3>
          <p class="work-process">{{ work.process || '這個作品從概念發想到完成經歷了多個階段，包括草稿繪製、色彩設計、細節調整等步驟。' }}</p>
        </div>
      </div>
      
      <div class="work-gallery">
        <h3>相關圖片</h3>
        <div class="gallery-grid">
          <div v-for="i in 3" :key="i" class="gallery-item">
            <div class="placeholder-image">
              <p>圖片 {{ i }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="work-actions">
        <button class="btn btn-primary">聯絡委託</button>
        <button class="btn">分享作品</button>
      </div>
    </div>
    
    <div v-else class="error-message">
      <h2>找不到作品</h2>
      <p>抱歉，您查找的作品不存在。</p>
      <button @click="goBack" class="btn">返回作品集</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WorkDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      work: null,
      loading: true
    }
  },
  async mounted() {
    await this.fetchWork()
  },
  methods: {
    async fetchWork() {
      try {
        const response = await axios.get(`/api/portfolio/${this.id}`)
        this.work = response.data
      } catch (error) {
        console.error('獲取作品詳情失敗:', error)
        // 使用模擬資料
        this.work = {
          id: this.id,
          title: `範例作品 ${this.id}`,
          category: '插畫',
          description: '這是一個精美的插畫作品，展現了豐富的色彩運用和細緻的筆觸技巧。',
          date: new Date().toISOString(),
          dimensions: '2400x1800',
          software: 'Adobe Photoshop, Clip Studio Paint',
          duration: '約 3-4 天',
          process: '這個作品從靈感收集開始，經過多次草稿修改，最終完成了這個充滿藝術感的插畫作品。創作過程中特別注重光影效果和色彩搭配。'
        }
      } finally {
        this.loading = false
      }
    },
    goBack() {
      this.$router.push('/portfolio')
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  watch: {
    id() {
      this.fetchWork()
    }
  }
}
</script>

<style scoped>
.back-btn {
  margin-bottom: 1rem;
}

.work-header {
  text-align: center;
  margin-bottom: 2rem;
}

.work-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.work-category {
  background-color: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.work-date {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.work-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.work-image .placeholder-image {
  background-color: #ecf0f1;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #7f8c8d;
}

.work-info h3 {
  color: #2c3e50;
  margin: 1.5rem 0 0.5rem 0;
}

.work-info h3:first-child {
  margin-top: 0;
}

.work-description,
.work-process {
  line-height: 1.6;
  color: #2c3e50;
}

.work-specs {
  list-style: none;
  padding: 0;
}

.work-specs li {
  padding: 0.25rem 0;
  color: #2c3e50;
}

.work-gallery {
  margin-bottom: 2rem;
}

.work-gallery h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item .placeholder-image {
  background-color: #ecf0f1;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #7f8c8d;
}

.work-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.error-message {
  text-align: center;
  padding: 2rem;
}

.error-message h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .work-content {
    grid-template-columns: 1fr;
  }
  
  .work-meta {
    flex-direction: column;
    align-items: center;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>