<style lang="scss" scoped>
@use "../styles/portfolio.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">冒險歷程 Portfolio</h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>

      <p>載入中...</p>
    </div>

    <div v-else>
      <div class="portfolio-filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="['btn', selectedCategory === category ? 'btn-primary' : '']"
        >
          {{ category }}
        </button>
      </div>

      <div class="portfolio-grid grid grid-3">
        <div
          v-for="work in filteredWorks"
          :key="work.id"
          class="portfolio-item card"
          @click="goToWorkDetail(work.id)"
        >
          <div class="portfolio-image">
            <div class="placeholder-image">
              <p>{{ work.title }}</p>
            </div>
          </div>

          <div class="portfolio-info">
            <h3 class="card-title">{{ work.title }}</h3>

            <p class="portfolio-category">{{ work.category }}</p>

            <p class="portfolio-description">{{ work.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Portfolio",
  data() {
    return {
      works: [],
      loading: true,
      selectedCategory: "全部",
      categories: ["全部", "奇幻插畫", "角色設定", "世界觀", "概念設計"],
    };
  },
  computed: {
    filteredWorks() {
      if (this.selectedCategory === "全部") {
        return this.works;
      }
      return this.works.filter((work) => work.category === this.selectedCategory);
    },
  },
  async mounted() {
    await this.fetchWorks();
  },
  methods: {
    async fetchWorks() {
      try {
        const response = await axios.get("/api/portfolio");
        this.works = response.data;
      } catch (error) {
        console.error("獲取作品失敗:", error);
        // 使用模擬資料
        this.works = [
          {
            id: 1,
            title: "龍族守護者",
            category: "奇幻插畫",
            description: "古老龍族與守護者的史詩傳說",
          },
          {
            id: 2,
            title: "精靈法師",
            category: "角色設定",
            description: "森林深處的神秘精靈法師設定",
          },
          {
            id: 3,
            title: "魔法學院",
            category: "世界觀",
            description: "充滿奇幻色彩的魔法學院設計",
          },
        ];
      } finally {
        this.loading = false;
      }
    },
    goToWorkDetail(id) {
      this.$router.push(`/work/${id}`);
    },
  },
};
</script>


