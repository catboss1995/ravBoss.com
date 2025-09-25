<style lang="scss" scoped>
@use "../styles/links.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">旅伴名冊 Fellow Allies</h1>

    <div class="links-grid grid grid-2">
      <div class="links-category card">
        <h3 class="card-title">冒險據點</h3>

        <div class="links-list">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <span class="link-name">{{ link.name }}</span>

            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">藝術工會</h3>

        <div class="links-list">
          <a
            v-for="link in creativeLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <span class="link-name">{{ link.name }}</span>

            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">商會聯盟</h3>

        <div class="links-list">
          <a
            v-for="link in businessLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
            <span class="link-name">{{ link.name }}</span>

            <span class="link-description">{{ link.description }}</span>
          </a>
        </div>
      </div>

      <div class="links-category card">
        <h3 class="card-title">盟友名錄</h3>

        <div class="links-list">
          <a
            v-for="link in friendLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-item"
          >
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
  name: "Links",
  data() {
    return {
      socialLinks: [
        {
          name: "Twitter",
          url: "https://twitter.com/ravboss",
          description: "冒險日誌和創作分享",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/ravboss",
          description: "創作過程和靈感記錄",
        },
        {
          name: "Facebook",
          url: "https://facebook.com/ravboss",
          description: "冒險者集會所",
        },
      ],
      creativeLinks: [
        {
          name: "Pixiv",
          url: "https://pixiv.net/users/ravboss",
          description: "插畫作品展示",
        },
        {
          name: "ArtStation",
          url: "https://artstation.com/ravboss",
          description: "專業作品集",
        },
        {
          name: "DeviantArt",
          url: "https://deviantart.com/ravboss",
          description: "創作社群",
        },
      ],
      businessLinks: [
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/ravboss",
          description: "商業合作聯絡",
        },
        {
          name: "Behance",
          url: "https://behance.net/ravboss",
          description: "設計作品展示",
        },
      ],
      friendLinks: [
        {
          name: "創作者聯盟",
          url: "https://example.com/creators",
          description: "創作者交流平台",
        },
        {
          name: "設計師社群",
          url: "https://example.com/designers",
          description: "設計師資源分享",
        },
      ],
    };
  },
};
</script>
