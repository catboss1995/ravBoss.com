<template>
  <div class="page-container">
    <h1 class="page-title">最新公告</h1>
    
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
        <div v-if="announcement.important" class="important-badge">
          重要
        </div>
      </div>
      
      <div v-if="announcements.length === 0" class="no-announcements">
        <p>目前沒有公告</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Announcements',
  data() {
    return {
      announcements: [],
      loading: true
    }
  },
  async mounted() {
    await this.fetchAnnouncements()
  },
  methods: {
    async fetchAnnouncements() {
      try {
        const response = await axios.get('/api/announcements')
        this.announcements = response.data
      } catch (error) {
        console.error('獲取公告失敗:', error)
        // 使用模擬資料
        this.announcements = [
          {
            id: 1,
            title: '網站正式上線！',
            content: '歡迎來到 RavBoss.com！我們的官方網站正式上線，提供更好的服務體驗。',
            date: new Date().toISOString(),
            important: true
          },
          {
            id: 2,
            title: '委託服務開始接受預約',
            content: '我們現在開始接受各種類型的委託服務預約，歡迎聯絡我們討論您的需求。',
            date: new Date(Date.now() - 86400000).toISOString(),
            important: false
          },
          {
            id: 3,
            title: '作品集更新',
            content: '作品集頁面已更新，新增了最新的創作作品，歡迎前往觀看。',
            date: new Date(Date.now() - 172800000).toISOString(),
            important: false
          }
        ]
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.announcement-item {
  position: relative;
  transition: transform 0.2s;
}

.announcement-item:hover {
  transform: translateY(-2px);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.announcement-date {
  color: #7f8c8d;
  font-size: 0.9rem;
  white-space: nowrap;
}

.announcement-content {
  line-height: 1.6;
  color: #2c3e50;
}

.important-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.no-announcements {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .announcement-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .important-badge {
    position: static;
    margin-top: 0.5rem;
    align-self: flex-start;
  }
}
</style>