<template>
  <div class="page-container">
    <h1 class="page-title">作品集</h1>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>
    
    <div v-else>
      <div class="portfolio-filters">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="['btn', selectedCategory === category ? 'btn-primary' : '']"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="portfolio-grid grid grid-3">
        <div 
          v-for="work in filteredWorks" 
          :key="work.id"
          class="portfolio-item card"
          @click="goToWorkDetail(work.id)"
        >
          <div class="portfolio-image">
            <div class="placeholder-image">
              <p>{{ work.title }}</p>
            </div>
          </div>
          <div class="portfolio-info">
            <h3 class="card-title">{{ work.title }}</h3>
            <p class="portfolio-category">{{ work.category }}</p>
            <p class="portfolio-description">{{ work.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Portfolio',
  data() {
    return {
      works: [],
      loading: true,
      selectedCategory: '全部',
      categories: ['全部', '插畫', '角色設計', '概念美術', '商業設計']
    }
  },
  computed: {
    filteredWorks() {
      if (this.selectedCategory === '全部') {
        return this.works
      }
      return this.works.filter(work => work.category === this.selectedCategory)
    }
  },
  async mounted() {
    await this.fetchWorks()
  },
  methods: {
    async fetchWorks() {
      try {
        const response = await axios.get('/api/portfolio')
        this.works = response.data
      } catch (error) {
        console.error('獲取作品失敗:', error)
        // 使用模擬資料
        this.works = [
          {
            id: 1,
            title: '範例作品 1',
            category: '插畫',
            description: '這是一個精美的插畫作品'
          },
          {
            id: 2,
            title: '範例作品 2',
            category: '角色設計',
            description: '獨特的角色設計創作'
          },
          {
            id: 3,
            title: '範例作品 3',
            category: '概念美術',
            description: '富有創意的概念美術'
          }
        ]
      } finally {
        this.loading = false
      }
    },
    goToWorkDetail(id) {
      this.$router.push(`/work/${id}`)
    }
  }
}
</script>

<style scoped>
.portfolio-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.portfolio-grid {
  margin-top: 1rem;
}

.portfolio-item {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.portfolio-image {
  margin-bottom: 1rem;
}

.placeholder-image {
  background-color: #ecf0f1;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.portfolio-category {
  color: #3498db;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.portfolio-description {
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>