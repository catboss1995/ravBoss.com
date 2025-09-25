<style lang="scss" scoped>
@use "../styles/news.scss" as *;
</style>

<template>
  <div class="news-container">
    <div class="hero-section">
      <h1 class="hero-title">冒險日誌 Adventure Journal</h1>
      <p class="hero-subtitle">記錄每一次精彩的冒險旅程</p>
    </div>

    <!-- 分類篩選 -->
    <div class="filter-section">
      <div class="filter-tabs">
        <button 
          @click="selectedCategory = ''" 
          :class="['filter-tab', { active: selectedCategory === '' }]"
        >
          全部
        </button>
        <button 
          @click="selectedCategory = 'adventure'" 
          :class="['filter-tab', { active: selectedCategory === 'adventure' }]"
        >
          冒險故事
        </button>
        <button 
          @click="selectedCategory = 'news'" 
          :class="['filter-tab', { active: selectedCategory === 'news' }]"
        >
          最新消息
        </button>
        <button 
          @click="selectedCategory = 'guide'" 
          :class="['filter-tab', { active: selectedCategory === 'guide' }]"
        >
          攻略指南
        </button>
      </div>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在召喚冒險日誌...</p>
    </div>

    <!-- 文章列表 -->
    <div v-else class="posts-section">
      <div v-if="filteredPosts.length === 0" class="no-posts">
        <div class="no-posts-icon">📜</div>
        <h3>暫無冒險記錄</h3>
        <p>這個分類還沒有任何冒險故事，敬請期待！</p>
      </div>

      <div v-else class="posts-grid">
        <article 
          v-for="post in paginatedPosts" 
          :key="post.id" 
          class="post-card"
          @click="openPost(post)"
        >
          <div class="post-header">
            <span class="post-category" :class="`category-${post.category}`">
              {{ getCategoryName(post.category) }}
            </span>
            <time class="post-date">{{ formatDate(post.createdAt) }}</time>
          </div>
          
          <h2 class="post-title">{{ post.title }}</h2>
          
          <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
          
          <div class="post-footer">
            <span class="post-author">{{ post.author || '冒險者' }}</span>
            <span class="read-more">閱讀更多 →</span>
          </div>
        </article>
      </div>

      <!-- 分頁控制 -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          ← 上一頁
        </button>
        
        <div class="pagination-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="['pagination-number', { active: currentPage === page }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          下一頁 →
        </button>
      </div>
    </div>

    <!-- 文章詳情彈窗 -->
    <div v-if="selectedPost" class="post-modal" @click.self="selectedPost = null">
      <div class="post-modal-content">
        <button @click="selectedPost = null" class="close-btn">×</button>
        
        <div class="modal-header">
          <span class="post-category" :class="`category-${selectedPost.category}`">
            {{ getCategoryName(selectedPost.category) }}
          </span>
          <time class="post-date">{{ formatDate(selectedPost.createdAt) }}</time>
        </div>
        
        <h1 class="modal-title">{{ selectedPost.title }}</h1>
        
        <div class="modal-content" v-html="formatContent(selectedPost.content)"></div>
        
        <div class="modal-footer">
          <span class="post-author">作者：{{ selectedPost.author || '冒險者' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'News',
  data() {
    return {
      posts: [],
      loading: false,
      selectedCategory: '',
      selectedPost: null,
      currentPage: 1,
      postsPerPage: 9
    }
  },
  computed: {
    filteredPosts() {
      if (!this.selectedCategory) {
        return this.posts
      }
      return this.posts.filter(post => post.category === this.selectedCategory)
    },
    
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },
    
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.filteredPosts.slice(start, end)
    },
    
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1
    }
  },
  async created() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await axios.get('/api/posts')
        this.posts = response.data.posts || response.data || []
      } catch (error) {
        console.error('載入文章失敗:', error)
        this.posts = []
      } finally {
        this.loading = false
      }
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
      const date = new Date(dateStr)
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    getExcerpt(content) {
      const text = content.replace(/<[^>]*>/g, '') // 移除 HTML 標籤
      return text.length > 120 ? text.substring(0, 120) + '...' : text
    },
    
    formatContent(content) {
      // 簡單的換行處理
      return content.replace(/\n/g, '<br>')
    },
    
    openPost(post) {
      this.selectedPost = post
      document.body.style.overflow = 'hidden'
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>