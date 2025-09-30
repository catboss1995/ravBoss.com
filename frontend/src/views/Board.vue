<style lang="scss" scoped>
@use "../styles/board.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">布告總覽 Boards</h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>

    <div v-else class="board-container">
      <!-- 篩選控制區 -->
      <div class="board-controls">
        <div class="filter-group">
          <button 
            type="button" 
            v-for="filter in filters"
            :key="filter.tag"
            :class="['tag-filter', { 'is-active': activeFilter === filter.tag }]"
            @click="setActiveFilter(filter.tag)"
          >
            {{ filter.label }}
          </button>
        </div>
        <div class="search-group">
          <input 
            type="search" 
            v-model="searchKeyword"
            placeholder="搜尋公告..." 
            aria-label="搜尋公告" 
            @input="handleSearch"
          />
        </div>
      </div>

      <!-- 公告列表 -->
      <div class="announcements-list">
        <div
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          :id="`announcement-${announcement.id}`"
          class="announcement-item card"
          :class="{ 'important-announcement': announcement.important }"
          :style="{ '--rand': getRandomRotation() }"
        >
          <div class="announcement-header">
            <h3 class="card-title">{{ announcement.title }}</h3>

            <div class="date-badge-container">
              <div v-if="announcement.important" class="important-badge">重要</div>
              <span class="announcement-date">{{ formatTimeAgo(announcement.postedAt) }}</span>
            </div>
          </div>

          <div class="announcement-content">
            <p class="announcement-description">{{ announcement.description }}</p>
            <div class="announcement-full-content">
              <p>{{ announcement.content }}</p>
            </div>
            
            <div class="announcement-tags">
              <span 
                v-for="tag in announcement.tags" 
                :key="tag" 
                class="tag"
                :class="{ 'tag-new': tag === 'New' }"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="announcement-reward" v-if="announcement.reward">
              <span class="reward-label">{{ announcement.reward }}</span>
            </div>
          </div>
        </div>

        <div v-if="filteredAnnouncements.length === 0" class="no-announcements">
          <p>告示板上暫時沒有符合條件的公告</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import announcementService from "../services/announcementService";

export default {
  name: "Board",
  data() {
    return {
      announcements: [],
      loading: true,
      
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
    };
  },
  
  computed: {
    // 篩選後的公告
    filteredAnnouncements() {
      let filtered = this.announcements;
      
      // 類別篩選
      if (this.activeFilter !== "all") {
        filtered = filtered.filter(announcement => 
          announcement.category === this.activeFilter || 
          announcement.tags.includes(this.activeFilter)
        );
      }
      
      // 關鍵字搜尋
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase().trim();
        filtered = filtered.filter(announcement => 
          announcement.title.toLowerCase().includes(keyword) ||
          announcement.description.toLowerCase().includes(keyword) ||
          announcement.content.toLowerCase().includes(keyword)
        );
      }
      
      return filtered;
    }
  },
  
  async mounted() {
    await this.fetchAnnouncements();
    
    // 檢查URL參數是否有特定公告ID
    const announcementId = this.$route.query.announcement;
    if (announcementId) {
      this.$nextTick(() => {
        const element = document.getElementById(`announcement-${announcementId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // 添加高亮效果
          element.classList.add('highlighted');
          setTimeout(() => {
            element.classList.remove('highlighted');
          }, 3000);
        }
      });
    }
  },
  
  methods: {
    async fetchAnnouncements() {
      try {
        // 直接從服務獲取布告欄數據
        this.announcements = await announcementService.getAnnouncements();
      } catch (error) {
        console.error("獲取公告失敗:", error);
        // 即使獲取失敗，也使用服務中的默認數據
        this.announcements = announcementService.defaultAnnouncements;
      } finally {
        this.loading = false;
      }
    },
    
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
    },
    
    // 搜尋關鍵字
    handleSearch() {
      // 搜尋邏輯在 computed 中實現
    }
  },
};
</script>