<style lang="scss" scoped>
@use "../styles/store.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">商鋪 Artifact Shop</h1>
    
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
              <button class="btn btn-success">加入<br>購物車</button>
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
      categories: ['全部', '魔法道具', '冒險裝備', '珍藏物品', '限量寶物']
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
            name: '奇幻冒險畫冊',
            category: '魔法道具',
            description: '記錄著精彩冒險故事的畫冊',
            price: 800
          },
          {
            id: 2,
            name: '角色徽章套組',
            category: '冒險裝備',
            description: '精緻角色徽章收藏套組',
            price: 150
          },
          {
            id: 3,
            name: '魔法壁紙寶盒',
            category: '珍藏物品',
            description: '高品質奇幻壁紙收藏包',
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
