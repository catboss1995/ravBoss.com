<template>
  <div class="page-container">
    <h1 class="page-title">相關連結</h1>
    
    <div class="links-grid grid grid-2">
      <div class="links-category card">
        <h3 class="card-title">社群媒體</h3>
        <div class="links-list">
          <a v-for="link in socialLinks" :key="link.name" 
             :href="link.url" target="_blank" class="link-item">
            <span class="link-name">{{ link.name }}</span>
            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>
      
      <div class="links-category card">
        <h3 class="card-title">創作平台</h3>
        <div class="links-list">
          <a v-for="link in creativeLinks" :key="link.name" 
             :href="link.url" target="_blank" class="link-item">
            <span class="link-name">{{ link.name }}</span>
            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>
      
      <div class="links-category card">
        <h3 class="card-title">商業合作</h3>
        <div class="links-list">
          <a v-for="link in businessLinks" :key="link.name" 
             :href="link.url" target="_blank" class="link-item">
            <span class="link-name">{{ link.name }}</span>
            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>
      
      <div class="links-category card">
        <h3 class="card-title">友站連結</h3>
        <div class="links-list">
          <a v-for="link in friendLinks" :key="link.name" 
             :href="link.url" target="_blank" class="link-item">
            <span class="link-name">{{ link.name }}</span>
            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Links',
  data() {
    return {
      socialLinks: [
        {
          name: 'Twitter',
          url: 'https://twitter.com/ravboss',
          description: '最新動態和作品分享'
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/ravboss',
          description: '日常創作和幕後花絮'
        },
        {
          name: 'Facebook',
          url: 'https://facebook.com/ravboss',
          description: '官方粉絲專頁'
        }
      ],
      creativeLinks: [
        {
          name: 'Pixiv',
          url: 'https://pixiv.net/users/ravboss',
          description: '插畫作品展示'
        },
        {
          name: 'ArtStation',
          url: 'https://artstation.com/ravboss',
          description: '專業作品集'
        },
        {
          name: 'DeviantArt',
          url: 'https://deviantart.com/ravboss',
          description: '創作社群'
        }
      ],
      businessLinks: [
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/in/ravboss',
          description: '商業合作聯絡'
        },
        {
          name: 'Behance',
          url: 'https://behance.net/ravboss',
          description: '設計作品展示'
        }
      ],
      friendLinks: [
        {
          name: '創作者聯盟',
          url: 'https://example.com/creators',
          description: '創作者交流平台'
        },
        {
          name: '設計師社群',
          url: 'https://example.com/designers',
          description: '設計師資源分享'
        }
      ]
    }
  }
}
</script>

<style scoped>
.links-grid {
  gap: 1.5rem;
}

.links-category {
  height: fit-content;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
}

.link-item:hover {
  background-color: #e9ecef;
  transform: translateX(5px);
}

.link-name {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.link-description {
  font-size: 0.9rem;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>