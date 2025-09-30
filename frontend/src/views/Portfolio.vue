<style lang="scss" scoped>
@use "../styles/portfolio.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">點圖可查看創作細節與委託過程</h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>

      <p>載入中...</p>
    </div>

    <div v-else>
      <div class="portfolio-filters">
        <div
          v-for="category in categories"
          :key="category"
          @click="filterByCategory(category)"
          :class="['filter-card', selectedCategory === category ? 'active' : '']"
        >
          <!-- 這裡放分類圖片 -->
          <div class="filter-image">
            <img 
              :src="getCategoryImage(category)" 
              :alt="category"
              class="category-img"
              @error="handleCategoryImageError($event, category)"
            />
            <!-- 分類名稱覆蓋在圖片上 -->
            <div class="filter-label">
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <div ref="masonryGrid" class="portfolio-grid masonry-grid">
        <div
          v-for="work in filteredWorks"
          :key="work.id"
          class="portfolio-item card masonry-item"
          @click="goToWorkDetail(work.id)"
        >
          <div class="portfolio-image">
            <!-- 使用實際圖片替代隨機背景 -->
            <img 
              v-if="work.image" 
              :src="work.image" 
              :alt="work.title"
              class="work-image"
              @error="handleImageError($event, work)"
              @load="handleImageLoad($event, work)"
            >
            <div 
              v-else
              class="placeholder-image"
              :style="{ 
                height: getRandomHeight() + 'px',
                background: getRandomGradient()
              }"
            >
              <p>{{ work.title }}</p>
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

    <!-- 作品詳情 Modal -->
    <div v-if="showWorkModal" class="work-modal-overlay" @click="closeWorkModal">
      <div class="work-modal-container" @click.stop>
        <div class="work-modal-header">
          <button @click="closeWorkModal" class="modal-close">×</button>
          
          <div class="work-navigation">
            <button @click="goPreviousWork" :disabled="!hasPrevious" class="btn nav-btn">← 上一張</button>
            <span class="work-counter">{{ currentWorkIndex + 1 }} / {{ allWorks.length }}</span>
            <button @click="goNextWork" :disabled="!hasNext" class="btn nav-btn">下一張 →</button>
          </div>
        </div>

        <div class="work-modal-content" v-if="selectedWork">
          <div class="work-modal-left">
            <!-- 主圖片 -->
            <div class="work-image-section">
              <img 
                v-if="selectedWork.image"
                :src="selectedWork.image" 
                :alt="selectedWork.title"
                @click="openLightbox(selectedWork.image, selectedWork.title)"
                class="main-image"
              />
              <div v-else class="placeholder-image">
                <p>{{ selectedWork.title }}</p>
              </div>
            </div>

            <!-- 相關圖片畫廊 -->
            <div class="work-gallery" v-if="selectedWork.gallery && selectedWork.gallery.length > 0">
              <h3>相關圖片與影片</h3>
              <div class="gallery-container">
                <button 
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
                    <div 
                      v-for="(item, index) in selectedWork.gallery" 
                      :key="index"
                      class="gallery-item"
                    >
                      <img 
                        v-if="item.type === 'image'"
                        :src="item.url"
                        :alt="item.title"
                        @click="openLightbox(item.url, item.title)"
                        class="gallery-image"
                      />
                      <div v-else-if="item.type === 'youtube'" class="youtube-container">
                        <iframe
                          :src="getYouTubeEmbedUrl(item.url)"
                          :title="item.title"
                          class="youtube-iframe"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                      <div v-else class="placeholder-image">
                        <p>{{ item.title }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  @click="scrollGallery(1)" 
                  :disabled="currentSlide >= maxSlide"
                  class="gallery-nav-btn gallery-next"
                >
                  →
                </button>
              </div>
              
              <!-- 指示器 -->
              <div v-if="selectedWork.gallery.length > visibleItems" class="gallery-indicators">
                <span 
                  v-for="slideIndex in Math.ceil((selectedWork.gallery.length - visibleItems + 1))"
                  :key="slideIndex"
                  @click="goToSlide(slideIndex - 1)"
                  :class="['indicator', currentSlide === (slideIndex - 1) * visibleItems ? 'active' : '']"
                ></span>
              </div>
            </div>
          </div>

          <div class="work-modal-right">
            <div class="work-info-section">
              <h1 class="work-title">{{ selectedWork.title }}</h1>
              <div class="work-meta">
                <span class="work-category">{{ selectedWork.category }}</span>
                <span class="work-date">{{ formatDate(selectedWork.date) }}</span>
              </div>

              <h3>作品描述</h3>
              <p class="work-description">{{ selectedWork.description }}</p>
              
              <h3>技術規格</h3>
              <ul class="work-specs">
                <li><strong>尺寸：</strong>{{ selectedWork.dimensions }}</li>
                <li><strong>軟體：</strong>{{ selectedWork.software }}</li>
                <li><strong>完成日期：</strong>{{ formatDate(selectedWork.date) }}</li>
              </ul>
              
              <h3>創作過程</h3>
              <p class="work-process">{{ selectedWork.process || '這個作品從概念發想到完成經歷了多個階段，包括草稿繪製、色彩設計、細節調整等步驟。' }}</p>

              <div class="work-actions">
                <button class="btn btn-primary">聯絡委託</button>
                <button class="btn">分享作品</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 燈箱效果 -->
    <div v-if="lightbox.show" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-container" @click.stop>
        <button @click="closeLightbox" class="lightbox-close">×</button>
        
        <!-- 左導航按鈕 -->
        <button 
          v-if="lightbox.images.length > 1" 
          @click="previousLightboxImage" 
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
            v-for="(image, index) in lightbox.images"
            :key="index"
            :src="image.url"
            :alt="image.title"
            @click="goToLightboxImage(index)"
            :class="['lightbox-thumbnail', lightbox.currentIndex === index ? 'active' : '']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Masonry from "masonry-layout";
import ImageManager from "../../../config/images.js";
// 嘗試直接 import 圖片以確保載入
import cWebpImg from "../assets/c.webp";
import flllWebpImg from "../assets/flll.webp";
import kaluImg from "../assets/kalu.webp";
import alnImg from "../assets/aln.webp";
import hiyaya from "../assets/iyaya.webp";
import money01 from "../assets/money01.webp";
// 選單圖
import characterImg from "../assets/character_ligh.webp";
import allImg from "../assets/all.webp";
import handImg from "../assets/hand.webp";
import sceneBImg from "../assets/sceneB.webp";
import sketchImg from "../assets/sketch.webp";

export default {
  name: "Portfolio",
  data() {
    return {
      works: [],
      loading: true,
      selectedCategory: "全部",
      categories: ["全部", "場景插畫", "人物插畫", "手繪", "隨筆/塗鴉/梗圖"],
      masonry: null,
      // Modal 相關狀態
      showWorkModal: false,
      selectedWork: null,
      allWorks: [], // 用於導航的完整作品列表
      currentWorkIndex: 0, // 當前作品在列表中的索引
      // 燈箱相關狀態
      lightbox: {
        show: false,
        image: '',
        title: '',
        currentIndex: 0,
        images: []
      },
      // 畫廊滑動相關
      currentSlide: 0,
      visibleItems: 3,
      slideWidth: 250
    };
  },
  computed: {
    filteredWorks() {
      if (this.selectedCategory === "全部") {
        return this.works;
      }
      return this.works.filter((work) => work.category === this.selectedCategory);
    },
    // Modal 導航相關
    hasPrevious() {
      return this.currentWorkIndex > 0;
    },
    hasNext() {
      return this.currentWorkIndex < this.allWorks.length - 1;
    },
    maxSlide() {
      if (!this.selectedWork || !this.selectedWork.gallery) return 0;
      return Math.max(0, this.selectedWork.gallery.length - this.visibleItems);
    }
  },
  async mounted() {
    await this.fetchWorks();
    // 在資料載入完成後初始化 Masonry
    this.$nextTick(() => {
      this.initMasonry();
    });
    
    // 初始化滑動設置
    this.updateVisibleItems();
    window.addEventListener('resize', this.updateVisibleItems);
  },
  beforeUnmount() {
    // 清理 Masonry 實例
    if (this.masonry) {
      this.masonry.destroy();
    }
    
    // 清理事件監聽器
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = ''; // 恢復滾動
    window.removeEventListener('resize', this.updateVisibleItems);
  },
  methods: {
    async fetchWorks() {
      try {
        const response = await axios.get("/api/portfolio");
        this.works = response.data;
      } catch (error) {
        console.error("獲取作品失敗:", error);
        // 使用完整的模擬資料
        this.works = [
          {
            id: 1,
            title: "森林中的萊菲",
            category: "場景插畫",
            description: "享受森林時光的萊菲與小松鼠們",
            image: cWebpImg,
            gallery: [cWebpImg, characterImg, sceneBImg],
            tags: ["奇幻", "森林", "角色設計"],
            createdAt: "2024-03-15",
            software: ["Photoshop", "Procreate"],
            dimensions: "1920x1080",
            featured: true
          },
          {
            id: 2,
            title: "寶藏菲爾",
            category: "人物插畫",
            description: "大盜菲爾與他的祕寶",
            image: flllWebpImg,
            gallery: [flllWebpImg, handImg, kaluImg],
            tags: ["角色設計", "大盜", "寶藏"],
            createdAt: "2024-02-20",
            software: ["Clip Studio Paint"],
            dimensions: "1080x1350"
          },
          {
            id: 3,
            title: "弓箭手小麥",
            category: "手繪",
            description: "手繪弓箭手小麥",
            image: handImg,
            gallery: [handImg],
            tags: ["手繪", "戰士", "龍族"],
            createdAt: "2024-01-10",
            software: ["傳統手繪"],
            dimensions: "A4"
          },
          {
            id: 4,
            title: "龐克兔兔",
            category: "隨筆/塗鴉/梗圖",
            description: "隨手畫北極家的兔子",
            image: sketchImg,
            gallery: [sketchImg],
            tags: ["龐克", "兔子", "塗鴉"],
            createdAt: "2024-04-01",
            software: ["iPad Pro", "Apple Pencil"],
            dimensions: "2048x2732"
          },
          {
            id: 5,
            title: "城市一角",
            category: "場景插畫",
            description: "咖鹿與羊在城市一角的夜生活",
            image: kaluImg,
            gallery: [kaluImg],
            tags: ["城市", "夜景", "生活"],
            createdAt: "2024-03-28",
            software: ["Photoshop", "Blender"],
            dimensions: "3840x2160"
          },
          {
            id: 6,
            title: "師徒",
            category: "人物插畫", 
            description: "離別也是另一種開始",
            image: characterImg,
            gallery: [characterImg, cWebpImg],
            tags: ["師傅", "離別", "傷感"],
            createdAt: "2024-02-14",
            software: ["Procreate"],
            dimensions: "2048x2048"
          },
          {
            id: 7,
            title: "出發冒險新世界",
            category: "場景插畫",
            description: "2024 獸與地下城主題投稿",
            image: sceneBImg,
            gallery: [sceneBImg, kaluImg, characterImg],
            tags: ["冒險", "獸人", "地下城"],
            createdAt: "2024-05-12",
            software: ["Photoshop", "3D Max"],
            dimensions: "4096x2304"
          },
          {
            id: 8,
            title: "hiyaya梗圖",
            category: "隨筆/塗鴉/梗圖",
            description: "本人梗圖創作",
            image: hiyaya,
            gallery: [hiyaya, sketchImg],
            tags: ["梗圖", "幽默", "日常"],
            createdAt: "2024-04-20",
            software: ["手機繪圖"],
            dimensions: "1080x1080"
          },
          {
            id: 9,
            title: "有差分梗圖",
            category: "隨筆/塗鴉/梗圖", 
            description: "No money no commission.",
            image: money01,
            gallery: [money01, hiyaya],
            tags: ["梗圖", "委託", "幽默"],
            createdAt: "2024-04-25",
            software: ["MS Paint"],
            dimensions: "800x600"
          },
          {
            id: 10,
            title: "魔法森林",
            category: "場景插畫",
            description: "充滿魔法氣息的神秘森林",
            image: cWebpImg,
            gallery: [cWebpImg, sceneBImg, characterImg],
            tags: ["魔法", "森林", "奇幻"],
            createdAt: "2024-05-30",
            software: ["Photoshop", "After Effects"],
            dimensions: "3440x1440"
          }
        ];
      } finally {
        this.loading = false;
      }
    },
    initMasonry() {
      if (this.$refs.masonryGrid) {
        this.masonry = new Masonry(this.$refs.masonryGrid, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-item',
          percentPosition: true,
          gutter: 0, // 移除間隔
        });
      }
    },
    async filterByCategory(category) {
      this.selectedCategory = category;
      
      // 等待 DOM 更新後重新排列瀑布流
      await this.$nextTick();
      
      if (this.masonry) {
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    },
    getRandomHeight() {
      // 為了演示瀑布流效果，生成隨機高度（配合最大高度限制）
      const heights = [200, 250, 300, 350, 320, 380, 400];
      return heights[Math.floor(Math.random() * heights.length)];
    },
    getRandomGradient() {
      // 生成隨機漸層背景
      const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
      ];
      return gradients[Math.floor(Math.random() * gradients.length)];
    },
    getCategoryImage(category) {
      // 特殊處理本地圖片，使用正確的 import 變數
      const categoryImages = {
        '全部': allImg,
        '場景插畫': sceneBImg,
        '人物插畫': characterImg,
        '手繪': handImg,
        '隨筆/塗鴉/梗圖': sketchImg
      };
      
      // 如果有對應的本地圖片，直接返回
      if (categoryImages[category]) {
        return categoryImages[category];
      }
      
      // 使用圖片管理器獲取分類圖片
      try {
        return ImageManager.getCategoryImage(category);
      } catch (error) {
        console.warn('Failed to load category image:', category, error);
        // 返回佔位圖片
        return ImageManager.getPlaceholderImage(300, 150, category);
      }
    },
    
    getWorkImage(workId, size = 'medium') {
      // 獲取作品圖片
      try {
        return ImageManager.getPortfolioImage(workId, size);
      } catch (error) {
        console.warn('Failed to load work image:', workId, error);
        // 返回佔位圖片
        return ImageManager.getPlaceholderImage(400, 300, `作品 ${workId}`);
      }
    },
    handleImageLoad(event, work) {
      console.log(`Successfully loaded image for work: ${work.title}`, event.target.src);
      // 圖片載入完成後重新佈局 Masonry
      if (this.masonry) {
        this.$nextTick(() => {
          this.masonry.layout();
        });
      }
    },
    handleImageError(event, work) {
      console.error(`Failed to load image for work: ${work.title}`, {
        src: event.target.src,
        error: event
      });
      // 使用備用圖片替代隱藏
      event.target.src = ImageManager.getPlaceholderImage(400, 300, work.title);
    },
    handleCategoryImageError(event, category) {
      console.error(`Failed to load category image: ${category}`, {
        src: event.target.src,
        error: event
      });
      // 使用備用圖片
      event.target.src = ImageManager.getPlaceholderImage(300, 150, category);
    },
    async goToWorkDetail(id) {
      // 改為打開 Modal 而不是路由跳轉
      await this.openWorkModal(id);
    },

    // Modal 相關方法
    async openWorkModal(workId) {
      try {
        // 從 API 獲取作品詳情
        let work;
        try {
          const response = await axios.get(`/api/portfolio/${workId}`);
          work = response.data;
        } catch (error) {
          console.error('獲取作品詳情失敗:', error);
          // 使用模擬資料
          work = await this.getMockWorkDetail(workId);
        }

        this.selectedWork = work;
        this.allWorks = this.works; // 使用當前的作品列表
        this.currentWorkIndex = this.allWorks.findIndex(w => w.id == workId);
        if (this.currentWorkIndex === -1) {
          this.currentWorkIndex = 0;
        }
        
        this.showWorkModal = true;
        document.body.style.overflow = 'hidden'; // 防止背景滾動
        
        // 初始化畫廊設置
        this.currentSlide = 0;
        this.updateVisibleItems();
        
      } catch (error) {
        console.error('打開作品詳情失敗:', error);
      }
    },

    closeWorkModal() {
      this.showWorkModal = false;
      this.selectedWork = null;
      this.closeLightbox(); // 關閉可能開啟的燈箱
      document.body.style.overflow = ''; // 恢復滾動
    },

    // 導航方法
    async goPreviousWork() {
      if (this.hasPrevious) {
        const previousWork = this.allWorks[this.currentWorkIndex - 1];
        await this.openWorkModal(previousWork.id);
      }
    },

    async goNextWork() {
      if (this.hasNext) {
        const nextWork = this.allWorks[this.currentWorkIndex + 1];
        await this.openWorkModal(nextWork.id);
      }
    },

    // 獲取模擬作品詳情
    async getMockWorkDetail(workId) {
      // 導入需要的圖片
      const cImage = (await import('../assets/c.webp')).default;
      const sk01 = (await import('../assets/sk01.webp')).default;
      const cl01 = (await import('../assets/cl01.webp')).default;
      const flllWebpImg = (await import("../assets/flll.webp")).default;
      const sk02 = (await import('../assets/sk02.webp')).default;
      const cl02 = (await import('../assets/cl02.webp')).default;
      const dlc02a = (await import('../assets/dlc02-1.webp')).default;
      const dlc02b = (await import('../assets/dlc02-2.webp')).default;
      const kaluImg = (await import("../assets/kalu.webp")).default;
      const alnImg = (await import("../assets/aln.webp")).default;

      const mockWorks = {
        '1': {
          id: '1',
          title: '森林中的萊菲',
          category: '場景插畫',
          description: '這張圖是由萊菲委託，我的第一幅場景作品。',
          date: '2022年2月6日',
          dimensions: '3900x2364',
          software: 'Adobe Photoshop, Clip Studio Paint',
          process: '開始溝通沒有花很多時間，經過多次擬稿我選了最好的構圖，最終完成了這個充滿奇幻氛圍的插畫作品。',
          image: cImage,
          gallery: [
            { type: 'youtube', url: 'https://youtu.be/GoS0W3mMUUg', title: '創作過程影片' },
            { type: 'image', url: sk01, title: '草稿階段' },
            { type: 'image', url: cl01, title: '上色階段' },
            { type: 'image', url: cImage, title: '完成作品' }
          ]
        },
        '2': {
          id: '2',
          title: '寶藏菲爾',
          category: '人物插畫',
          description: 'RPG世界裡的菲爾。',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '溝通上委託人選擇了盜賊與寶箱的題材，看著財寶金山我邊畫邊羨慕。',
          image: flllWebpImg,
          gallery: [
            { type: 'youtube', url: 'https://youtu.be/3CYFQPE8iBA', title: '創作過程影片' },
            { type: 'image', url: sk02, title: '草稿階段' },
            { type: 'image', url: cl02, title: '上色階段' },
            { type: 'image', url: dlc02a, title: '服裝設定' },
            { type: 'image', url: dlc02b, title: '服裝設定' }
          ]
        },
        '3': {
          id: '3',
          title: '弓箭手小麥',
          category: '手繪',
          description: '',
          date: '2024年1月20日',
          dimensions: 'A5 紙本',
          software: '鉛筆、針筆、麥克筆',
          process: '純手繪作品，從初步草圖到完稿約花費8小時。特別注重盔甲細節和武器設計的合理性。',
          image: handImg,
          gallery: []
        },
        '4': {
          id: '4',
          title: '龐克兔兔',
          category: '隨筆/塗鴉/梗圖',
          description: '隨手畫北極佳的兔子',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '贈圖',
          image: sketchImg,
          gallery: []
        },
        '5': {
          id: '5',
          title: '痞痞潮潮ㄉ羊跟鹿',
          category: '場景插畫',
          description: '城市夜生活',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '贈圖',
          image: kaluImg,
          gallery: [
            { type: 'youtube', url: 'https://youtu.be/Ggeu1xIXGsk', title: '創作過程影片' },
          ]
        },
        '6': {
          id: '6',
          title: '師徒',
          category: '人物插畫',
          description: '離別也是另一種開始',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '原創',
          image: characterImg,
          gallery: []
        },
        '7': {
          id: '7',
          title: '出發冒險新世界',
          category: '場景插畫',
          description: '2024獸與地下城主題投稿',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '贈圖',
          image: sceneBImg,
          gallery: []
        },
        '8': {
          id: '8',
          title: '痞痞潮潮ㄉ羊跟鹿',
          category: '場景插畫',
          description: '城市夜生活',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '贈圖',
          image: iyaya.webp,
          gallery: [
            { type: 'youtube', url: 'https://youtu.be/ZZ5LpwO-An4', title: '梗的影片' },
          ]
        },
        '9': {
          id: '9',
          title: '痞痞潮潮ㄉ羊跟鹿',
          category: '場景插畫',
          description: '城市夜生活',
          date: '2024年2月20日',
          dimensions: '1920x1080',
          software: 'Clip Studio Paint',
          process: '贈圖',
          image: kaluImg,
          gallery: [
            { type: 'youtube', url: 'https://youtu.be/Ggeu1xIXGsk', title: '創作過程影片' },
          ]
        },
      };
      
      return mockWorks[workId] || {
        id: workId,
        title: `作品 ${workId}`,
        category: '場景插畫',
        description: '這是一個精美的插畫作品，展現了豐富的色彩運用和細緻的筆觸技巧。',
        date: new Date().toISOString().split('T')[0],
        dimensions: '2400x1800',
        software: 'Adobe Photoshop, Clip Studio Paint',
        process: '這個作品從概念發想到完成經歷了多個階段，包括草稿繪製、色彩設計、細節調整等步驟。',
        image: null,
        gallery: []
      };
    },

    // 燈箱相關方法
    openLightbox(imageUrl, title, imageIndex = 0) {
      // 收集所有圖片（包括主圖和相關圖片）
      const allImages = [];
      
      // 添加主圖
      if (this.selectedWork.image) {
        allImages.push({
          url: this.selectedWork.image,
          title: `${this.selectedWork.title} - 主圖`
        });
      }
      
      // 添加相關圖片（排除YouTube影片）
      if (this.selectedWork.gallery) {
        this.selectedWork.gallery.forEach(item => {
          if (item.type === 'image') {
            allImages.push({
              url: item.url,
              title: item.title || `${this.selectedWork.title} - 相關圖片`
            });
          }
        });
      }
      
      // 找到當前圖片的索引
      let currentIndex = allImages.findIndex(img => img.url === imageUrl);
      if (currentIndex === -1) currentIndex = 0;
      
      this.lightbox = {
        show: true,
        image: imageUrl,
        title: title,
        currentIndex: currentIndex,
        images: allImages
      };
      
      document.addEventListener('keydown', this.handleKeydown);
    },

    closeLightbox() {
      this.lightbox.show = false;
      document.removeEventListener('keydown', this.handleKeydown);
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        if (this.lightbox.show) {
          this.closeLightbox();
        } else if (this.showWorkModal) {
          this.closeWorkModal();
        }
      } else if (event.key === 'ArrowLeft' && this.lightbox.show) {
        this.previousLightboxImage();
      } else if (event.key === 'ArrowRight' && this.lightbox.show) {
        this.nextLightboxImage();
      }
    },

    previousLightboxImage() {
      // 支援循環：如果在第一張，跳到最後一張
      if (this.lightbox.currentIndex > 0) {
        this.lightbox.currentIndex--;
      } else {
        this.lightbox.currentIndex = this.lightbox.images.length - 1;
      }
      this.updateLightboxImage();
    },

    nextLightboxImage() {
      // 支援循環：如果在最後一張，跳到第一張
      if (this.lightbox.currentIndex < this.lightbox.images.length - 1) {
        this.lightbox.currentIndex++;
      } else {
        this.lightbox.currentIndex = 0;
      }
      this.updateLightboxImage();
    },

    goToLightboxImage(index) {
      this.lightbox.currentIndex = index;
      this.updateLightboxImage();
    },

    updateLightboxImage() {
      const currentImage = this.lightbox.images[this.lightbox.currentIndex];
      if (currentImage) {
        this.lightbox.image = currentImage.url;
        this.lightbox.title = currentImage.title;
      }
    },

    // 畫廊滑動方法
    scrollGallery(direction) {
      const newSlide = this.currentSlide + direction;
      if (newSlide >= 0 && newSlide <= this.maxSlide) {
        this.currentSlide = newSlide;
      }
    },

    goToSlide(slideIndex) {
      const targetSlide = slideIndex * this.visibleItems;
      if (targetSlide <= this.maxSlide) {
        this.currentSlide = targetSlide;
      }
    },

    updateVisibleItems() {
      // 根據螢幕大小調整可見項目數量
      if (window.innerWidth <= 480) {
        this.visibleItems = 1;
        this.slideWidth = window.innerWidth - 40;
      } else if (window.innerWidth <= 768) {
        this.visibleItems = 2;
        this.slideWidth = (window.innerWidth - 60) / 2;
      } else {
        this.visibleItems = 3;
        this.slideWidth = 250;
      }
      
      // 重置滑動位置
      this.currentSlide = Math.min(this.currentSlide, this.maxSlide);
    },

    formatDate(dateString) {
      // 如果傳入的是自訂格式，直接返回
      if (typeof dateString === 'string' && !dateString.includes('T')) {
        return dateString;
      }
      
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    getYouTubeEmbedUrl(url) {
      // 轉換 YouTube URL 為 embed 格式
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1&autoplay=0`;
      }
      
      // 如果已經是 embed URL，直接返回
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      
      return url;
    },
  },
};
</script>