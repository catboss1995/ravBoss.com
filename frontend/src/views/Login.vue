<style lang="scss" scoped>
@use "../styles/login.scss" as *;
</style>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">冒險者登入 Adventurer Login</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label">冒險者名稱</label>
          <input
            v-model="credentials.username"
            type="text"
            class="form-input"
            placeholder="輸入你的冒險者名稱"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">魔法密語</label>
          <input
            v-model="credentials.password"
            type="password"
            class="form-input"
            placeholder="輸入你的魔法密語"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="isLoading">
          <span v-if="isLoading">召喚中...</span>
          <span v-else>開始冒險</span>
        </button>
      </form>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      isLoading: false,
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = "";

      try {
        const response = await axios.post("/api/auth/login", this.credentials);

        // 儲存 token 和用戶資訊
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // 重定向到儀表板或首頁
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("登入失敗:", error);

        // 詳細的錯誤處理
        if (error.code === "ERR_NETWORK") {
          this.error = "無法連接到伺服器，請確認後端服務是否啟動";
        } else if (error.response) {
          // 伺服器回應錯誤
          this.error =
            error.response.data?.message || `伺服器錯誤 (${error.response.status})`;
        } else if (error.request) {
          // 網絡請求失敗
          this.error = "網絡請求失敗，請檢查網絡連接";
        } else {
          // 其他錯誤
          this.error = "登入失敗：" + error.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    // 如果已經登入，重定向
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard");
    }
  },
};
</script>
