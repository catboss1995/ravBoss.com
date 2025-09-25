<style lang="scss" scoped>
@use "../styles/commission.scss" as *;
</style>

<template>
  <div class="page-container">
    <h1 class="page-title">鐵匠鋪 Commission Forge</h1>

    <div class="commission-content">
      <div class="commission-info">
        <h2>鍛造流程</h2>

        <div class="process-steps">
          <div class="step">
            <h3>1. 提交訂單</h3>

            <p>詳細描述你想要鍛造的道具規格</p>
          </div>

          <div class="step">
            <h3>2. 材料估價</h3>

            <p>鐵匠會評估所需材料並提供報價</p>
          </div>

          <div class="step">
            <h3>3. 開始鍛造</h3>

            <p>確認訂單後開始精心鍛造過程</p>
          </div>

          <div class="step">
            <h3>4. 完成交付</h3>

            <p>鍛造完成，為你獻上精美的作品</p>
          </div>
        </div>
      </div>

      <div class="commission-form-container">
        <h2>鍛造訂單</h2>

        <form @submit.prevent="submitCommission" class="commission-form">
          <div class="form-group">
            <label class="form-label">姓名 *</label>

            <input v-model="form.name" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Email *</label>

            <input v-model="form.email" type="email" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">鍛造類型 *</label>

            <select v-model="form.type" class="form-select" required>
              <option value="">請選擇</option>

              <option value="奇幻插畫">奇幻插畫</option>

              <option value="角色設定">角色設定</option>

              <option value="世界觀設計">世界觀設計</option>

              <option value="概念設計">概念設計</option>

              <option value="其他">其他</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">預算範圍</label>

            <select v-model="form.budget" class="form-select">
              <option value="">請選擇</option>

              <option value="1000-3000">NT$ 1,000 - 3,000</option>

              <option value="3000-5000">NT$ 3,000 - 5,000</option>

              <option value="5000-10000">NT$ 5,000 - 10,000</option>

              <option value="10000+">NT$ 10,000 以上</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">鍛造需求 *</label>

            <textarea
              v-model="form.description"
              class="form-textarea"
              rows="5"
              placeholder="請詳細描述你想要鍛造的道具規格和特殊需求..."
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">完成期限</label>

            <input v-model="form.deadline" type="date" class="form-input" />
          </div>

          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? "鍛造中..." : "開始鍛造" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Commission",
  data() {
    return {
      form: {
        name: "",
        email: "",
        type: "",
        budget: "",
        description: "",
        deadline: "",
      },
      submitting: false,
    };
  },
  methods: {
    async submitCommission() {
      this.submitting = true;

      try {
        await axios.post("/api/commission", this.form);
        alert("委託已成功提交！我們會盡快與您聯絡。");
        this.resetForm();
      } catch (error) {
        console.error("提交委託失敗:", error);
        alert("提交失敗，請稍後再試。");
      } finally {
        this.submitting = false;
      }
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        type: "",
        budget: "",
        description: "",
        deadline: "",
      };
    },
  },
};
</script>


