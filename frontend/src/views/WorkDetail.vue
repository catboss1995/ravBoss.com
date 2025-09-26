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
          { id: '3', title: '龍族戰士', category: '手繪' },
          { id: '4', title: '日常塗鴉', category: '隨筆/塗鴉/梗圖' },
          { id: '5', title: '天空之城', category: '場景插畫' },
          { id: '6', title: '暗黑騎士', category: '人物插畫' },
          { id: '7', title: '角色草圖', category: '手繪' },
          { id: '8', title: '搞笑梗圖', category: '隨筆/塗鴉/梗圖' }
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
            title: '龍族戰士',
            category: '手繪',
            description: '充滿力量感的龍族戰士設計。',
            date: '2024-01-10',
            image: 'https://cdn.jsdelivr.net/gh/catboss1995/ravBoss.com@main/images/portfolio/work_3_large.jpg',
            dimensions: '1920x1080',
            software: '手繪 + Photoshop',
            duration: '約 7 天',
            process: '從手繪草稿開始，再進行數位後製。',
            gallery: []
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

<style scoped>
.navigation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
  flex-wrap: wrap;
  gap: 1rem;
}

.work-header-center {
  flex: 1;
  text-align: center;
  padding-left: 150px;
  min-width: 200px;
}

.work-header-center .page-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.work-header-center .work-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-btn {
  margin: 0;
}

.work-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ecf0f1;
  color: #95a5a6;
}

.nav-btn:disabled:hover {
  transform: none;
  background-color: #ecf0f1;
}

.work-counter {
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0 0.5rem;
  min-width: 60px;
  text-align: center;
}



.work-category {
  background-color: #474747;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.work-date {
  color: #7f8c8d;
  font-size: 0.8rem;
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

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
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

.gallery-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.gallery-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-slider {
  display: flex;
  transition: transform 0.3s ease;
  gap: 1rem;
}

.gallery-nav-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.gallery-nav-btn:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.7);
}

.gallery-nav-btn:disabled {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: not-allowed;
}

.gallery-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #3498db;
}

.indicator:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.gallery-item {
  flex: 0 0 230px; /* 固定寬度，不縮放 */
  height: 200px;
}

.gallery-item .placeholder-image {
  background-color: #ecf0f1;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #7f8c8d;
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.youtube-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.youtube-iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
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

/* 燈箱效果 */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
}

.lightbox-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  margin: 0 60px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.lightbox-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.lightbox-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.lightbox-nav-btn:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-nav-btn:disabled {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}

.lightbox-prev {
  left: 10px;
}

.lightbox-next {
  right: 10px;
}

.lightbox-info {
  margin-top: 1rem;
  text-align: center;
  color: white;
}

.lightbox-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.lightbox-counter {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.lightbox-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.5rem;
}

.lightbox-thumbnail {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.lightbox-thumbnail:hover {
  opacity: 0.8;
}

.lightbox-thumbnail.active {
  opacity: 1;
  border: 2px solid #3498db;
}

@media (max-width: 768px) {
  .navigation-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .work-header-center {
    order: 1;
  }
  
  .back-btn {
    order: 0;
    align-self: flex-start;
  }
  
  .work-navigation {
    order: 2;
    justify-content: center;
  }
  
  .work-header-center .page-title {
    font-size: 1.3rem;
  }
  
  .work-header-center .work-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .work-counter {
    font-size: 0.8rem;
    min-width: 50px;
  }
  
  .work-content {
    grid-template-columns: 1fr;
  }
  
  .gallery-item {
    flex: 0 0 calc(50% - 0.5rem);
  }
  
  .gallery-nav-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .main-image {
    height: 250px;
  }
  
  .lightbox-container {
    max-width: 95vw;
    padding: 0 10px;
  }
  
  .lightbox-close {
    top: -30px;
    font-size: 1.5rem;
  }
  
  .lightbox-title {
    font-size: 1rem;
  }
  
  .lightbox-nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .lightbox-image {
    margin: 0 50px;
    max-height: 60vh;
  }
  
  .lightbox-thumbnails {
    max-width: 95vw;
  }
  
  .lightbox-thumbnail {
    width: 50px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .work-navigation {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .nav-btn {
    flex: 1;
    min-width: 100px;
  }
  
  .work-counter {
    order: -1;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .main-image {
    height: 200px;
  }
  
  .gallery-item {
    flex: 0 0 calc(100% - 1rem);
  }
  
  .gallery-container {
    flex-direction: column;
  }
  
  .gallery-nav-btn {
    display: none;
  }
  
  .gallery-wrapper {
    width: 100%;
  }
  
  .gallery-image,
  .youtube-container {
    height: 120px;
  }
  
  .lightbox-close {
    top: -25px;
    font-size: 1.2rem;
  }
  
  .lightbox-title {
    font-size: 0.9rem;
  }
  
  .lightbox-nav-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .lightbox-prev {
    left: 5px;
  }
  
  .lightbox-next {
    right: 5px;
  }
  
  .lightbox-image {
    margin: 0 45px;
    max-height: 50vh;
  }
  
  .lightbox-thumbnails {
    display: none; /* 在小螢幕上隱藏縮圖 */
  }
}
</style>