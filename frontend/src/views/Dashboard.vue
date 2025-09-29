<template>
  <div class="dashboard">
    <!-- 頁面標題 -->
    <div class="dashboard-header">
      <h1>管理儀表板</h1>
      <div class="user-area">
        <span>歡迎，{{ user?.displayName || user?.username }}</span>
        <button @click="logout" class="btn btn-logout">登出</button>
      </div>
    </div>

    <!-- 統計卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>作品總數</h3>
        <div class="stat-number">{{ portfolioList.length }}</div>
      </div>
      <div class="stat-card">
        <h3>新聞文章</h3>
        <div class="stat-number">{{ newsList.length }}</div>
      </div>
      <div class="stat-card">
        <h3>商店商品</h3>
        <div class="stat-number">{{ storeList.length }}</div>
      </div>
      <div class="stat-card">
        <h3>委託申請</h3>
        <div class="stat-number">{{ commissionList.length }}</div>
      </div>
    </div>

    <!-- 功能選單 -->
    <div class="management-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
      >
        {{ tab.name }}
      </button>
      <button @click="resetAllData" class="btn btn-reset">重置數據</button>
    </div>

    <!-- 載入中顯示 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在載入數據...</p>
    </div>

    <!-- 內容管理區域 -->
    <div v-else class="content-area">
      <!-- 作品集管理 -->
      <div v-if="activeTab === 'portfolio'" class="tab-content">
        <div class="section-header">
          <h2>作品集管理</h2>
          <button @click="showAddPortfolioModal = true" class="btn btn-primary">+ 新增作品</button>
        </div>
        
        <div class="data-table">
          <div class="table-header">
            <div>預覽</div>
            <div>標題</div>
            <div>分類</div>
            <div>標籤</div>
            <div>建立日期</div>
            <div>操作</div>
          </div>
          <div v-for="item in portfolioList" :key="item.id" class="table-row">
            <div class="preview-cell">
              <img :src="item.image" class="preview-img" :alt="item.title">
            </div>
            <div>{{ item.title }}</div>
            <div>{{ item.category }}</div>
            <div>{{ (item.tags || []).join(', ') }}</div>
            <div>{{ formatDate(item.createdAt) }}</div>
            <div class="actions">
              <button @click="editPortfolio(item)" class="btn-sm btn-edit">編輯</button>
              <button @click="deletePortfolio(item.id)" class="btn-sm btn-delete">刪除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 新聞管理 -->
      <div v-if="activeTab === 'news'" class="tab-content">
        <div class="section-header">
          <h2>新聞管理</h2>
          <button @click="showAddNewsModal = true" class="btn btn-primary">+ 發布新聞</button>
        </div>
        
        <div class="data-table">
          <div class="table-header">
            <div>標題</div>
            <div>分類</div>
            <div>觀看次數</div>
            <div>發布日期</div>
            <div>操作</div>
          </div>
          <div v-for="item in newsList" :key="item.id" class="table-row news-row">
            <div>{{ item.title }}</div>
            <div>{{ getCategoryName(item.category) }}</div>
            <div>{{ item.views || 0 }} 次</div>
            <div>{{ formatDate(item.createdAt) }}</div>
            <div class="actions">
              <button @click="editNews(item)" class="btn-sm btn-edit">編輯</button>
              <button @click="deleteNews(item.id)" class="btn-sm btn-delete">刪除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 商店管理 -->
      <div v-if="activeTab === 'store'" class="tab-content">
        <div class="section-header">
          <h2>商店管理</h2>
          <button @click="showAddProductModal = true" class="btn btn-primary">+ 新增商品</button>
        </div>
        
        <div class="data-table">
          <div class="table-header">
            <div>預覽</div>
            <div>商品名稱</div>
            <div>分類</div>
            <div>價格</div>
            <div>庫存</div>
            <div>操作</div>
          </div>
          <div v-for="item in storeList" :key="item.id" class="table-row">
            <div class="preview-cell">
              <img :src="item.image" class="preview-img" :alt="item.name">
            </div>
            <div>{{ item.name }}</div>
            <div>{{ item.category }}</div>
            <div>NT$ {{ item.price }}</div>
            <div>{{ item.stock || 0 }}</div>
            <div class="actions">
              <button @click="editProduct(item)" class="btn-sm btn-edit">編輯</button>
              <button @click="deleteProduct(item.id)" class="btn-sm btn-delete">刪除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 委託管理 -->
      <div v-if="activeTab === 'commission'" class="tab-content">
        <div class="section-header">
          <h2>委託管理</h2>
        </div>
        
        <div class="data-table">
          <div class="table-header commission-header">
            <div>客戶姓名</div>
            <div>委託類型</div>
            <div>預算</div>
            <div>狀態</div>
            <div>提交日期</div>
            <div>操作</div>
          </div>
          <div v-for="item in commissionList" :key="item.id" class="table-row commission-row">
            <div>{{ item.name }}</div>
            <div>{{ item.type }}</div>
            <div>{{ item.budget }}</div>
            <div>
              <span :class="['status-badge', getStatusClass(item.status)]">
                {{ getStatusText(item.status) }}
              </span>
            </div>
            <div>{{ formatDate(item.createdAt) }}</div>
            <div class="actions">
              <button @click="viewCommissionDetail(item)" class="btn-sm btn-info">查看</button>
              <button @click="openCommissionModal(item)" class="btn-sm btn-warning">更新</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增作品 Modal -->
    <div v-if="showAddPortfolioModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>新增作品</h3>
          <button @click="closeModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="addPortfolio">
          <div class="form-group">
            <label>標題</label>
            <input v-model="newPortfolio.title" type="text" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="newPortfolio.category">
              <option>場景插畫</option>
              <option>人物插畫</option>
              <option>手繪</option>
              <option>隨筆/塗鴉/梗圖</option>
            </select>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="newPortfolio.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>圖片URL</label>
            <input v-model="newPortfolio.image" type="text" placeholder="輸入圖片URL">
          </div>
          <div class="form-group">
            <label>標籤 (用逗號分隔)</label>
            <input v-model="newPortfolio.tagsInput" type="text" placeholder="例如：奇幻,森林,角色設計">
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">新增</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 新增新聞 Modal -->
    <div v-if="showAddNewsModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>發布新聞</h3>
          <button @click="closeModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="addNews">
          <div class="form-group">
            <label>標題</label>
            <input v-model="newNews.title" type="text" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="newNews.category">
              <option value="news">最新消息</option>
              <option value="adventure">冒險故事</option>
              <option value="guide">攻略指南</option>
            </select>
          </div>
          <div class="form-group">
            <label>內容</label>
            <textarea v-model="newNews.content" rows="6" required></textarea>
          </div>
          <div class="form-group">
            <label>標籤 (用逗號分隔)</label>
            <input v-model="newNews.tagsInput" type="text" placeholder="例如：新作品,插畫,奇幻">
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">發布</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 新增商品 Modal -->
    <div v-if="showAddProductModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>新增商品</h3>
          <button @click="closeModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label>商品名稱</label>
            <input v-model="newProduct.name" type="text" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="newProduct.category">
              <option>魔法道具</option>
              <option>冒險裝備</option>
              <option>珍藏物品</option>
            </select>
          </div>
          <div class="form-group">
            <label>價格</label>
            <input v-model="newProduct.price" type="number" required>
          </div>
          <div class="form-group">
            <label>庫存</label>
            <input v-model="newProduct.stock" type="number" required>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="newProduct.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>商品圖片URL</label>
            <input v-model="newProduct.image" type="text" placeholder="輸入圖片URL">
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">新增</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 委託詳情 Modal -->
    <div v-if="showCommissionModal" class="modal-overlay" @click="showCommissionModal = false">
      <div class="modal-content commission-modal" @click.stop>
        <div class="modal-header">
          <h3>委託詳情</h3>
          <button @click="showCommissionModal = false" class="modal-close">×</button>
        </div>
        <div v-if="selectedCommission" class="commission-details">
          <div class="detail-row">
            <label>客戶姓名：</label>
            <span>{{ selectedCommission.name }}</span>
          </div>
          <div class="detail-row">
            <label>聯絡郵箱：</label>
            <span>{{ selectedCommission.email || '未提供' }}</span>
          </div>
          <div class="detail-row">
            <label>項目類型：</label>
            <span>{{ selectedCommission.type }}</span>
          </div>
          <div class="detail-row">
            <label>預算範圍：</label>
            <span>{{ selectedCommission.budget }}</span>
          </div>
          <div class="detail-row">
            <label>期望完成時間：</label>
            <span>{{ selectedCommission.deadline || '未指定' }}</span>
          </div>
          <div class="detail-row">
            <label>項目描述：</label>
            <div class="description-content">{{ selectedCommission.description || '無描述' }}</div>
          </div>
          <div class="detail-row">
            <label>當前狀態：</label>
            <span :class="['status-badge', getStatusClass(selectedCommission.status)]">
              {{ getStatusText(selectedCommission.status) }}
            </span>
          </div>
          <div class="detail-row">
            <label>提交時間：</label>
            <span>{{ formatDate(selectedCommission.createdAt) }}</span>
          </div>
        </div>
        <div class="modal-actions">
          <select v-model="newStatus" class="status-select">
            <option value="pending">待處理</option>
            <option value="approved">已接受</option>
            <option value="in-progress">進行中</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
          <button @click="updateCommissionStatus" class="btn btn-primary">更新狀態</button>
        </div>
      </div>
    </div>

    <!-- 編輯作品 Modal -->
    <div v-if="showEditPortfolioModal && selectedPortfolio" class="modal-overlay" @click="closeEditModals">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h3>編輯作品</h3>
          <button @click="closeEditModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="savePortfolioEdit" class="edit-form">
          <div class="form-columns">
            <div class="form-column">
              <div class="form-group">
                <label>標題</label>
                <input v-model="editPortfolioData.title" type="text" required>
              </div>
              <div class="form-group">
                <label>分類</label>
                <select v-model="editPortfolioData.category">
                  <option>場景插畫</option>
                  <option>人物插畫</option>
                  <option>手繪</option>
                  <option>隨筆/塗鴉/梗圖</option>
                </select>
              </div>
              <div class="form-group">
                <label>創建日期</label>
                <input v-model="editPortfolioData.createdAtDate" type="date">
              </div>
              <div class="form-group">
                <label>描述</label>
                <textarea v-model="editPortfolioData.description" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label>主圖片URL</label>
                <input v-model="editPortfolioData.image" type="text">
                <div class="image-preview" v-if="editPortfolioData.image">
                  <img :src="editPortfolioData.image" alt="作品預覽">
                </div>
              </div>
            </div>
            <div class="form-column">
              <div class="form-group">
                <label>標籤 (用逗號分隔)</label>
                <input v-model="editPortfolioData.tagsInput" type="text">
              </div>
              <div class="form-group">
                <label>軟體 (用逗號分隔)</label>
                <input v-model="editPortfolioData.softwareInput" type="text">
              </div>
              <div class="form-group">
                <label>尺寸</label>
                <input v-model="editPortfolioData.dimensions" type="text">
              </div>
              <div class="form-group">
                <label>是否精選</label>
                <div class="checkbox-wrapper">
                  <input v-model="editPortfolioData.featured" type="checkbox" id="featured">
                  <label for="featured" class="checkbox-label">設為精選作品</label>
                </div>
              </div>
              <div class="form-group">
                <label>YouTube影片ID</label>
                <input v-model="editPortfolioData.youtubeId" type="text" placeholder="例如：dQw4w9WgXcQ">
                <small class="form-hint">只需輸入YouTube影片ID，不需要完整URL</small>
                <div class="youtube-preview" v-if="editPortfolioData.youtubeId">
                  <iframe 
                    :src="`https://www.youtube.com/embed/${editPortfolioData.youtubeId}`" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 相關圖片區域 -->
          <div class="form-section">
            <h4>相關圖片</h4>
            <div class="gallery-container">
              <div v-for="(image, index) in editPortfolioData.gallery" :key="index" class="gallery-item">
                <img :src="image" :alt="`圖片 ${index + 1}`" class="gallery-image">
                <button type="button" @click="removeGalleryImage(index)" class="gallery-delete-btn">×</button>
              </div>
              <div class="gallery-add">
                <input v-model="newGalleryImage" type="text" placeholder="輸入圖片URL">
                <button type="button" @click="addGalleryImage" class="btn-sm btn-primary">添加圖片</button>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeEditModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              {{ isLoading ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 編輯新聞 Modal -->
    <div v-if="showEditNewsModal && selectedNews" class="modal-overlay" @click="closeEditModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>編輯新聞</h3>
          <button @click="closeEditModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="saveNewsEdit">
          <div class="form-group">
            <label>標題</label>
            <input v-model="editNewsData.title" type="text" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="editNewsData.category">
              <option value="news">最新消息</option>
              <option value="adventure">冒險故事</option>
              <option value="guide">攻略指南</option>
            </select>
          </div>
          <div class="form-group">
            <label>內容</label>
            <textarea v-model="editNewsData.content" rows="6" required></textarea>
          </div>
          <div class="form-group">
            <label>標籤 (用逗號分隔)</label>
            <input v-model="editNewsData.tagsInput" type="text">
          </div>
          <div class="form-actions">
            <button type="button" @click="closeEditModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 編輯商品 Modal -->
    <div v-if="showEditProductModal && selectedProduct" class="modal-overlay" @click="closeEditModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>編輯商品</h3>
          <button @click="closeEditModals" class="modal-close">×</button>
        </div>
        <form @submit.prevent="saveProductEdit">
          <div class="form-group">
            <label>商品名稱</label>
            <input v-model="editProductData.name" type="text" required>
          </div>
          <div class="form-group">
            <label>分類</label>
            <select v-model="editProductData.category">
              <option>魔法道具</option>
              <option>冒險裝備</option>
              <option>珍藏物品</option>
            </select>
          </div>
          <div class="form-group">
            <label>價格</label>
            <input v-model="editProductData.price" type="number" required>
          </div>
          <div class="form-group">
            <label>庫存</label>
            <input v-model="editProductData.stock" type="number" required>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="editProductData.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>商品圖片URL</label>
            <input v-model="editProductData.image" type="text">
          </div>
          <div class="form-actions">
            <button type="button" @click="closeEditModals" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入數據服務
import dataService from "../services/dataService";

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      activeTab: 'portfolio',
      
      // 資料列表
      portfolioList: [],
      newsList: [],
      storeList: [],
      commissionList: [],
      
      // Modal 控制
      showAddPortfolioModal: false,
      showAddNewsModal: false,
      showAddProductModal: false,
      showCommissionModal: false,
      
      // 編輯 Modal 控制
      showEditPortfolioModal: false,
      showEditNewsModal: false,
      showEditProductModal: false,
      
      // 選中的項目
      selectedCommission: null,
      selectedPortfolio: null,
      selectedNews: null,
      selectedProduct: null,
      
      // 編輯數據
      editPortfolioData: {
        gallery: []
      },
      editNewsData: {},
      editProductData: {},
      
      // 委託狀態
      newStatus: 'pending',
      
      // 新增表單資料
      newPortfolio: {
        title: '',
        category: '場景插畫',
        description: '',
        image: '',
        tagsInput: ''
      },
      newNews: {
        title: '',
        category: 'news',
        content: '',
        tagsInput: ''
      },
      newProduct: {
        name: '',
        category: '魔法道具',
        price: 0,
        stock: 1,
        description: '',
        image: ''
      },
      
      // 選單
      tabs: [
        { id: 'portfolio', name: '作品管理' },
        { id: 'news', name: '新聞管理' },
        { id: 'store', name: '商店管理' },
        { id: 'commission', name: '委託管理' }
      ],
      
      // 載入狀態
      isLoading: false,
      error: null,

      // 相關圖片處理
      newGalleryImage: '',
    }
  },
  
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  
  created() {
    this.loadUser();
    this.loadAllData();
  },
  
  methods: {
    // 鍵盤快捷鍵處理
    handleKeydown(event) {
      // ESC 關閉 Modal
      if (event.key === 'Escape') {
        if (this.showEditPortfolioModal) {
          this.closeEditModals();
        } else if (this.showAddPortfolioModal || this.showAddNewsModal || this.showAddProductModal) {
          this.closeModals();
        } else if (this.showCommissionModal) {
          this.showCommissionModal = false;
        }
      }
      
      // Ctrl+S 保存
      if (event.ctrlKey && event.key === 's' && this.showEditPortfolioModal) {
        event.preventDefault();
        this.savePortfolioEdit();
      }
    },

    // 表單驗證
    validatePortfolioForm() {
      const errors = {};
      
      if (!this.editPortfolioData.title?.trim()) {
        errors.title = '標題不能為空';
      }
      
      if (this.editPortfolioData.image && !this.isValidUrl(this.editPortfolioData.image)) {
        errors.image = '請輸入有效的圖片URL';
      }
      
      if (this.editPortfolioData.youtubeId && !this.isValidYouTubeId(this.editPortfolioData.youtubeId)) {
        errors.youtubeId = '請輸入有效的YouTube影片ID';
      }
      
      return errors;
    },

    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },

    isValidYouTubeId(id) {
      return /^[a-zA-Z0-9_-]{11}$/.test(id);
    },

    loadUser() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.$router.push('/login');
      }
    },
    
    loadAllData() {
      this.isLoading = true;
      
      try {
        // 從數據服務加載數據
        this.portfolioList = dataService.getPortfolio();
        this.newsList = dataService.getNews();
        this.storeList = dataService.getStore();
        this.commissionList = dataService.getCommission();
      } catch (error) {
        console.error('加載數據失敗:', error);
        this.error = '加載數據失敗，請稍後再試';
      } finally {
        this.isLoading = false;
      }
    },
    
    // 重置所有數據
    resetAllData() {
      if (confirm('確定要重置所有數據嗎？這將恢復到預設數據。')) {
        dataService.resetData();
        this.loadAllData();
        alert('所有數據已重置！');
      }
    },
    
    // 作品管理
    addPortfolio() {
      if (!this.newPortfolio.title.trim()) return;
      
      this.isLoading = true;
      
      try {
        const newPortfolio = {
          title: this.newPortfolio.title,
          category: this.newPortfolio.category,
          description: this.newPortfolio.description,
          image: this.newPortfolio.image || '/assets/sketch.webp',
          tags: this.newPortfolio.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        const createdPortfolio = dataService.addPortfolio(newPortfolio);
        this.portfolioList.unshift(createdPortfolio);
        this.closeModals();
        this.resetPortfolioForm();
        alert('作品已新增！');
      } catch (error) {
        console.error('新增作品失敗:', error);
        alert('新增作品失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    editPortfolio(item) {
      this.selectedPortfolio = item;
      
      // 格式化日期為YYYY-MM-DD格式，用於日期輸入框
      const createdDate = item.createdAt ? new Date(item.createdAt) : new Date();
      const formattedDate = createdDate.toISOString().split('T')[0];
      
      this.editPortfolioData = {
        title: item.title,
        category: item.category,
        description: item.description,
        image: item.image,
        tagsInput: (item.tags || []).join(', '),
        softwareInput: (item.software || []).join(', '),
        dimensions: item.dimensions || '',
        createdAtDate: formattedDate,
        gallery: item.gallery || [],
        youtube: item.youtube || '',
        featured: item.featured || false
      };
      
      this.showEditPortfolioModal = true;
    },

    async savePortfolioEdit() {
      // 表單驗證
      const errors = this.validatePortfolioForm();
      if (Object.keys(errors).length > 0) {
        alert('請檢查表單內容：' + Object.values(errors).join(', '));
        return;
      }
      
      if (!this.editPortfolioData.title.trim()) return;
      
      this.isLoading = true;
      
      try {
        // 處理日期
        let createdAt = this.selectedPortfolio.createdAt;
        if (this.editPortfolioData.createdAtDate) {
          const newDate = new Date(this.editPortfolioData.createdAtDate);
          if (!isNaN(newDate.getTime())) {
            createdAt = newDate.toISOString();
          }
        }
        
        const updatedData = {
          title: this.editPortfolioData.title.trim(),
          category: this.editPortfolioData.category,
          description: this.editPortfolioData.description?.trim() || '',
          image: this.editPortfolioData.image?.trim() || '',
          tags: this.editPortfolioData.tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag),
          software: this.editPortfolioData.softwareInput
            .split(',')
            .map(s => s.trim())
            .filter(s => s),
          dimensions: this.editPortfolioData.dimensions?.trim() || '',
          createdAt: createdAt,
          gallery: this.editPortfolioData.gallery.filter(img => img.trim()),
          youtube: this.editPortfolioData.youtube?.trim() || '',
          featured: Boolean(this.editPortfolioData.featured)
        };
        
        const updatedPortfolio = dataService.updatePortfolio(this.selectedPortfolio.id, updatedData);
        
        // 更新列表中的項目
        const index = this.portfolioList.findIndex(p => p.id === this.selectedPortfolio.id);
        if (index !== -1) {
          this.portfolioList[index] = updatedPortfolio;
        }
        
        this.closeEditModals();
        alert('作品已更新！');
        
      } catch (error) {
        console.error('更新作品失敗:', error);
        alert('更新作品失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    deletePortfolio(id) {
      if (confirm('確定要刪除這個作品嗎？')) {
        try {
          dataService.deletePortfolio(id);
          this.portfolioList = this.portfolioList.filter(item => item.id !== id);
          alert('作品已刪除！');
        } catch (error) {
          console.error('刪除作品失敗:', error);
          alert('刪除作品失敗: ' + (error.message || '未知錯誤'));
        }
      }
    },

    // 相關圖片管理
    addGalleryImage() {
      const imageUrl = this.newGalleryImage.trim();
      
      if (!imageUrl) {
        alert('請輸入圖片URL');
        return;
      }
      
      if (!this.isValidUrl(imageUrl)) {
        alert('請輸入有效的圖片URL');
        return;
      }
      
      if (this.editPortfolioData.gallery.includes(imageUrl)) {
        alert('此圖片已存在');
        return;
      }
      
      this.editPortfolioData.gallery.push(imageUrl);
      this.newGalleryImage = '';
    },

    removeGalleryImage(index) {
      this.editPortfolioData.gallery.splice(index, 1);
    },
    
    // 新聞管理
    addNews() {
      if (!this.newNews.title.trim() || !this.newNews.content.trim()) return;
      
      this.isLoading = true;
      
      try {
        const newNews = {
          title: this.newNews.title,
          category: this.newNews.category,
          content: this.newNews.content,
          tags: this.newNews.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        const createdNews = dataService.addNews(newNews);
        this.newsList.unshift(createdNews);
        this.closeModals();
        this.resetNewsForm();
        alert('新聞已發布！');
      } catch (error) {
        console.error('發布新聞失敗:', error);
        alert('發布新聞失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    editNews(item) {
      this.selectedNews = item;
      this.editNewsData = {
        title: item.title,
        category: item.category,
        content: item.content,
        tagsInput: (item.tags || []).join(', ')
      };
      this.showEditNewsModal = true;
    },
    
    saveNewsEdit() {
      if (!this.editNewsData.title.trim() || !this.editNewsData.content.trim()) return;
      
      this.isLoading = true;
      
      try {
        const updatedData = {
          title: this.editNewsData.title,
          category: this.editNewsData.category,
          content: this.editNewsData.content,
          tags: this.editNewsData.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        const updatedNews = dataService.updateNews(this.selectedNews.id, updatedData);
        
        const index = this.newsList.findIndex(n => n.id === this.selectedNews.id);
        if (index !== -1) {
          this.newsList[index] = updatedNews;
        }
        
        this.closeEditModals();
        alert('新聞已更新！');
      } catch (error) {
        console.error('更新新聞失敗:', error);
        alert('更新新聞失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    deleteNews(id) {
      if (confirm('確定要刪除這篇新聞嗎？')) {
        try {
          dataService.deleteNews(id);
          this.newsList = this.newsList.filter(item => item.id !== id);
          alert('新聞已刪除！');
        } catch (error) {
          console.error('刪除新聞失敗:', error);
          alert('刪除新聞失敗: ' + (error.message || '未知錯誤'));
        }
      }
    },
    
    // 商品管理
    addProduct() {
      if (!this.newProduct.name.trim() || this.newProduct.price <= 0) return;
      
      this.isLoading = true;
      
      try {
        const newProduct = {
          name: this.newProduct.name,
          category: this.newProduct.category,
          price: Number(this.newProduct.price),
          stock: Number(this.newProduct.stock),
          description: this.newProduct.description,
          image: this.newProduct.image || '/assets/placeholder.webp'
        };
        
        const createdProduct = dataService.addProduct(newProduct);
        this.storeList.unshift(createdProduct);
        this.closeModals();
        this.resetProductForm();
        alert('商品已新增！');
      } catch (error) {
        console.error('新增商品失敗:', error);
        alert('新增商品失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    editProduct(item) {
      this.selectedProduct = item;
      this.editProductData = {
        name: item.name,
        category: item.category,
        price: item.price,
        stock: item.stock,
        description: item.description,
        image: item.image
      };
      this.showEditProductModal = true;
    },
    
    saveProductEdit() {
      if (!this.editProductData.name.trim() || this.editProductData.price <= 0) return;
      
      this.isLoading = true;
      
      try {
        const updatedData = {
          name: this.editProductData.name,
          category: this.editProductData.category,
          price: Number(this.editProductData.price),
          stock: Number(this.editProductData.stock),
          description: this.editProductData.description,
          image: this.editProductData.image
        };
        
        const updatedProduct = dataService.updateProduct(this.selectedProduct.id, updatedData);
        
        const index = this.storeList.findIndex(p => p.id === this.selectedProduct.id);
        if (index !== -1) {
          this.storeList[index] = updatedProduct;
        }
        
        this.closeEditModals();
        alert('商品已更新！');
      } catch (error) {
        console.error('更新商品失敗:', error);
        alert('更新商品失敗: ' + (error.message || '未知錯誤'));
      } finally {
        this.isLoading = false;
      }
    },
    
    deleteProduct(id) {
      if (confirm('確定要刪除這個商品嗎？')) {
        try {
          dataService.deleteProduct(id);
          this.storeList = this.storeList.filter(item => item.id !== id);
          alert('商品已刪除！');
        } catch (error) {
          console.error('刪除商品失敗:', error);
          alert('刪除商品失敗: ' + (error.message || '未知錯誤'));
        }
      }
    },
    
    // 委託管理
    viewCommissionDetail(item) {
      this.selectedCommission = item;
      this.newStatus = item.status;
      this.showCommissionModal = true;
    },
    
    openCommissionModal(item) {
      this.selectedCommission = item;
      this.newStatus = item.status;
      this.showCommissionModal = true;
    },
    
    updateCommissionStatus() {
      if (!this.selectedCommission) return;
      
      try {
        const updatedCommission = dataService.updateCommissionStatus(this.selectedCommission.id, this.newStatus);
        
        const index = this.commissionList.findIndex(c => c.id === this.selectedCommission.id);
        if (index !== -1) {
          this.commissionList[index] = updatedCommission;
        }
        
        this.showCommissionModal = false;
        alert('委託狀態已更新！');
      } catch (error) {
        console.error('更新委託狀態失敗:', error);
        alert('更新委託狀態失敗: ' + (error.message || '未知錯誤'));
      }
    },
    
    // Modal 控制
    closeModals() {
      this.showAddPortfolioModal = false;
      this.showAddNewsModal = false;
      this.showAddProductModal = false;
      this.resetForms();
    },
    
    closeEditModals() {
      this.showEditPortfolioModal = false;
      this.showEditNewsModal = false;
      this.showEditProductModal = false;
      this.selectedPortfolio = null;
      this.selectedNews = null;
      this.selectedProduct = null;
      this.newGalleryImage = '';
    },
    
    // 表單重置
    resetForms() {
      this.resetPortfolioForm();
      this.resetNewsForm();
      this.resetProductForm();
    },
    
    resetPortfolioForm() {
      this.newPortfolio = {
        title: '',
        category: '場景插畫',
        description: '',
        image: '',
        tagsInput: ''
      };
    },
    
    resetNewsForm() {
      this.newNews = {
        title: '',
        category: 'news',
        content: '',
        tagsInput: ''
      };
    },
    
    resetProductForm() {
      this.newProduct = {
        name: '',
        category: '魔法道具',
        price: 0,
        stock: 1,
        description: '',
        image: ''
      };
    },
    
    // 工具方法
    formatDate(dateString) {
      if (!dateString) return '未設定';
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW');
    },
    
    getCategoryName(category) {
      const categoryMap = {
        'news': '最新消息',
        'adventure': '冒險故事',
        'guide': '攻略指南'
      };
      return categoryMap[category] || category;
    },
    
    getStatusText(status) {
      const statusMap = {
        'pending': '待處理',
        'approved': '已接受',
        'in-progress': '進行中',
        'completed': '已完成',
        'cancelled': '已取消'
      };
      return statusMap[status] || status;
    },
    
    getStatusClass(status) {
      const classMap = {
        'pending': 'status-pending',
        'approved': 'status-approved',
        'in-progress': 'status-progress',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
      };
      return classMap[status] || 'status-default';
    },
    
    logout() {
      if (confirm('確定要登出嗎？')) {
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.dashboard-header h1 {
  color: white;
  margin: 0;
  font-size: 2rem;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.btn-logout {
  background: rgba(220, 53, 69, 0.8);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(220, 53, 69, 1);
  transform: translateY(-1px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
}

.management-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border-color: rgba(255, 255, 255, 0.9);
}

.btn-reset {
  background: rgba(220, 53, 69, 0.8);
  color: white;
  border: 2px solid rgba(220, 53, 69, 0.8);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-reset:hover {
  background: rgba(220, 53, 69, 1);
  transform: translateY(-2px);
}

.loading-container {
  text-align: center;
  padding: 3rem;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.content-area {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.section-header h2 {
  margin: 0;
  color: #333;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.btn-warning {
  background: #fd7e14;
  color: white;
}

.btn-warning:hover {
  background: #e8650e;
}

.data-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 120px 150px 120px 150px;
  background: #f8f9fa;
  padding: 1rem;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 120px 150px 120px 150px;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  align-items: center;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.preview-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #eee;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-approved {
  background: #d1ecf1;
  color: #0c5460;
}

.status-progress {
  background: #cce5ff;
  color: #004085;
}

.status-completeted {
  background: #feebc8;
  color: #744210;
}

.status-cancelled {
  background: #e2e8f0;
  color: #4a5568;
}
</style>
