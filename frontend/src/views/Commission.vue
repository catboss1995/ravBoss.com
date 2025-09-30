<style lang="scss" scoped>
@use "../styles/commission.scss" as *;
</style>

<template>
  <div class="commission-container">
    <div class="form-container">
      <div class="header">
        <h1><i class="fas fa-fire"></i>繪圖委託鐵匠鋪</h1>
        <p>線上委託表單系統 v1.0</p>
        <small class="icon-text">
          <i class="fas fa-calendar-alt"></i>
          填單日期：<input type="date" v-model="form.submitDate" style="display: inline; width: auto; margin-left: 10px;">
        </small>
      </div>

      <form @submit.prevent="submitCommission">
        <!-- 基本聯絡資訊 -->
        <div class="section">
          <h2><i class="fas fa-clipboard-list"></i>基本聯絡資訊</h2>
          <div class="form-group">
            <label>委託人暱稱 <span class="required">*</span></label>
            <input type="text" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label>Email <span class="required">*</span></label>
            <input type="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label>社群聯絡方式 <span class="required">*</span></label>
            <div class="checkbox-group">
              <div class="checkbox-item">
                <input type="checkbox" id="discord" v-model="form.contactMethods" value="discord">
                <label for="discord"><i class="fab fa-discord"></i> Discord</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="line" v-model="form.contactMethods" value="line">
                <label for="line"><i class="fab fa-line"></i> Line</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="telegram" v-model="form.contactMethods" value="telegram">
                <label for="telegram"><i class="fab fa-telegram"></i> Telegram</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="twitter" v-model="form.contactMethods" value="twitter">
                <label for="twitter"><i class="fab fa-twitter"></i> Twitter/X</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="plurk" v-model="form.contactMethods" value="plurk">
                <label for="plurk"><i class="fas fa-comments"></i> Plurk</label>
              </div>
            </div>
            <input type="text" v-model="form.contactId" placeholder="請填寫聯絡ID或帳號" style="margin-top: 10px;">
          </div>
        </div>

        <!-- 委託類型與內容 -->
        <div class="section">
          <h2><i class="fas fa-palette"></i>委託類型與內容</h2>
          <div class="form-group">
            <label>委託類型 <span class="required">*</span></label>
            <select v-model="form.commissionType" required>
              <option value="">請選擇</option>
              <option value="avatar">Furry頭像/大頭貼</option>
              <option value="halfbody">半身角色</option>
              <option value="fullbody">全身角色</option>
              <option value="reference">角色三視圖</option>
              <option value="illustration">情境插畫</option>
              <option value="emoji">表情包/貼圖組</option>
              <option value="live2d">Live2D立繪</option>
              <option value="logo">Logo設計</option>
              <option value="other">其他（請備註）</option>
            </select>
          </div>

          <div class="price-info">
            <h4><i class="fas fa-dollar-sign"></i>參考價格範圍：</h4>
            • 頭像/大頭貼：NT$ 800-1,500<br>
            • 半身角色：NT$ 1,500-3,000<br>
            • 全身角色：NT$ 2,500-5,000<br>
            • 精細插畫：NT$ 4,000-8,000<br>
            • 商業用途：+50%費用
          </div>

          <div class="form-group">
            <label>內容敘述 <span class="required">*</span></label>
            <textarea rows="4" v-model="form.description" placeholder="請詳細描述您的委託需求" required></textarea>
          </div>
        </div>

        <!-- 角色詳細設定 -->
        <div class="section">
          <h2><i class="fas fa-user-ninja"></i>角色詳細設定</h2>
          <div class="form-group">
            <label>角色姓名 <span class="required">*</span></label>
            <input type="text" v-model="form.characterName" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-venus-mars"></i> 性別</label>
              <select v-model="form.characterGender">
                <option value="">請選擇</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="non-binary">非二元</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div class="form-group">
              <label><i class="fas fa-paw"></i> 種族</label>
              <input type="text" v-model="form.characterSpecies" placeholder="如：狼、狐狸、龍等">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-birthday-cake"></i> 年齡（大概）</label>
              <input type="text" v-model="form.characterAge" placeholder="如：20歲左右、青年等">
            </div>
            <div class="form-group">
              <label><i class="fas fa-ruler-vertical"></i> 身高</label>
              <input type="text" v-model="form.characterHeight" placeholder="如：170cm、高挑等">
            </div>
          </div>

          <div class="form-group">
            <label><i class="fas fa-eye"></i> 外觀特徵 <span class="required">*</span></label>
            <textarea rows="4" v-model="form.characterAppearance" placeholder="髮型、毛色、花紋、眼睛顏色、體格身材、特殊標記等詳細描述"
              required></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-tshirt"></i> 衣著設定</label>
            <textarea rows="3" v-model="form.characterOutfit" placeholder="服裝、褲裙、襪子、鞋子、配件等描述（如無特殊需求可留空）"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-heart"></i> 個性敘述</label>
            <textarea rows="2" v-model="form.characterPersonality" placeholder="簡單的個性特點、喜好等（可增加設計靈感）"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-image"></i> 氣氛或背景需求</label>
            <textarea rows="2" v-model="form.backgroundRequirements" placeholder="背景設定、氣氛營造等需求"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-clone"></i> 差分需求</label>
            <textarea rows="2" v-model="form.variationRequirements" placeholder="如需要表情差分、服裝差分等，請詳述"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-upload"></i> 參考圖片上傳</label>
            <div class="file-upload">
              <i class="fas fa-cloud-upload-alt"></i>
              <input type="file" multiple accept="image/*" @change="handleFileUpload">
              <p>可上傳多張參考圖片或直接貼連結</p>
            </div>
            <textarea rows="2" v-model="form.referenceLinks" placeholder="或在此貼上參考圖片連結"
              style="margin-top: 10px;"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-sticky-note"></i> 其他備註資料</label>
            <textarea rows="2" v-model="form.additionalNotes" placeholder="任何其他重要資訊"></textarea>
          </div>
        </div>

        <!-- 規格與用途 -->
        <div class="section">
          <h2><i class="fas fa-ruler-combined"></i>規格與用途</h2>
          <div class="form-group">
            <label>尺寸規格 <span class="required">*</span></label>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" name="size" id="a4" value="a4" v-model="form.size">
                <label for="a4"><i class="fas fa-file-alt"></i> A4 300dpi</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="size" id="b5" value="b5" v-model="form.size">
                <label for="b5"><i class="fas fa-file"></i> B5 300dpi</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="size" id="hd" value="hd" v-model="form.size">
                <label for="hd"><i class="fas fa-desktop"></i> 1920*1080px 300dpi</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="size" id="social" value="social" v-model="form.size">
                <label for="social"><i class="fas fa-user-circle"></i> 社群頭像 (512x512)</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="size" id="custom" value="custom" v-model="form.size">
                <label for="custom"><i class="fas fa-cog"></i> 其他尺寸</label>
              </div>
            </div>
            <input type="text" v-model="form.customSize" placeholder="如選其他尺寸，請填寫" style="margin-top: 10px;">
          </div>

          <div class="form-group">
            <label><i class="fas fa-bullseye"></i> 使用用途 <span class="required">*</span></label>
            <textarea rows="3" v-model="form.usagePurpose" placeholder="如社群平台(FB/Youtube/Plurk/Twitter等)、影片、遊戲等，可直接貼連結"
              required></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-store"></i> 營利使用 <span class="required">*</span></label>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" name="commercial" id="commercial-yes" value="yes" v-model="form.commercialUse"
                  required>
                <label for="commercial-yes"><i class="fas fa-check-circle"></i> 是（販售/贊助/廣告等）+50%費用</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="commercial" id="commercial-no" value="no" v-model="form.commercialUse"
                  required>
                <label for="commercial-no"><i class="fas fa-times-circle"></i> 否（個人使用/公益）</label>
              </div>
            </div>
          </div>
        </div>

        <!-- 時程安排 -->
        <div class="section">
          <h2><i class="fas fa-clock"></i>時程安排</h2>
          <div class="form-group">
            <label><i class="fas fa-calendar-check"></i> 截稿日期</label>
            <input type="date" v-model="form.deadline">
            <small style="color: #666;">需於此日期前完成，如無特殊需求可留空</small>
          </div>

          <div class="workflow-info">
            <h4><i class="fas fa-tasks"></i>委託流程：</h4>
            提供資料 → 報價確認 → 安排約定日期 → 繳交草稿 → 確認收訂金50% → 確認完稿 → 收尾款 → 雲端交檔
          </div>

          <div class="timeline-section">
            <h4><i class="fas fa-stopwatch"></i>預估時程（由系統填寫）</h4>
            <div class="form-row">
              <div class="form-group">
                <label>工作天數估計</label>
                <input type="number" :value="estimatedWorkDays" placeholder="天" readonly>
              </div>
              <div class="form-group">
                <label>修改次數限制</label>
                <input type="number" value="2" readonly>
              </div>
            </div>
            <small style="color: #666;">修改範圍僅限：換色、細節修改，不接受整體構圖重畫</small>
          </div>
        </div>

        <!-- 公開與直播設定 -->
        <div class="section">
          <h2><i class="fas fa-bullhorn"></i>公開與直播設定</h2>
          <div class="form-group">
            <label><i class="fas fa-calendar-alt"></i> 公開時間</label>
            <textarea rows="2" v-model="form.publicationTime" placeholder="如沒有填寫，繪者會在完成結案後直接公開於社群平台"></textarea>
          </div>

          <div class="form-group">
            <label><i class="fas fa-tag"></i> 公開時標註（可複選）</label>
            <div class="checkbox-group">
              <div class="checkbox-item">
                <input type="checkbox" id="tag-client" v-model="form.publicTags" value="client">
                <label for="tag-client"><i class="fas fa-user"></i> 標註委託人暱稱</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="tag-character" v-model="form.publicTags" value="character">
                <label for="tag-character"><i class="fas fa-id-card"></i> 標註角色名稱</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="tag-other" v-model="form.publicTags" value="other">
                <label for="tag-other"><i class="fas fa-plus"></i> 其他標註</label>
              </div>
            </div>
            <input type="text" v-model="form.otherTags" placeholder="其他標註內容" style="margin-top: 10px;">
          </div>

          <div class="form-group">
            <label><i class="fas fa-video"></i> 能否實況製作</label>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" name="stream" id="stream-full" value="full" v-model="form.streamPermission">
                <label for="stream-full"><i class="fas fa-check-circle"></i> 可以全程直播</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="stream" id="stream-partial" value="partial" v-model="form.streamPermission">
                <label for="stream-partial"><i class="fas fa-eye-slash"></i> 僅可前期至中期直播（不公開完稿）</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="stream" id="stream-no" value="no" v-model="form.streamPermission">
                <label for="stream-no"><i class="fas fa-ban"></i> 禁止公開直播製作</label>
              </div>
            </div>
          </div>
        </div>

        <!-- 預算與付款 -->
        <div class="section">
          <h2><i class="fas fa-money-bill-wave"></i>預算與付款</h2>
          <div class="form-group">
            <label><i class="fas fa-calculator"></i> 金額預算 <span class="required">*</span></label>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span>新台幣</span>
              <input type="number" v-model="form.budget" style="width: 150px;" required>
              <span>元整 (NTD)</span>
            </div>
          </div>

          <div class="form-group">
            <label><i class="fas fa-credit-card"></i> 匯款方式 <span class="required">*</span></label>
            <div class="radio-group">
              <div class="radio-item">
                <input type="radio" name="payment" id="bank" value="bank" v-model="form.paymentMethod" required>
                <label for="bank"><i class="fas fa-university"></i> 郵局/銀行匯款</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="payment" id="paypal" value="paypal" v-model="form.paymentMethod" required>
                <label for="paypal"><i class="fab fa-paypal"></i> 海外PayPal（需+5%+10元NTD）</label>
              </div>
              <div class="radio-item">
                <input type="radio" name="payment" id="jkopay" value="jkopay" v-model="form.paymentMethod" required>
                <label for="jkopay"><i class="fas fa-mobile-alt"></i> 街口支付</label>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用授權 -->
        <div class="copyright-section">
          <h3><i class="fas fa-shield-alt"></i>使用授權條款</h3>

          <h4><i class="fas fa-check"></i>可以使用的範圍：</h4>
          <ul>
            <li>個人收藏、公開於社群平台</li>
            <li>實況直播、影片、遊戲使用</li>
            <li>不改作原圖的狀態下可裁切排版加工使用</li>
            <li>完稿的角色及服裝/武器設計作品，委託人可委任第三方繪師或給粉絲衍生創作</li>
          </ul>

          <h4><i class="fas fa-times"></i>不可以的使用方式：</h4>
          <ul>
            <li>不可任意自行改造作品（例如2P角色或改特徵變成新的角色）</li>
            <li>不可將檔案轉賣他人</li>
            <li>不可做委託時約定以外的用途</li>
            <li>印刷、募資、展場、商品使用等大量廣告用途需另詢價格</li>
          </ul>

          <h4><i class="fas fa-exclamation-triangle"></i>重要提醒：</h4>
          <ul>
            <li>繪圖及設計著作人格權為繪者</li>
            <li>公開貼文時需標註繪者名</li>
            <li>張貼未完稿圖必須雙方同意</li>
            <li>繪者會縮小委託圖解析度公開於社群平台和作品集</li>
            <li>繪者不會將委託檔案轉賣或轉讓他人使用</li>
          </ul>
        </div>

        <!-- 委託條款確認 -->
        <div class="terms">
          <h3><i class="fas fa-clipboard-check"></i>委託條款確認</h3>
          <div class="checkbox-item">
            <input type="checkbox" id="terms1" v-model="form.termsAgreement.process" required>
            <label for="terms1">我已了解委託流程和時程安排</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="terms2" v-model="form.termsAgreement.revisions" required>
            <label for="terms2">我已了解修改次數限制（2次免費修改）</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="terms3" v-model="form.termsAgreement.copyright" required>
            <label for="terms3">我已了解使用授權範圍和限制</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="terms4" v-model="form.termsAgreement.publication" required>
            <label for="terms4">我同意繪者公開作品於社群平台</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="terms5" v-model="form.termsAgreement.confirmation" required>
            <label for="terms5">我確認以上資料填寫無誤</label>
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="submitting">
          <i class="fas fa-paper-plane"></i>{{ submitting ? "處理中..." : "提交委託申請" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Commission",
  data() {
    return {
      emailSending: false,//發送狀態指示器
      submitting: false,
      recipientEmail: "catboss1995@aol.com", // 設定接收表單的電子郵件地址
      emailjsServiceId: "service_k4kn2sm", // 您的 EmailJS 服務 ID
      emailjsTemplateId: "template_2dvahyp", // 您的 EmailJS 模板 ID
      form: {
        submitDate: this.getCurrentDate(),
        name: "",
        email: "",
        contactMethods: [],
        contactId: "",
        commissionType: "",
        description: "",
        characterName: "",
        characterGender: "",
        characterSpecies: "",
        characterAge: "",
        characterHeight: "",
        characterAppearance: "",
        characterOutfit: "",
        characterPersonality: "",
        backgroundRequirements: "",
        variationRequirements: "",
        referenceFiles: [],
        referenceLinks: "",
        additionalNotes: "",
        size: "",
        customSize: "",
        usagePurpose: "",
        commercialUse: "",
        deadline: "",
        publicationTime: "",
        publicTags: [],
        otherTags: "",
        streamPermission: "",
        budget: "",
        paymentMethod: "",
        termsAgreement: {
          process: false,
          revisions: false,
          copyright: false,
          publication: false,
          confirmation: false
        }
      }
    };
  },
  mounted() {
    // 動態載入 EmailJS 腳本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // 腳本載入完成後初始化 EmailJS
      if (window.emailjs) {
        window.emailjs.init(qMM3988HJ7nIXJgsk);
      } else {
        console.error("EmailJS 未載入，請確認腳本是否正確引入");
      }
    };
    document.head.appendChild(script);
  },
  computed: {
    estimatedWorkDays() {
      // 根據委託類型估計工作天數
      const typeDays = {
        avatar: 3,
        halfbody: 5,
        fullbody: 7,
        reference: 10,
        illustration: 14,
        emoji: 7,
        live2d: 21,
        logo: 7,
        other: 10
      };

      return this.form.commissionType ? typeDays[this.form.commissionType] : 0;
    },
    allTermsAgreed() {
      const terms = this.form.termsAgreement;
      return terms.process && terms.revisions && terms.copyright &&
        terms.publication && terms.confirmation;
    }
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleFileUpload(event) {
      this.form.referenceFiles = Array.from(event.target.files);
    },
    async submitCommission() {
      if (!this.allTermsAgreed) {
        alert("請同意所有委託條款才能提交申請");
        return;
      }

      this.submitting = true;

      try {
        // 建立FormData物件用於上傳檔案
        const formData = new FormData();

        // 添加表單資料
        Object.keys(this.form).forEach(key => {
          if (key !== 'referenceFiles' && key !== 'termsAgreement') {
            formData.append(key,
              Array.isArray(this.form[key]) ? JSON.stringify(this.form[key]) : this.form[key]);
          }
        });

        // 添加條款同意資料
        formData.append('termsAgreement', JSON.stringify(this.form.termsAgreement));

        // 添加收件人電子郵件
        formData.append('recipientEmail', this.recipientEmail);

        // 添加檔案
        this.form.referenceFiles.forEach((file, index) => {
          formData.append(`referenceFile_${index}`, file);
        });

        // 嘗試發送到後端API
        await axios.post("/api/commission", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert("委託已成功提交！我們會盡快與您聯絡。");
        this.resetForm();
      } catch (error) {
        console.error("提交委託失敗:", error);

        // 使用電子郵件服務發送表單內容
        try {
          // 準備表單摘要
          const formSummary = this.prepareFormSummary();

          // 使用 EmailJS 發送電子郵件
          await this.sendFormByEmail(formSummary);

          alert("委託已成功提交！\n\n我們已收到您的委託申請，謝謝您的信任！\n" +
            `委託人: ${this.form.name}\n` +
            `委託類型: ${this.getCommissionTypeName(this.form.commissionType)}\n` +
            `角色名稱: ${this.form.characterName}\n` +
            `預算: NT$${this.form.budget}\n\n` +
            "我們會在 1-2 個工作天內回覆您！");
          this.resetForm();
        } catch (Error) {
          console.error("發送電子郵件失敗:", Error);
          alert("提交委託時發生錯誤，請稍後再試或直接聯絡我們。");
        }
      } finally {
        this.submitting = false;
      }
    },
    prepareFormSummary() {
      // 準備表單摘要以便發送電子郵件
      return {
        subject: `新委託申請: ${this.form.name} - ${this.getCommissionTypeName(this.form.commissionType)}`,
        body: `
          委託申請表單摘要：
          
          基本資訊：
          - 委託人: ${this.form.name}
          - Email: ${this.form.email}
          - 聯絡方式: ${this.form.contactMethods.join(', ')} (${this.form.contactId})
          - 提交日期: ${this.form.submitDate}
          
          委託內容：
          - 委託類型: ${this.getCommissionTypeName(this.form.commissionType)}
          - 角色名稱: ${this.form.characterName}
          - 角色種族: ${this.form.characterSpecies}
          - 角色性別: ${this.form.characterGender}
          
          詳細描述：
          ${this.form.description}
          
          外觀特徵：
          ${this.form.characterAppearance}
          
          衣著設定：
          ${this.form.characterOutfit}
          
          規格與用途：
          - 尺寸: ${this.form.size === 'custom' ? this.form.customSize : this.form.size}
          - 用途: ${this.form.usagePurpose}
          - 商業使用: ${this.form.commercialUse === 'yes' ? '是' : '否'}
          
          預算與付款：
          - 預算: NT$${this.form.budget}
          - 付款方式: ${this.form.paymentMethod}
          
          時程：
          - 截稿日期: ${this.form.deadline || '無特殊需求'}
          - 估計工作天數: ${this.estimatedWorkDays}天
          
          參考連結：
          ${this.form.referenceLinks}
          
          其他備註：
          ${this.form.additionalNotes}
        `
      };
    },
    async sendFormByEmail(formSummary) {
      this.emailSending = true;
      try {
        if (!window.emailjs) {
          throw new Error('EmailJS 未載入，請確認腳本是否正確引入');
        }

        // 發送電子郵件
        const result = await window.emailjs.send(
          this.emailjsServiceId,
          this.emailjsTemplateId,
          {
            to_email: this.recipientEmail,
            subject: formSummary.subject,
            message: formSummary.body,
            from_name: this.form.name,
            reply_to: this.form.email,
            commission_type: this.getCommissionTypeName(this.form.commissionType),
            character_name: this.form.characterName,
            budget: this.form.budget
          }
        );

        console.log('電子郵件發送成功:', result);
        return result;
      } catch (error) {
        console.error('發送電子郵件失敗:', error);
        throw error;
      } finally {
        this.emailSending = false;
      }
    },
    resetForm() {
      this.form = {
        submitDate: this.getCurrentDate(),
        name: "",
        email: "",
        contactMethods: [],
        contactId: "",
        commissionType: "",
        description: "",
        characterName: "",
        characterGender: "",
        characterSpecies: "",
        characterAge: "",
        characterHeight: "",
        characterAppearance: "",
        characterOutfit: "",
        characterPersonality: "",
        backgroundRequirements: "",
        variationRequirements: "",
        referenceFiles: [],
        referenceLinks: "",
        additionalNotes: "",
        size: "",
        customSize: "",
        usagePurpose: "",
        commercialUse: "",
        deadline: "",
        publicationTime: "",
        publicTags: [],
        otherTags: "",
        streamPermission: "",
        budget: "",
        paymentMethod: "",
        termsAgreement: {
          process: false,
          revisions: false,
          copyright: false,
          publication: false,
          confirmation: false
        }
      };

      // 重置檔案上傳欄位
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => {
        input.value = '';
      });
    },
    getCommissionTypeName(type) {
      const types = {
        avatar: "Furry頭像/大頭貼",
        halfbody: "半身角色",
        fullbody: "全身角色",
        reference: "角色三視圖",
        illustration: "情境插畫",
        emoji: "表情包/貼圖組",
        live2d: "Live2D立繪",
        logo: "Logo設計",
        other: "其他"
      };
      return types[type] || type;
    }
  }
};
</script>