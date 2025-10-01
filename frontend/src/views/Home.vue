<style lang="scss" scoped>
@use "../styles/home.scss" as *;
</style>

<template>
  <div class="page-container no-top-margin">
    <!-- 英雄橫幅區域 -->
    <section class="hero-banner"
      :style="{ backgroundImage: `url(${heroBannerUrl}), linear-gradient(135deg, #667eea 0%, #764ba2 100%)` }">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1 class="hero-title">旅程起點 Journey Start</h1>
          <h2 class="hero-subtitle">歡迎來到冒險者的世界</h2>
          <p class="hero-description">這裡是你冒險旅程的起點，記錄著每一個精彩瞬間和創作故事。</p>
          <div class="hero-buttons">
            <router-link to="/portfolio" class="btn btn-primary">翻閱冒險日誌</router-link>
            <router-link to="/commission" class="btn btn-success">前往鐵匠鋪</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 修復中間三個卡片區域 -->
    <div class="features">
      <div class="card">
        <h3 class="card-title">公會市集</h3>
        <p>探索各種珍稀物品和裝備，尋找你需要的冒險道具。</p>
        <router-link to="/store" class="btn">進入市集</router-link>
      </div>

      <div class="card">
        <h3 class="card-title">冒險日誌</h3>
        <p>記錄著每一次冒險的精彩瞬間和創作軌跡。</p>
        <router-link to="/news" class="btn">翻閱日誌</router-link>
      </div>

      <div class="card">
        <h3 class="card-title">冒險者</h3>
        <p>認識更多志同道合的冒險夥伴，一起踏上旅程。</p>
        <router-link to="/links" class="btn">尋找夥伴</router-link>
      </div>
    </div>

    <!-- 完整布告欄區域 -->
    <section class="bulletin" aria-labelledby="bulletin-title">
      <div class="board-frame"
        :style="{ backgroundImage: `linear-gradient(rgba(74, 56, 44, 0.7), rgba(59, 45, 35, 0.8) 70%), url(${bulletinBgUrl})` }">
        <header class="board-header">
          <h2 id="bulletin-title" class="board-title">布告欄 Board</h2>
          <div class="board-controls">
            <div class="filter-group">
              <button type="button" v-for="filter in filters" :key="filter.tag"
                :class="['tag-filter', { 'is-active': activeFilter === filter.tag }]"
                @click="setActiveFilter(filter.tag)">
                {{ filter.label }}
              </button>
            </div>
            <div class="search-group">
              <input type="search" v-model="searchKeyword" placeholder="搜尋公告..." aria-label="搜尋公告"
                @input="handleSearch" />
            </div>
            <div class="view-modes">
              <button :class="['mode-btn', { 'is-active': viewMode === 'carousel' }]" @click="setViewMode('carousel')"
                aria-label="輪播模式">
                <p>卷軸</p>
              </button>
              <button :class="['mode-btn', { 'is-active': viewMode === 'grid' }]" @click="setViewMode('grid')"
                aria-label="網格模式">
                <p>總覽</p>
              </button>
            </div>
          </div>
        </header>

        <!-- 輪播模式 -->
        <div v-show="viewMode === 'carousel'" class="carousel-region" role="region" aria-roledescription="carousel"
          aria-label="置頂公告">
          <button class="nav-arrow prev" @click="slidePrev" :disabled="!canSlidePrev" aria-label="上一則">‹</button>
          <div class="carousel-viewport">
            <ul class="carousel-track" :style="{ transform: `translateX(${-currentIndex * (cardWidth + gap)}px)` }">
              <li v-for="flyer in filteredFlyers" :key="flyer.id" class="flyer" tabindex="0"
                @click="goToAnnouncement(flyer.id)">
                <article class="flyer-paper" :style="{ '--rand': getRandomRotation() }">
                  <div class="pin" aria-hidden="true"></div>
                  <h3 class="flyer-title">{{ flyer.title }}</h3>
                  <p class="flyer-desc">{{ flyer.description }}</p>
                  <ul class="flyer-tags">
                    <li v-for="tag in flyer.tags" :key="tag" :class="{ 'tag-new': tag === 'New' }">{{ tag }}</li>
                  </ul>
                  <div class="flyer-meta">
                    <span class="flyer-reward">{{ flyer.reward || '' }}</span>
                    <time class="flyer-time" :title="new Date(flyer.postedAt).toLocaleString()">
                      {{ formatTimeAgo(flyer.postedAt) }}
                    </time>
                  </div>
                </article>
              </li>
            </ul>
          </div>
          <button class="nav-arrow next" @click="slideNext" :disabled="!canSlideNext" aria-label="下一則">›</button>
        </div>

        <!-- 網格模式 -->
        <div v-show="viewMode === 'grid'" class="flyer-grid">
          <li v-for="flyer in filteredFlyers" :key="flyer.id" class="flyer" tabindex="0"
            @click="goToAnnouncement(flyer.id)">
            <article class="flyer-paper" :style="{ '--rand': getRandomRotation() }">
              <div class="pin" aria-hidden="true"></div>
              <h3 class="flyer-title">{{ flyer.title }}</h3>
              <p class="flyer-desc">{{ flyer.description }}</p>
              <ul class="flyer-tags">
                <li v-for="tag in flyer.tags" :key="tag" :class="{ 'tag-new': tag === 'New' }">{{ tag }}</li>
              </ul>
              <div class="flyer-meta">
                <span class="flyer-reward">{{ flyer.reward || '' }}</span>
                <time class="flyer-time" :title="new Date(flyer.postedAt).toLocaleString()">
                  {{ formatTimeAgo(flyer.postedAt) }}
                </time>
              </div>
            </article>
          </li>
        </div>

        <!-- 查看更多按鈕 -->
        <div class="view-more-container">
          <router-link to="/board" class="view-more-btn">查看更多公告</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import fantasyRiverScene from '../assets/fantasy-river-scene.jpg';
import redWoodBackground from '../assets/woodBk02.png';
import announcementService from '../services/announcementService';

export default {
  name: "Home",
  data() {
    return {
      // 布告欄完整資料
      flyers: [],

      // 篩選器選項
      filters: [
        { tag: "all", label: "全部" },
        { tag: "作品", label: "作品" },
        { tag: "活動", label: "活動" },
        { tag: "系統", label: "系統" },
        { tag: "招募", label: "招募" }
      ],

      // 當前狀態
      activeFilter: "all",
      searchKeyword: "",
      viewMode: "carousel",
      currentIndex: 0,
      visibleCount: 3,
      cardWidth: 350, // 增加卡片寬度
      gap: 30      // 增加間距
    };
  },
  computed: {
    // 英雄橫幅背景圖片
    heroBannerUrl() {
      // 使用 assets 導入的圖片
      return fantasyRiverScene;
    },

    // 布告欄背景圖片
    bulletinBgUrl() {
      return redWoodBackground;
    },

    // 篩選後的資料
    filteredFlyers() {
      let filtered = this.flyers;

      // 類別篩選
      if (this.activeFilter !== "all") {
        filtered = filtered.filter(flyer =>
          flyer.category === this.activeFilter ||
          flyer.tags.includes(this.activeFilter)
        );
      }

      // 關鍵字搜尋
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase().trim();
        filtered = filtered.filter(flyer =>
          flyer.title.toLowerCase().includes(keyword) ||
          flyer.description.toLowerCase().includes(keyword)
        );
      }

      return filtered;
    },

    // 輪播顯示的資料
    visibleFlyers() {
      if (this.viewMode === "grid") {
        return this.filteredFlyers;
      }

      // 輪播模式：顯示當前索引開始的指定數量
      const start = this.currentIndex;
      const end = start + this.visibleCount;
      return this.filteredFlyers.slice(start, end);
    },

    // 是否可以向左滑動
    canSlidePrev() {
      return this.currentIndex > 0;
    },

    // 是否可以向右滑動
    canSlideNext() {
      return this.currentIndex + this.visibleCount < this.filteredFlyers.length;
    },

    // 輪播容器樣式
    carouselStyle() {
      if (this.viewMode !== "carousel") return {};

      const containerWidth = this.visibleCount * this.cardWidth + (this.visibleCount - 1) * this.gap;
      return {
        width: `${containerWidth}px`,
        transform: `translateX(0px)`
      };
    }
  },

  async mounted() {
    // 從服務獲取布告欄數據
    this.flyers = await announcementService.getAnnouncements();
  },

  methods: {
    // 生成隨機旋轉角度，讓布告看起來更自然
    getRandomRotation() {
      return (Math.random() * 2 - 1).toFixed(2);
    },

    // 格式化時間顯示
    formatTimeAgo(timestamp) {
      return announcementService.formatTimeAgo(timestamp);
    },

    // 篩選器切換
    setActiveFilter(tag) {
      this.activeFilter = tag;
      this.currentIndex = 0; // 重置輪播位置
    },

    // 搜尋關鍵字
    handleSearch() {
      this.currentIndex = 0; // 重置輪播位置
    },

    // 清除搜尋
    clearSearch() {
      this.searchKeyword = "";
      this.currentIndex = 0;
    },

    // 切換檢視模式
    setViewMode(mode) {
      this.viewMode = mode;
    },

    // 向左滑動
    slidePrev() {
      if (this.canSlidePrev) {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
      }
    },

    // 向右滑動
    slideNext() {
      if (this.canSlideNext) {
        const maxIndex = this.filteredFlyers.length - this.visibleCount;
        this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
      }
    },

    // 點擊公告跳轉（可以跳轉到告示板頁面的特定公告）
    goToAnnouncement(id) {
      // 跳轉到告示板頁面，並傳遞公告ID
      this.$router.push(`/board?announcement=${id}`);
    }
  }
};
</script>