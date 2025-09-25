<style lang="scss" scoped>
@use "../styles/about.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">冒險者檔案 About the Artist</h1>

    <div class="about-content">
      <div class="about-text">
        <h2>冒險者的故事</h2>
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
          <li>魔法信件: contact@ravboss.com</li>
          <li>水晶球通訊: +886-123-456-789</li>
        </ul>
      </div>

      <div class="about-image">
        <div class="placeholder-image">
          <p>冒險者肖像</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>


