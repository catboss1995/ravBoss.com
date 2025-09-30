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
        // 使用豐富的模擬商品資料
        this.products = [
          {
            id: 1,
            name: '奇幻冒險畫冊',
            category: '魔法道具',
            description: '記錄著精彩冒險故事的畫冊，包含15張全彩插畫',
            price: 800,
            stock: 10,
            rating: 4.8,
            image: '/assets/ads01.jpg'
          },
          {
            id: 2,
            name: '角色徽章套組',
            category: '冒險裝備',
            description: '精緻角色徽章收藏套組，包含5個主要角色徽章',
            price: 150,
            stock: 25,
            rating: 4.5,
            image: '/assets/cl01.webp'
          },
          {
            id: 3,
            name: '魔法壁紙寶盒',
            category: '珍藏物品',
            description: '高品質奇幻壁紙收藏包，4K解析度數位下載',
            price: 300,
            stock: 99,
            rating: 4.9,
            image: '/assets/fantasy-river-scene.jpg'
          },
          {
            id: 4,
            name: '冒險者手札',
            category: '魔法道具',
            description: '紀錄冒險歷程的特製手札，附贈專屬羽毛筆',
            price: 450,
            stock: 8,
            rating: 4.6,
            image: '/assets/sceneB.webp'
          },
          {
            id: 5,
            name: '龍族戰士公仔',
            category: '冒險裝備',
            description: '限量版龍族戰士手作公仔，高約15公分',
            price: 1200,
            stock: 3,
            rating: 5.0,
            image: '/assets/character_ligh.webp'
          },
          {
            id: 6,
            name: '森林精靈貼紙包',
            category: '珍藏物品',
            description: '可愛森林精靈防水貼紙包，共20張不重複',
            price: 80,
            stock: 50,
            rating: 4.3,
            image: '/assets/c.webp'
          },
          {
            id: 7,
            name: '魔法陣滑鼠墊',
            category: '冒險裝備',
            description: '大尺寸魔法陣圖案滑鼠墊，防滑橡膠底部',
            price: 280,
            stock: 15,
            rating: 4.7,
            image: '/assets/sk01.webp'
          },
          {
            id: 8,
            name: '寶石收藏箱',
            category: '珍藏物品',
            description: '精美木製寶石收藏箱，內含7種仿製寶石',
            price: 680,
            stock: 6,
            rating: 4.4,
            image: '/assets/money01.webp'
          },
          {
            id: 9,
            name: '冒險地圖海報',
            category: '魔法道具',
            description: 'A2尺寸冒險世界地圖海報，厚磅紙張印製',
            price: 200,
            stock: 30,
            rating: 4.2,
            image: '/assets/all.webp'
          },
          {
            id: 10,
            name: '魔法師法杖筆',
            category: '冒險裝備',
            description: '造型精美的魔法師法杖原子筆，可正常書寫',
            price: 120,
            stock: 40,
            rating: 4.1,
            image: '/assets/hand.webp'
          }
        ]
      } finally {
        this.loading = false
      }
    }
  }
}
</script>