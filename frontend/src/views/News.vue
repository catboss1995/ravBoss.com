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
      <!-- 精選文章 -->
      <div v-if="featuredPost && selectedCategory === ''" class="featured-post" @click="openPost(featuredPost)">
        <img :src="featuredPost.image" alt="精選文章封面" class="featured-image">
        <div class="featured-content">
          <span class="post-category" :class="`category-${featuredPost.category}`">
            {{ getCategoryName(featuredPost.category) }}
          </span>
          <h2 class="featured-title">{{ featuredPost.title }}</h2>
          <p class="featured-excerpt">{{ getExcerpt(featuredPost.content) }}</p>
          <div class="post-meta">
            <img :src="featuredPost.authorAvatar" alt="作者頭像" class="author-avatar">
            <span>{{ featuredPost.author || '冒險者' }}</span>
            <span style="margin: 0 10px;">•</span>
            <time>{{ formatDate(featuredPost.createdAt) }}</time>
          </div>
        </div>
      </div>

      <h2 v-if="selectedCategory === ''" class="blog-section-title">最新文章</h2>
      <h2 v-else class="blog-section-title">{{ getCategoryName(selectedCategory) }}</h2>

      <div v-if="filteredPosts.length === 0" class="no-posts">
        <div class="no-posts-icon">
          <GiScrollUnfurled />
        </div>
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
          <img :src="post.image" alt="文章封面" class="post-image">
          
          <div class="post-header">
            <span class="post-category" :class="`category-${post.category}`">
              {{ getCategoryName(post.category) }}
            </span>
            <time class="post-date">{{ formatDate(post.createdAt) }}</time>
          </div>
          
          <h2 class="post-title">{{ post.title }}</h2>
          
          <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
          
          <div class="tag-list" v-if="post.tags && post.tags.length">
            <span v-for="(tag, index) in post.tags.slice(0, 2)" :key="index" class="tag">
              #{{ tag }}
            </span>
          </div>
          
          <div class="post-footer">
            <div class="post-meta">
              <img :src="post.authorAvatar" alt="作者頭像" class="author-avatar">
              <span>{{ post.author || '冒險者' }}</span>
            </div>
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
    <div v-if="selectedPost" class="post-modal" @click.self="closePost">
      <div class="post-modal-content">
        <button @click="closePost" class="close-btn">×</button>
        
        <img :src="selectedPost.image" alt="文章封面" class="modal-image">
        
        <div class="modal-header">
          <span class="post-category" :class="`category-${selectedPost.category}`">
            {{ getCategoryName(selectedPost.category) }}
          </span>
          <time class="post-date">{{ formatDate(selectedPost.createdAt) }}</time>
        </div>
        
        <h1 class="modal-title">{{ selectedPost.title }}</h1>
        
        <div class="post-meta" style="padding: 0 2rem;">
          <img :src="selectedPost.authorAvatar" alt="作者頭像" class="author-avatar">
          <span>{{ selectedPost.author || '冒險者' }}</span>
          <span style="margin: 0 10px;">•</span>
          <span>瀏覽 {{ selectedPost.views || 0 }}</span>
        </div>
        
        <div class="tag-list" style="padding: 0 2rem;" v-if="selectedPost.tags && selectedPost.tags.length">
          <span v-for="(tag, index) in selectedPost.tags" :key="index" class="tag">
            #{{ tag }}
          </span>
        </div>
        
        <div class="modal-content" v-html="formatContent(selectedPost.content)"></div>
        
        <div class="modal-footer">
          <span class="post-author">作者：{{ selectedPost.author || '冒險者' }}</span>
        </div>
        
        <div class="related-posts" v-if="relatedPosts.length">
          <h3 class="related-title">相關文章</h3>
          <div class="related-list">
            <div 
              v-for="post in relatedPosts" 
              :key="post.id"
              class="related-item"
              @click.stop="openPost(post)"
            >
              <h4 class="related-item-title">{{ post.title }}</h4>
              <time class="post-date">{{ formatDate(post.createdAt) }}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GiScrollUnfurled } from 'react-icons/gi'

export default {
  components: {
    GiScrollUnfurled
  },
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
        return this.posts.filter(post => post.id !== (this.featuredPost?.id || -1))
      }
      return this.posts.filter(post => post.category === this.selectedCategory)
    },
    
    featuredPost() {
      return this.posts.find(post => post.featured)
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
    },
    
    relatedPosts() {
      if (!this.selectedPost) return []
      
      return this.posts
        .filter(post => 
          post.id !== this.selectedPost.id && 
          (post.category === this.selectedPost.category || 
           (post.tags && this.selectedPost.tags && 
            post.tags.some(tag => this.selectedPost.tags.includes(tag))))
        )
        .slice(0, 3)
    }
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1
    },
    selectedPost(newVal) {
      if (!newVal) {
        document.body.style.overflow = 'auto'
      }
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
        let posts = response.data.posts || response.data || []
        this.posts = this.enhancePostsWithImages(posts)
      } catch (error) {
        console.error('載入文章失敗:', error)
        // 使用豐富的模擬新聞資料
        const mockPosts = [
          {
            id: 1,
            title: '新作品《森林中的萊菲》發布！',
            content: '經過數週的精心創作，全新場景插畫作品《森林中的萊菲》正式與大家見面！\n\n這幅作品描繪了萊菲在神秘森林中與小動物們互動的溫馨場景。使用了大量的綠色調和暖光效果，營造出夢幻而寧靜的氛圍。\n\n創作過程中使用了Photoshop和Procreate兩種工具，從概念草圖到最終完稿歷時約3週時間。特別感謝所有在創作過程中給予建議和支持的朋友們！',
            category: 'news',
            createdAt: '2024-05-15T10:00:00Z',
            author: 'RavBoss',
            tags: ['新作品', '場景插畫', '萊菲'],
            featured: true,
            views: 1250
          },
          {
            id: 2,
            title: '2024年委託服務升級公告',
            content: '親愛的冒險者們，感謝大家對我們委託服務的支持！\n\n從2024年6月1日開始，我們將推出全新的委託服務方案：\n\n• 快速委託：3-5個工作天完成\n• 標準委託：1-2週完成\n• 精品委託：2-4週完成\n\n每個方案都包含不同的服務內容和價格選項。同時我們也新增了修改次數說明和更詳細的報價系統。\n\n如有任何問題，歡迎隨時聯絡我們！',
            category: 'news',
            createdAt: '2024-05-10T14:30:00Z',
            author: 'RavBoss',
            tags: ['委託服務', '升級', '公告'],
            featured: false,
            views: 890
          },
          {
            id: 3,
            title: '角色設計攻略：如何創造獨特的奇幻角色',
            content: '在奇幻世界中，角色設計是最重要的元素之一。今天來分享一些角色設計的心得和技巧：\n\n1. 確定角色的背景故事\n首先要為角色建立完整的背景故事，包括出身、性格、目標等。這些會直接影響角色的外觀設計。\n\n2. 選擇適合的配色方案\n不同的顏色會傳達不同的情感和性格特質。暖色調通常表現友善，冷色調則較神秘。\n\n3. 注意比例和姿態\n角色的身體比例和姿態會影響觀者對角色的第一印象。\n\n4. 添加獨特的細節\n一些小細節往往能讓角色更加memorable，比如特殊的配件、疤痕或標記。\n\n希望這些技巧對大家的創作有所幫助！',
            category: 'guide',
            createdAt: '2024-05-08T09:15:00Z',
            author: 'RavBoss',
            tags: ['角色設計', '攻略', '奇幻'],
            featured: true,
            views: 2100
          },
          {
            id: 4,
            title: '冒險者日記：城市一角的創作歷程',
            content: '今天想和大家分享《城市一角》這幅作品的創作過程。\n\n最初的靈感來自某個深夜，我路過一個小巷子時看到的溫馨場景。兩個朋友在昏黃的路燈下聊天，那種安靜而溫暖的氛圍深深打動了我。\n\n回到家後我立刻開始sketching，想要捕捉那種感覺。經過了好幾次的構圖調整，最終決定以咖鹿和羊作為主角。\n\n配色上選擇了偏暖的色調，特別是燈光的部分使用了橙黃色，希望能營造出那種溫馨的夜晚氛圍。\n\n背景的城市建築也花了不少時間，每一扇窗戶、每一個細節都希望能為整個場景加分。\n\n最終完成時真的很有成就感，希望大家也能感受到這幅畫想傳達的溫暖！',
            category: 'adventure',
            createdAt: '2024-05-05T20:45:00Z',
            author: 'RavBoss',
            tags: ['創作歷程', '城市', '夜景'],
            featured: false,
            views: 756
          },
          {
            id: 5,
            title: '商店新品上架通知',
            content: '好消息！我們的商店又有新商品上架啦！\n\n本次新增商品包括：\n• 龍族戰士限量公仔\n• 魔法陣滑鼠墊\n• 寶石收藏箱\n• 冒險地圖海報\n\n每件商品都是精心挑選和設計的，數量有限售完為止。特別是龍族戰士公仔，這次只有3隻，喜歡的朋友要趕快下單哦！\n\n另外，購買任意商品滿500元還可以獲得免費的森林精靈貼紙包一份！\n\n感謝大家的支持，我們會繼續努力帶來更多精美的商品！',
            category: 'news',
            createdAt: '2024-05-03T16:20:00Z',
            author: 'RavBoss',
            tags: ['商店', '新品', '限量'],
            featured: false,
            views: 634
          },
          {
            id: 6,
            title: '繪畫工具推薦：我的數位繪圖設備分享',
            content: '很多朋友問我平時都用什麼工具繪圖，今天就來詳細分享一下我的設備和軟體選擇：\n\n硬體設備：\n• iPad Pro 12.9吋 + Apple Pencil 2代\n• Wacom Intuos Pro 繪圖板\n• 主要電腦：MacBook Pro 16吋\n\n軟體工具：\n• Photoshop（主要用於完稿和後製）\n• Procreate（iPad上的主力軟體）\n• Clip Studio Paint（漫畫和插畫）\n• Blender（3D建模輔助）\n\n每種工具都有其特色和適用場景。Procreate特別適合外出時創作，Photoshop則是完稿的不二選擇。\n\n重要的是，好的工具能幫助創作，但最重要的還是多練習和保持創作熱忱！\n\n如果大家有其他推薦的工具也歡迎留言分享！',
            category: 'guide',
            createdAt: '2024-04-30T11:30:00Z',
            author: 'RavBoss',
            tags: ['工具推薦', '數位繪圖', '設備'],
            featured: true,
            views: 1890
          }
        ]
        this.posts = this.enhancePostsWithImages(mockPosts)
      } finally {
        this.loading = false
      }
    },
    
    enhancePostsWithImages(posts) {
      const images = [
        'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ]
      
      const avatars = [
        'https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&w=100',
        'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=100',
        'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100'
      ]
      
      return posts.map((post, index) => ({
        ...post,
        image: images[index % images.length],
        authorAvatar: avatars[index % avatars.length],
        content: this.enhanceContent(post.content)
      }))
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
      // 更豐富的內容格式化
      let formatted = content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
      
      // 包裝在段落標籤中
      formatted = `<p>${formatted}</p>`
      
      // 修正可能的重複段落標籤
      return formatted.replace(/<\/p><p><\/p><p>/g, '</p><p>')
    },
    
    enhanceContent(content) {
      // 在內容中添加一些格式標記，使其更豐富
      return content
        .replace(/^(.*?)：/gm, '<strong>$1：</strong>')
        .replace(/^(\d+\. .*?)$/gm, '<strong>$1</strong>')
        .replace(/•(.*?)$/gm, '<li>$1</li>')
    },
    
    openPost(post) {
      this.selectedPost = post
      document.body.style.overflow = 'hidden'
      
      // 增加瀏覽次數
      if (this.selectedPost.views) {
        this.selectedPost.views += 1
      } else {
        this.selectedPost.views = 1
      }
    },
    
    closePost() {
      this.selectedPost = null
      document.body.style.overflow = 'auto'
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>