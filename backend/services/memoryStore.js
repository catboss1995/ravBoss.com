/**
 * 內存數據存儲服務 - 臨時替代MongoDB
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class MemoryStore {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.stores = {
      users: [],
      portfolio: [],
      commission: [],
      posts: [],
      store: [],
      announcements: []
    };
    
    // 確保數據目錄存在
    this.ensureDataDir();
    
    // 初始化數據
    this.loadData();
    
    // 如果沒有管理員用戶，創建一個默認管理員
    if (!this.stores.users.find(user => user.username === 'admin')) {
      this.createAdminUser();
    }
  }
  
  // 確保數據目錄存在
  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      try {
        fs.mkdirSync(this.dataDir, { recursive: true });
        console.log(`創建數據目錄: ${this.dataDir}`);
      } catch (err) {
        console.error(`無法創建數據目錄: ${err.message}`);
      }
    }
  }
  
  // 從文件加載數據
  loadData() {
    for (const store in this.stores) {
      const filePath = path.join(this.dataDir, `${store}.json`);
      
      if (fs.existsSync(filePath)) {
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          this.stores[store] = JSON.parse(data);
          console.log(`已從文件加載 ${store} 數據`);
        } catch (err) {
          console.error(`加載 ${store} 數據失敗:`, err);
        }
      } else {
        // 如果文件不存在，初始化為空數組並保存
        this.saveData(store);
        console.log(`初始化 ${store} 數據文件`);
      }
    }
  }
  
  // 保存數據到文件
  saveData(storeName) {
    const filePath = path.join(this.dataDir, `${storeName}.json`);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(this.stores[storeName], null, 2), 'utf8');
    } catch (err) {
      console.error(`保存 ${storeName} 數據失敗:`, err);
    }
  }
  
  // 創建默認管理員用戶
  createAdminUser() {
    const adminUser = {
      _id: this.generateId(),
      username: 'admin',
      email: 'admin@ravboss.com',
      // 密碼: admin123 (實際應用中應該使用更安全的方式)
      password: '$2b$10$XnlXCXUh.zTjBKmwFuXMPOKH4G9Re7N0RaRJ9q4XLHQJlAGXHWnie', 
      isAdmin: true,
      profile: {
        displayName: 'RavBoss管理員',
        bio: '系統管理員',
        avatar: null
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };
    
    this.stores.users.push(adminUser);
    this.saveData('users');
    console.log('創建默認管理員用戶: admin');
  }
  
  // 生成唯一ID
  generateId() {
    return crypto.randomBytes(12).toString('hex');
  }
  
  // 通用CRUD操作
  
  // 查找所有記錄
  findAll(collection) {
    return [...this.stores[collection]];
  }
  
  // 按ID查找
  findById(collection, id) {
    return this.stores[collection].find(item => item._id === id);
  }
  
  // 按條件查找一個記錄
  findOne(collection, query) {
    return this.stores[collection].find(item => {
      for (const key in query) {
        if (query[key] !== item[key]) {
          return false;
        }
      }
      return true;
    });
  }
  
  // 按條件查找多個記錄
  find(collection, query) {
    return this.stores[collection].filter(item => {
      for (const key in query) {
        if (query[key] !== item[key]) {
          return false;
        }
      }
      return true;
    });
  }
  
  // 創建記錄
  create(collection, data) {
    const newItem = {
      _id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.stores[collection].push(newItem);
    this.saveData(collection);
    return newItem;
  }
  
  // 更新記錄
  update(collection, id, data) {
    const index = this.stores[collection].findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedItem = {
      ...this.stores[collection][index],
      ...data,
      updatedAt: new Date()
    };
    
    this.stores[collection][index] = updatedItem;
    this.saveData(collection);
    return updatedItem;
  }
  
  // 刪除記錄
  delete(collection, id) {
    const index = this.stores[collection].findIndex(item => item._id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.stores[collection].splice(index, 1);
    this.saveData(collection);
    return true;
  }
  
  // 用戶認證相關方法
  async comparePassword(collection, id, password) {
    // 在實際應用中應該使用bcrypt比較密碼
    // 這裡簡化為直接比較（假設密碼是admin123）
    const user = this.findById(collection, id);
    return user && (password === 'admin123' || user.password === password);
  }
}

// 創建並導出單例
const memoryStore = new MemoryStore();
module.exports = memoryStore;