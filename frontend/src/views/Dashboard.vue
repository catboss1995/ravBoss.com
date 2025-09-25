<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1 class="dashboard-title">冒險者儀表板 Adventurer Dashboard</h1>
      <div class="user-info">
        <span>歡迎回來，{{ user?.username }}</span>
        <button @click="logout" class="btn btn-secondary">離開冒險</button>
      </div>
    </div>

    <!-- 管理功能 -->
    <div class="admin-section" v-if="user?.isAdmin">
      <h2>管理者工具 Admin Tools</h2>
      <div class="admin-cards">
        <div class="admin-card" @click="showNewPostForm = true">
          <h3>發布新冒險日誌</h3>
          <p>分享最新的冒險故事</p>
        </div>
        <div class="admin-card">
          <h3>管理作品集</h3>
          <p>編輯冒險相簿</p>
        </div>
        <div class="admin-card">
          <h3>更新告示板</h3>
          <p>發布重要公告</p>
        </div>
      </div>
    </div>

    <!-- 新增文章表單 -->
    <div v-if="showNewPostForm" class="post-form-overlay" @click.self="showNewPostForm = false">
      <div class="post-form-card">
        <h3>撰寫新冒險日誌</h3>
        <form @submit.prevent="createPost">
          <div class="form-group">
            <label>標題</label>
            <input v-model="newPost.title" type="text" class="form-input" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="newPost.category" class="form-input">
              <option value="adventure">冒險故事</option>
              <option value="news">最新消息</option>
              <option value="guide">攻略指南</option>
            </select>
          </div>
          <div class="form-group">
            <label>內容</label>
            <textarea v-model="newPost.content" class="form-textarea" rows="10" required></textarea>
          </div>
          <div class="form-actions">
            <button type="button" @click="showNewPostForm = false" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? '發布中...' : '發布文章' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="posts-section">
      <div class="section-header">
        <h2>冒險日誌 Adventure Posts</h2>
        <div class="filter-controls">
          <select v-model="selectedCategory" @change="fetchPosts" class="filter-select">
            <option value="">所有分類</option>
            <option value="adventure">冒險故事</option>
            <option value="news">最新消息</option>
            <option value="guide">攻略指南</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading">載入中...</div>

      <div v-else-if="posts.length === 0" class="no-posts">
        還沒有冒險日誌，開始你的第一次冒險吧！
      </div>

      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <h3 class="post-title">{{ post.title }}</h3>
          <div class="post-meta">
            <span class="post-category">{{ getCategoryName(post.category) }}</span>
            <span class="post-date">{{ formatDate(post.createdAt) }}</span>
          </div>
          <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
          <div class="post-actions" v-if="user?.isAdmin">
            <button @click="editPost(post)" class="btn btn-sm btn-secondary">編輯</button>
            <button @click="deletePost(post.id)" class="btn btn-sm btn-danger">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      posts: [],
      loading: false,
      selectedCategory: '',
      showNewPostForm: false,
      isSubmitting: false,
      newPost: {
        title: '',
        content: '',
        category: 'adventure'
      }
    }
  },
  async created() {
    this.loadUser()
    await this.fetchPosts()
  },
  methods: {
    loadUser() {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        this.user = JSON.parse(userStr)
      }
    },
    
    async fetchPosts() {
      this.loading = true
      try {
        const params = {}
        if (this.selectedCategory) {
          params.category = this.selectedCategory
        }
        
        const response = await axios.get('/api/posts', { 
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        this.posts = response.data.posts || response.data
      } catch (error) {
        console.error('載入文章失敗:', error)
      } finally {
        this.loading = false
      }
    },
    
    async createPost() {
      this.isSubmitting = true
      try {
        await axios.post('/api/posts', this.newPost, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        this.showNewPostForm = false
        this.newPost = { title: '', content: '', category: 'adventure' }
        await this.fetchPosts()
        
      } catch (error) {
        console.error('發布文章失敗:', error)
        alert('發布失敗，請稍後再試')
      } finally {
        this.isSubmitting = false
      }
    },
    
    async deletePost(postId) {
      if (!confirm('確定要刪除這篇冒險日誌嗎？')) return
      
      try {
        await axios.delete(`/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        await this.fetchPosts()
      } catch (error) {
        console.error('刪除文章失敗:', error)
        alert('刪除失敗，請稍後再試')
      }
    },
    
    editPost(post) {
      // 實現編輯功能
      console.log('編輯文章:', post)
    },
    
    getCategoryName(category) {
      const categories = {
        adventure: '冒險故事',
        news: '最新消息',
        guide: '攻略指南'
      }
      return categories[category] || category
    },
    
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('zh-TW')
    },
    
    getExcerpt(content) {
      return content.length > 100 ? content.substring(0, 100) + '...' : content
    },
    
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
}

.dashboard-title {
  margin: 0;
  color: #2c3e50;
}

.user-info {
  display: flex;
  align-items: center;

  gap: 1rem;
}

.admin-section {
  margin-bottom: 3rem;
}

.admin-cards {
  display: grid;
  margin-top: 1rem;

  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.admin-card {
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  border-radius: 12px;
  transition: transform .3s, box-shadow .3s;
  cursor: pointer;
}

.admin-card:hover {
  box-shadow: 0 8px 15px rgba(0,0,0,.15);
  transform: translateY(-2px);
}

.post-form-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.5);
}

.post-form-card {
  overflow-y: auto;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  padding: 2rem;
  background: white;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: .5rem;
  color: #2c3e50;
  font-weight: bold;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: .75rem;
  font-size: 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;

  gap: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-select {
  padding: .5rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
}

.posts-grid {
  display: grid;

  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.post-card {
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  border-radius: 12px;
}

.post-title {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.post-meta {
  display: flex;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: .9rem;

  gap: 1rem;
}

.post-category {
  padding: .25rem .5rem;
  color: white;
  background: #3498db;
  border-radius: 4px;
}

.post-excerpt {
  margin-bottom: 1rem;
  color: #34495e;
  line-height: 1.6;
}

.post-actions {
  display: flex;

  gap: .5rem;
}

.loading,
.no-posts {
  padding: 3rem;
  color: #7f8c8d;
  text-align: center;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;

    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;

    gap: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>