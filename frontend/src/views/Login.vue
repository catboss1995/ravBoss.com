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
      
      <div class="test-account-info">
        <p>測試帳號：admin / admin123</p>
      </div>
    </div>
  </div>
</template>

<script>
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
        // 簡單的本地驗證邏輯
        if (this.credentials.username === 'admin' && this.credentials.password === 'admin123') {
          console.log('登入成功，使用測試帳號');
          
          // 創建模擬用戶和令牌
          const mockUser = {
            id: 1,
            username: 'admin',
            email: 'admin@ravboss.com',
            isAdmin: true,
            displayName: 'RavBoss管理員'
          };
          
          const mockToken = 'mock_jwt_token_' + Date.now();
          
          // 儲存到本地存儲
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          // 重定向到儀表板
          this.$router.push('/dashboard');
          return;
        }
        
        // 如果不是測試帳號，顯示錯誤
        this.error = '登入失敗 - 請使用測試帳號：admin / admin123';
      } catch (error) {
        console.error('登入處理錯誤:', error);
        this.error = '登入處理發生錯誤，請使用測試帳號：admin / admin123';
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

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.login-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.login-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fed7d7;
  color: #c53030;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
}

.test-account-info {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>