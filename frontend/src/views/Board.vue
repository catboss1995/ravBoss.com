<style lang="scss" scoped>
@use "../styles/board.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">告示板 Notice Board</h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>

      <p>載入中...</p>
    </div>

    <div v-else class="announcements-list">
      <div
        v-for="announcement in announcements"
        :key="announcement.id"
        class="announcement-item card"
      >
        <div class="announcement-header">
          <h3 class="card-title">{{ announcement.title }}</h3>

          <span class="announcement-date">{{ formatDate(announcement.date) }}</span>
        </div>

        <div class="announcement-content">
          <p>{{ announcement.content }}</p>
        </div>

        <div v-if="announcement.important" class="important-badge">重要</div>
      </div>

      <div v-if="announcements.length === 0" class="no-announcements">
        <p>告示板上暫時沒有新消息</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Board",
  data() {
    return {
      announcements: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchAnnouncements();
  },
  methods: {
    async fetchAnnouncements() {
      try {
        const response = await axios.get("/api/announcements");
        this.announcements = response.data;
      } catch (error) {
        console.error("獲取公告失敗:", error);
        // 使用模擬資料
        this.announcements = [
          {
            id: 1,
            title: "冒險者檔案正式開放！",
            content: "歡迎來到我的冒險者檔案！這裡記錄著每一次創作冒險的精彩瞬間。",
            date: new Date().toISOString(),
            important: true,
          },
          {
            id: 2,
            title: "鐵匠鋪開始接受訂單",
            content: "鐵匠鋪現在開始接受各種道具鍛造訂單，歡迎前來委託你的專屬裝備。",
            date: new Date(Date.now() - 86400000).toISOString(),
            important: false,
          },
          {
            id: 3,
            title: "冒險相簿新增內容",
            content: "冒險相簿新增了最新的創作記錄，快來查看這些精彩的冒險故事吧！",
            date: new Date(Date.now() - 172800000).toISOString(),
            important: false,
          },
        ];
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
