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
    };
  },
  computed: {
    filteredWorks() {
      if (this.selectedCategory === "全部") {
        return this.works;
      }
      return this.works.filter((work) => work.category === this.selectedCategory);
    },
  },
  async mounted() {
    await this.fetchWorks();
    // 在資料載入完成後初始化 Masonry
    this.$nextTick(() => {
      this.initMasonry();
    });
  },
  beforeUnmount() {
    // 清理 Masonry 實例
    if (this.masonry) {
      this.masonry.destroy();
    }
  },
  methods: {
    async fetchWorks() {
      try {
        const response = await axios.get("/api/portfolio");
        this.works = response.data;
      } catch (error) {
        console.error("獲取作品失敗:", error);
        // 使用模擬資料，並增加更多項目來演示瀑布流
        this.works = [
          {
            id: 1,
            title: "森林中的萊菲",
            category: "場景插畫",
            description: "享受森林時光的萊菲與小松鼠們",
            image: cWebpImg // 使用 import 的圖片，確保 Vite 正確處理
          },
          {
            id: 2,
            title: "寶藏菲爾",
            category: "人物插畫",
            description: "大盜菲爾與他的祕寶",
            image: flllWebpImg // 這將使用隨機漸層背景
          },
          {
            id: 3,
            title: "弓箭手小麥",
            category: "手繪",
            description: "手繪龍族戰士設計稿",
            image: handImg
          },
          {
            id: 4,
            title: "龐克兔兔",
            category: "隨筆/塗鴉/梗圖",
            description: "隨手畫北極家的兔子",
            image: sketchImg
          },
          {
            id: 5,
            title: "城市一角",
            category: "場景插畫",
            description: "咖鹿與羊在城市一角的夜生活",
            image: kaluImg
          },
          {
            id: 6,
            title: "我與師傅",
            category: "人物插畫",
            description: "離別也是另一種開始",
            image: characterImg
          },
          {
            id: 7,
            title: "出發冒險新世界",
            category: "場景插畫",
            description: "2024 獸與地下城主題投稿",
            image: sceneBImg
          },
          {
            id: 8,
            title: "hiyaya梗圖",
            category: "隨筆/塗鴉/梗圖",
            description: "本人梗圖創作",
            image: hiyaya
          },
          {
            id: 9,
            title: "有差分梗圖",
            category: "隨筆/塗鴉/梗圖",
            description: "No money no commission.",
            image: money01
          },
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
    goToWorkDetail(id) {
      this.$router.push(`/work/${id}`);
    },
  },
};
</script>