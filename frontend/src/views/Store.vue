<template>
  <div class="page-container">
    <h1 class="page-title">商店</h1>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>
    
    <div v-else>
      <div class="store-categories">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="['btn', selectedCategory === category ? 'btn-primary' : '']"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="products-grid grid grid-3">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-item card"
        >
          <div class="product-image">
            <div class="placeholder-image">
              <p>{{ product.name }}</p>
            </div>
          </div>
          <div class="product-info">
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">
              <span class="price">NT$ {{ product.price }}</span>
              <button class="btn btn-success">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Store',
  data() {
    return {
      products: [],
      loading: true,
      selectedCategory: '全部',
      categories: ['全部', '原創商品', '周邊商品', '數位商品', '限定商品']
    }
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === '全部') {
        return this.products
      }
      return this.products.filter(product => product.category === this.selectedCategory)
    }
  },
  async mounted() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/api/store')
        this.products = response.data
      } catch (error) {
        console.error('獲取商品失敗:', error)
        // 使用模擬資料
        this.products = [
          {
            id: 1,
            name: '限定插畫集',
            category: '原創商品',
            description: '精選原創插畫作品集',
            price: 800
          },
          {
            id: 2,
            name: '角色貼紙組',
            category: '周邊商品',
            description: '可愛角色貼紙套組',
            price: 150
          },
          {
            id: 3,
            name: '數位桌布包',
            category: '數位商品',
            description: '高解析度桌布圖包',
            price: 300
          }
        ]
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.store-categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.products-grid {
  margin-top: 1rem;
}

.product-item {
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
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

.product-category {
  color: #3498db;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}
</style>