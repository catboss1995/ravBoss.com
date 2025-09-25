<style lang="scss" scoped>
@use "../styles/portfolio.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">冒險歷程 Portfolio</h1>

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
            <div 
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
            title: "魔法森林",
            category: "場景插畫",
            description: "神秘的魔法森林場景",
          },
          {
            id: 2,
            title: "精靈法師",
            category: "人物插畫",
            description: "森林深處的神秘精靈法師",
          },
          {
            id: 3,
            title: "龍族戰士",
            category: "手繪",
            description: "手繪龍族戰士設計稿",
          },
          {
            id: 4,
            title: "日常塗鴉",
            category: "隨筆/塗鴉/梗圖",
            description: "生活中的隨手塗鴉",
          },
          {
            id: 5,
            title: "天空之城",
            category: "場景插畫",
            description: "漂浮在雲端的神秘城市",
          },
          {
            id: 6,
            title: "暗黑騎士",
            category: "人物插畫",
            description: "墮落騎士的悲壯故事",
          },
          {
            id: 7,
            title: "角色草圖",
            category: "手繪",
            description: "角色設計初期草圖",
          },
          {
            id: 8,
            title: "搞笑梗圖",
            category: "隨筆/塗鴉/梗圖",
            description: "有趣的梗圖創作",
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
          gutter: 20,
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
      // 為了演示瀑布流效果，生成隨機高度
      const heights = [200, 250, 300, 350, 280, 320, 240, 380];
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
    goToWorkDetail(id) {
      this.$router.push(`/work/${id}`);
    },
  },
};
</script>


