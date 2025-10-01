<style lang="scss" scoped>
@use "../styles/about.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">關於 About the Artist</h1>

    <div class="about-content">
      <div class="about-text">
        <h2>烏鴉/貓大</h2>
        <p>
          歡迎查閱我的冒險者檔案！我是一位穿梭在現實與幻想之間的創作者，
          專精於將腦海中的奇幻世界透過畫筆帶到現實中。
        </p>

        <h3>冒險技能</h3>
        <ul>
          <li>奇幻插畫</li>
          <li>角色設定</li>
          <li>世界觀設計</li>
          <li>概念藝術</li>
          <li>委託創作</li>
        </ul>

        <h3>聯絡方式</h3>
        <p>
          想要進行委託或有任何疑問嗎？歡迎透過以下方式與我聯絡，
          讓我們一起踏上創作的冒險旅程！
        </p>
        <ul>
          <li>魔法信件: catboss1995@aol.com</li>
        </ul>

        <h3>社群連結</h3>
        <p>關注我的冒險足跡，獲取最新作品動態！</p>
        <div class="social-buttons">
          <a href="https://www.plurk.com/ktv80607" target="_blank" class="social-btn plurk-btn">
            <i class="fa-solid fa-feather"></i>
            <span>Plurk</span>
          </a>
          
          <a href="https://bsky.app/profile/catbosstw.bsky.social" target="_blank" class="social-btn bluesky-btn">
            <i class="fas fa-cloud"></i>
            <span>Bluesky</span>
          </a>
          
          <a href="https://www.instagram.com/fishbosscat/" target="_blank" class="social-btn instagram-btn">
            <i class="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          
          <a href="https://www.artstation.com/catboss1995" target="_blank" class="social-btn artstation-btn">
            <i class="fab fa-artstation"></i>
            <span>ArtStation</span>
          </a>
          
          <a href="https://discord.gg/catboss1995" target="_blank" class="social-btn discord-btn">
            <i class="fab fa-discord"></i>
            <span>Discord</span>
          </a>
          
          <a href="https://www.deviantart.com/catbosstw" target="_blank" class="social-btn deviantart-btn">
            <i class="fa-brands fa-deviantart"></i>
            <span>Deviantart</span>
          </a>
        </div>
      </div>

      <div class="about-image">
        <img :src="avatarImage" alt="冒險者肖像" class="avatar-image" />
      </div>
    </div>
  </div>
</template>

<script>
import avatarImage from '../assets/me.png';

export default {
  name: "About",
  computed: {
    avatarImage() {
      return avatarImage;
    }
  }
};
</script>


