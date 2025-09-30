<style lang="scss" scoped>
@use "../styles/work-detail.scss" as *;
</style>

<template>
  <div class="page-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>
    
    <div v-else-if="work" class="work-detail">
      <div class="navigation-header">
        <button @click="goBack" class="btn back-btn">← 返回作品集</button>
        
        <div class="work-header-center">
          <h1 class="page-title">{{ work.title }}</h1>
          <div class="work-meta">
            <span class="work-category">{{ work.category }}</span>
            <span class="work-date">{{ formatDate(work.date) }}</span>
          </div>
        </div>
        
        <div class="work-navigation">
          <button @click="goPrevious" :disabled="!hasPrevious" class="btn nav-btn">← 上一張</button>
          <span class="work-counter">{{ currentIndex + 1 }} / {{ totalWorks }}</span>
          <button @click="goNext" :disabled="!hasNext" class="btn nav-btn">下一張 →</button>
        </div>
      </div>
      
      <div class="work-content">
        <div class="work-image">
          <img 
            v-if="work.image" 
            :src="work.image" 
            :alt="work.title"
            @click="openLightbox(work.image, work.title)"
            class="main-image"
          />
          <div v-else class="placeholder-image">
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
      
      <div class="work-gallery" v-if="work.gallery && work.gallery.length > 0">
        <h3>相關圖片與影片</h3>
        <div class="gallery-container">
          <button 
            v-if="work.gallery.length > visibleItems" 
            @click="scrollGallery(-1)" 
            :disabled="currentSlide === 0"
            class="gallery-nav-btn gallery-prev"
          >
            ←
          </button>
          
          <div class="gallery-wrapper" ref="galleryWrapper">
            <div 
              class="gallery-slider" 
              :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
            >
              <div v-for="(item, index) in work.gallery" :key="index" class="gallery-item">
                <!-- YouTube 影片 -->
                <div v-if="item.type === 'youtube'" class="youtube-container">
                  <iframe 
                    :src="getYouTubeEmbedUrl(item.url)"
                    frameborder="0"
                    allowfullscreen
                    class="youtube-iframe"
                  ></iframe>
                </div>
                <!-- 一般圖片 -->
                <img 
                  v-else-if="item.type === 'image'"
                  :src="item.url" 
                  :alt="item.title || `圖片 ${index + 1}`"
                  @click="openLightbox(item.url, item.title || `圖片 ${index + 1}`)"
                  class="gallery-image"
                />
                <!-- 佔位符 -->
                <div v-else class="placeholder-image">
                  <p>{{ item.title || `圖片 ${index + 1}` }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            v-if="work.gallery.length > visibleItems" 
            @click="scrollGallery(1)" 
            :disabled="currentSlide >= maxSlide"
            class="gallery-nav-btn gallery-next"
          >
            →
          </button>
        </div>
        
        <!-- 指示器 -->
        <div v-if="work.gallery.length > visibleItems" class="gallery-indicators">
          <span 
            v-for="n in Math.ceil(work.gallery.length / visibleItems)" 
            :key="n"
            @click="goToSlide(n - 1)"
            :class="{ active: Math.floor(currentSlide / visibleItems) === n - 1 }"
            class="indicator"
          ></span>
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
    
    <!-- 燈箱效果 -->
    <div v-if="lightbox.show" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-container" @click.stop>
        <button @click="closeLightbox" class="lightbox-close">×</button>
        
        <!-- 左導航按鈕 -->
        <button 
          v-if="lightbox.images.length > 1" 
          @click="previousLightboxImage" 
          :disabled="lightbox.currentIndex === 0"
          class="lightbox-nav-btn lightbox-prev"
        >
          ←
        </button>
        
        <!-- 主圖片 -->
        <img :src="lightbox.image" :alt="lightbox.title" class="lightbox-image" />
        
        <!-- 右導航按鈕 -->
        <button 
          v-if="lightbox.images.length > 1" 
          @click="nextLightboxImage" 
          :disabled="lightbox.currentIndex === lightbox.images.length - 1"
          class="lightbox-nav-btn lightbox-next"
        >
          →
        </button>
        
        <!-- 標題和計數器 -->
        <div class="lightbox-info">
          <div class="lightbox-title">{{ lightbox.title }}</div>
          <div v-if="lightbox.images.length > 1" class="lightbox-counter">
            {{ lightbox.currentIndex + 1 }} / {{ lightbox.images.length }}
          </div>
        </div>
        
        <!-- 縮圖導航 -->
        <div v-if="lightbox.images.length > 1" class="lightbox-thumbnails">
          <img 
            v-for="(img, index) in lightbox.images" 
            :key="index"
            :src="img.url" 
            :alt="img.title"
            @click="goToLightboxImage(index)"
            :class="{ active: index === lightbox.currentIndex }"
            class="lightbox-thumbnail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// 置入圖片
import cImage from '../assets/c.webp'
import sk01 from '../assets/sk01.webp'
import cl01 from '../assets/cl01.webp'
import flllWebpImg from "../assets/flll.webp";
import sk02 from '../assets/sk02.webp'
import cl02 from '../assets/cl02.webp'
import dlc02a from '../assets/dlc02-1.webp'
import dlc02b from '../assets/dlc02-2.webp'
import kaluImg from "../assets/kalu.webp";
import alnImg from "../assets/aln.webp";

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
      loading: true,
      works: [], // 所有作品列表
      currentIndex: 0, // 當前作品索引
      lightbox: {
        show: false,
        image: '',
        title: '',
        currentIndex: 0,
        images: []
      },
      // 畫廊滑動相關
      currentSlide: 0,
      visibleItems: 3, // 一次顯示的項目數量
      slideWidth: 250 // 每個項目的寬度 + 間距
    }
  },
  computed: {
    totalWorks() {
      return this.works.length
    },
    hasPrevious() {
      return this.currentIndex > 0
    },
    hasNext() {
      return this.currentIndex < this.totalWorks - 1
    },
    maxSlide() {
      if (!this.work || !this.work.gallery) return 0
      return Math.max(0, this.work.gallery.length - this.visibleItems)
    }
  },
  async mounted() {
    await this.fetchAllWorks()
    await this.fetchWork()
    
    // 初始化滑動設置
    this.updateVisibleItems()
    window.addEventListener('resize', this.updateVisibleItems)
  },
  methods: {
    async fetchAllWorks() {
      try {
        const response = await axios.get('/api/portfolio')
        this.works = response.data
      } catch (error) {
        console.error('獲取作品列表失敗:', error)
        // 使用模擬資料
        this.works = [
          { id: '1', title: '森林中的萊菲', category: '場景插畫' },
          { id: '2', title: '寶藏菲爾', category: '人物插畫' },
          { id: '3', title: '弓箭手小麥', category: '手繪' },
          { id: '4', title: '龐克兔兔', category: '隨筆/塗鴉/梗圖' },
          { id: '5', title: '城市一角', category: '場景插畫' },
          { id: '6', title: 'hiyaya梗圖', category: '人物插畫' },
          { id: '7', title: '角色草圖', category: '手繪' },
          { id: '8', title: 'hiyaya梗圖', category: '隨筆/塗鴉/梗圖' }
        ]
      }
      
      // 找到當前作品的索引
      this.currentIndex = this.works.findIndex(work => work.id == this.id)
      if (this.currentIndex === -1) {
        this.currentIndex = 0
      }
    },
    
    async fetchWork() {
      try {
        const response = await axios.get(`/api/portfolio/${this.id}`)
        this.work = response.data
      } catch (error) {
        console.error('獲取作品詳情失敗:', error)
        // 使用模擬資料
        const mockWorks = {
          '1': {
            id: this.id,
            title: '森林中的萊菲',
            category: '場景插畫',
            description: '這張圖是由萊菲委託，我的第一幅場景作品。',
            date: '2022-02-06',
            image: cImage || '/c.webp',
            dimensions: '3900x2364',
            software: 'Adobe Photoshop, Clip Studio Paint',
            duration: '約 15 天',
            process: '開始溝通沒有花很多時間，經過多次擬稿我選了最好的構圖，最終完成了這個充滿奇幻氛圍的插畫作品。',
            gallery: [
              {
                type: 'youtube',
                url: 'https://youtu.be/GoS0W3mMUUg',
                title: '創作過程影片'
              },
              {
                type: 'image',
                url: sk01 || '/sk01.webp',
                title: '草稿階段'
              },
              {
                type: 'image',
                url: cl01 || '/cl01.webp',
                title: '上色階段'
              },
              {
                type: 'image',
                url: cImage || '/c.webp',
                title: '完成作品'
              }
            ]
          },
          '2': {
            id: this.id,
            title: '寶藏菲爾',
            category: '人物插畫',
            description: 'RPG世界裡的菲爾。',
            date: '2024-02-20',
            image: flllWebpImg || '/flll.webp',
            dimensions: '1920x1080',
            software: 'Clip Studio Paint',
            duration: '約 10 天',
            process: '溝通上委託人選擇了盜賊與寶箱的題材，看著財寶金山我邊畫邊羨慕。',
            gallery: [
              {
                type: 'youtube',
                url: 'https://youtu.be/3CYFQPE8iBA',
                title: '創作過程影片'
              },
              {
                type: 'image',
                url: sk02 || '/sk02.webp',
                title: '草稿階段'
              },
              {
                type: 'image',
                url: cl02 || '/cl02.webp',
                title: '上色階段'
              },
              {
                type: 'image',
                url: dlc02a || '/dlc02-1.webp',
                title: '服裝設定'
              },
              {
                type: 'image',
                url: dlc02b || '/dlc02-2.webp',
                title: '服裝設定'
              } 
            ]
          },
          '3': {
            id: this.id,
            title: '弓箭手小麥',
            category: '手繪',
            description: '充滿力量感的弓箭手。',
            date: '2024-01-10',
            image: 'handImg' || '/handImg.webp',
            dimensions: '1920x1080',
            software: '手繪 + Photoshop',
            duration: '約 7 天',
            process: '從手繪草稿開始，再進行數位後製。',
            gallery: [
              {
                type: 'youtube',
                url: 'https://youtu.be/3CYFQPE8iBA',
                title: '創作過程影片'
              },
              {
                type: 'image',
                url: sk02 || '/sk02.webp',
                title: '草稿階段'
              },
              {
                type: 'image',
                url: cl02 || '/cl02.webp',
                title: '上色階段'
              },
              {
                type: 'image',
                url: dlc02a || '/dlc02-1.webp',
                title: '服裝設定'
              },
              {
                type: 'image',
                url: dlc02b || '/dlc02-2.webp',
                title: '服裝設定'
              }
            ]
          }
        };
        
        this.work = mockWorks[this.id] || {
          id: this.id,
          title: `作品 ${this.id}`,
          category: '場景插畫',
          description: '這是一個精美的插畫作品，展現了豐富的色彩運用和細緻的筆觸技巧。',
          date: new Date().toISOString().split('T')[0],
          dimensions: '2400x1800',
          software: 'Adobe Photoshop, Clip Studio Paint',
          duration: '約 15 天',
          process: '這個作品從靈感收集開始，經過多次草稿修改，最終完成了這個充滿藝術感的插畫作品。創作過程中特別注重光影效果和色彩搭配。'
        }
      } finally {
        this.loading = false
      }
    },
    goBack() {
      this.$router.push('/portfolio')
    },
    
    goPrevious() {
      if (this.hasPrevious) {
        const previousWork = this.works[this.currentIndex - 1]
        this.$router.push(`/work/${previousWork.id}`)
      }
    },
    
    goNext() {
      if (this.hasNext) {
        const nextWork = this.works[this.currentIndex + 1]
        this.$router.push(`/work/${nextWork.id}`)
      }
    },
    
    formatDate(dateString) {
      // 如果傳入的是自訂格式，直接返回
      if (typeof dateString === 'string' && !dateString.includes('T')) {
        return dateString
      }
      
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    openLightbox(imageUrl, title, imageIndex = 0) {
      // 收集所有圖片（包括主圖和相關圖片）
      const allImages = []
      
      // 添加主圖
      if (this.work.image) {
        allImages.push({
          url: this.work.image,
          title: `${this.work.title} - 主圖`
        })
      }
      
      // 添加相關圖片（排除YouTube影片）
      if (this.work.gallery) {
        this.work.gallery.forEach(item => {
          if (item.type === 'image') {
            allImages.push({
              url: item.url,
              title: item.title
            })
          }
        })
      }
      
      // 找到當前圖片的索引
      let currentIndex = allImages.findIndex(img => img.url === imageUrl)
      if (currentIndex === -1) currentIndex = 0
      
      this.lightbox = {
        show: true,
        image: imageUrl,
        title: title,
        currentIndex: currentIndex,
        images: allImages
      }
      
      document.body.style.overflow = 'hidden' // 防止背景滾動
      document.addEventListener('keydown', this.handleKeydown)
    },
    
    closeLightbox() {
      this.lightbox.show = false
      document.body.style.overflow = '' // 恢復滾動
      document.removeEventListener('keydown', this.handleKeydown)
    },
    
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeLightbox()
      } else if (event.key === 'ArrowLeft' && this.lightbox.show) {
        this.previousLightboxImage()
      } else if (event.key === 'ArrowRight' && this.lightbox.show) {
        this.nextLightboxImage()
      }
    },
    
    previousLightboxImage() {
      if (this.lightbox.currentIndex > 0) {
        this.lightbox.currentIndex--
        this.updateLightboxImage()
      }
    },
    
    nextLightboxImage() {
      if (this.lightbox.currentIndex < this.lightbox.images.length - 1) {
        this.lightbox.currentIndex++
        this.updateLightboxImage()
      }
    },
    
    goToLightboxImage(index) {
      this.lightbox.currentIndex = index
      this.updateLightboxImage()
    },
    
    updateLightboxImage() {
      const currentImage = this.lightbox.images[this.lightbox.currentIndex]
      if (currentImage) {
        this.lightbox.image = currentImage.url
        this.lightbox.title = currentImage.title
      }
    },
    
    getYouTubeEmbedUrl(url) {
      // 轉換 YouTube URL 為 embed 格式
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      const match = url.match(regExp)
      
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1&autoplay=0`
      }
      
      // 如果已經是 embed URL，直接返回
      if (url.includes('youtube.com/embed/')) {
        return url
      }
      
      return url
    },
    
    scrollGallery(direction) {
      const newSlide = this.currentSlide + direction
      if (newSlide >= 0 && newSlide <= this.maxSlide) {
        this.currentSlide = newSlide
      }
    },
    
    goToSlide(slideIndex) {
      const targetSlide = slideIndex * this.visibleItems
      if (targetSlide <= this.maxSlide) {
        this.currentSlide = targetSlide
      }
    },
    
    updateVisibleItems() {
      // 根據螢幕大小調整可見項目數量
      if (window.innerWidth <= 480) {
        this.visibleItems = 1
        this.slideWidth = window.innerWidth - 40 // 考慮 padding
      } else if (window.innerWidth <= 768) {
        this.visibleItems = 2
        this.slideWidth = (window.innerWidth - 60) / 2
      } else {
        this.visibleItems = 3
        this.slideWidth = 250
      }
      
      // 重置滑動位置
      this.currentSlide = Math.min(this.currentSlide, this.maxSlide)
    }
  },
  watch: {
    async id(newId) {
      // 更新當前索引
      this.currentIndex = this.works.findIndex(work => work.id == newId)
      if (this.currentIndex === -1) {
        this.currentIndex = 0
      }
      
      // 重新獲取作品資料
      this.loading = true
      await this.fetchWork()
    }
  },
  
  beforeUnmount() {
    // 清理事件監聽器
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = '' // 恢復滾動
    window.removeEventListener('resize', this.updateVisibleItems)
  }
}
</script>
