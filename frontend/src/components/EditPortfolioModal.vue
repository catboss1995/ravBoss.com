<!-- 編輯作品 Modal -->
<div v-if="showEditPortfolioModal && selectedPortfolio" class="modal-overlay" @click="closeEditModals">
  <div class="modal-content large-modal" @click.stop>
    <div class="modal-header">
      <h3>編輯作品</h3>
      <button @click="closeEditModals" class="modal-close">×</button>
    </div>
    <form @submit.prevent="savePortfolioEdit" class="edit-form">
      <div class="form-row">
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
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>創建日期</label>
          <input v-model="editPortfolioData.createdAt" type="date">
        </div>
        <div class="form-group">
          <label>尺寸</label>
          <input v-model="editPortfolioData.dimensions" type="text" placeholder="例如：1920x1080 或 A4">
        </div>
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
      
      <div class="form-group">
        <label>標籤 (用逗號分隔)</label>
        <input v-model="editPortfolioData.tagsInput" type="text" placeholder="例如：奇幻,森林,角色設計">
      </div>
      
      <div class="form-group">
        <label>軟體 (用逗號分隔)</label>
        <input v-model="editPortfolioData.softwareInput" type="text" placeholder="例如：Photoshop,Procreate">
      </div>
      
      <div class="form-group">
        <label>相關圖片URLs (用逗號分隔)</label>
        <input v-model="editPortfolioData.galleryInput" type="text" placeholder="例如：/assets/image1.webp,/assets/image2.webp">
        <div class="gallery-preview" v-if="editPortfolioData.galleryInput">
          <div v-for="(url, index) in editPortfolioData.galleryInput.split(',')" :key="index" class="gallery-item">
            <img :src="url.trim()" :alt="`相關圖片 ${index+1}`">
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label>YouTube影片ID (可選)</label>
        <input v-model="editPortfolioData.youtubeId" type="text" placeholder="例如：dQw4w9WgXcQ">
        <div class="youtube-preview" v-if="editPortfolioData.youtubeId">
          <iframe 
            :src="`https://www.youtube.com/embed/${editPortfolioData.youtubeId}`" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
      
      <div class="form-group">
        <label>精選作品</label>
        <div class="checkbox-group">
          <input type="checkbox" id="featured" v-model="editPortfolioData.featured">
          <label for="featured">設為精選作品（首頁展示）</label>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="closeEditModals" class="btn btn-secondary">取消</button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </form>
  </div>
</div>