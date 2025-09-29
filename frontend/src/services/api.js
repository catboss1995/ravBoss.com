/**
 * API 服務層 - 用於前台與後台的數據交互
 */
import axios from 'axios';

// API 基本設置
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 請求攔截器 - 添加認證令牌
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 響應攔截器 - 處理錯誤
apiClient.interceptors.response.use(
  response => response,
  error => {
    // 如果是網絡錯誤或後端未運行，使用本地模式
    if (error.code === 'ERR_NETWORK') {
      console.log('網絡錯誤或後端未運行，切換到本地模式');
      return Promise.reject({ isNetworkError: true, ...error });
    }
    
    // 如果是認證錯誤，清除本地存儲並重定向到登入頁面
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API 服務對象
const apiService = {
  // 認證相關
  auth: {
    login: async (credentials) => {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 模擬登入 - 當後端不可用時
          if (credentials.username === 'admin' && credentials.password === 'admin123') {
            const mockUser = {
              id: 1,
              username: 'admin',
              email: 'admin@ravboss.com',
              role: 'admin',
              displayName: 'RavBoss管理員'
            };
            
            const mockToken = 'mock_jwt_token_' + Date.now();
            
            return {
              token: mockToken,
              user: mockUser
            };
          }
          throw new Error('登入失敗 - 請使用測試帳號：admin / admin123');
        }
        throw error;
      }
    },
    
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // 清除所有本地數據
      localStorage.removeItem('portfolioData');
      localStorage.removeItem('newsData');
      localStorage.removeItem('storeData');
      localStorage.removeItem('commissionData');
    },
    
    verify: async () => {
      try {
        const response = await apiClient.get('/auth/verify');
        return response.data;
      } catch (error) {
        // 如果是網絡錯誤，檢查本地存儲中是否有令牌
        if (error.isNetworkError) {
          const token = localStorage.getItem('token');
          const user = JSON.parse(localStorage.getItem('user') || 'null');
          if (token && user) {
            return { valid: true, user };
          }
        }
        throw error;
      }
    }
  },
  
  // 作品集相關
  portfolio: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/portfolio');
        // 保存到本地存儲
        localStorage.setItem('portfolioData', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
          return data;
        }
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await apiClient.get(`/portfolio/${id}`);
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
          return data.find(item => item.id == id) || null;
        }
        throw error;
      }
    },
    
    create: async (portfolio) => {
      try {
        const response = await apiClient.post('/portfolio', portfolio);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
        data.unshift(response.data);
        localStorage.setItem('portfolioData', JSON.stringify(data));
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中創建
          const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
          const newItem = {
            ...portfolio,
            id: Date.now(),
            createdAt: new Date().toISOString()
          };
          data.unshift(newItem);
          localStorage.setItem('portfolioData', JSON.stringify(data));
          return newItem;
        }
        throw error;
      }
    },
    
    update: async (id, portfolio) => {
      try {
        const response = await apiClient.put(`/portfolio/${id}`, portfolio);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
        const index = data.findIndex(item => item.id == id);
        if (index !== -1) {
          data[index] = { ...data[index], ...response.data };
          localStorage.setItem('portfolioData', JSON.stringify(data));
        }
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中更新
          const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
          const index = data.findIndex(item => item.id == id);
          if (index !== -1) {
            data[index] = { ...data[index], ...portfolio, updatedAt: new Date().toISOString() };
            localStorage.setItem('portfolioData', JSON.stringify(data));
            return data[index];
          }
          throw new Error('找不到要更新的項目');
        }
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`/portfolio/${id}`);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
        const filteredData = data.filter(item => item.id != id);
        localStorage.setItem('portfolioData', JSON.stringify(filteredData));
        
        return true;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中刪除
          const data = JSON.parse(localStorage.getItem('portfolioData') || '[]');
          const filteredData = data.filter(item => item.id != id);
          localStorage.setItem('portfolioData', JSON.stringify(filteredData));
          return true;
        }
        throw error;
      }
    }
  },
  
  // 新聞相關
  news: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/announcements');
        // 保存到本地存儲
        localStorage.setItem('newsData', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('newsData') || '[]');
          return data;
        }
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await apiClient.get(`/announcements/${id}`);
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('newsData') || '[]');
          return data.find(item => item.id == id) || null;
        }
        throw error;
      }
    },
    
    create: async (news) => {
      try {
        const response = await apiClient.post('/announcements', news);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('newsData') || '[]');
        data.unshift(response.data);
        localStorage.setItem('newsData', JSON.stringify(data));
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中創建
          const data = JSON.parse(localStorage.getItem('newsData') || '[]');
          const newItem = {
            ...news,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            views: 0
          };
          data.unshift(newItem);
          localStorage.setItem('newsData', JSON.stringify(data));
          return newItem;
        }
        throw error;
      }
    },
    
    update: async (id, news) => {
      try {
        const response = await apiClient.put(`/announcements/${id}`, news);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('newsData') || '[]');
        const index = data.findIndex(item => item.id == id);
        if (index !== -1) {
          data[index] = { ...data[index], ...response.data };
          localStorage.setItem('newsData', JSON.stringify(data));
        }
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中更新
          const data = JSON.parse(localStorage.getItem('newsData') || '[]');
          const index = data.findIndex(item => item.id == id);
          if (index !== -1) {
            data[index] = { ...data[index], ...news, updatedAt: new Date().toISOString() };
            localStorage.setItem('newsData', JSON.stringify(data));
            return data[index];
          }
          throw new Error('找不到要更新的項目');
        }
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`/announcements/${id}`);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('newsData') || '[]');
        const filteredData = data.filter(item => item.id != id);
        localStorage.setItem('newsData', JSON.stringify(filteredData));
        
        return true;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中刪除
          const data = JSON.parse(localStorage.getItem('newsData') || '[]');
          const filteredData = data.filter(item => item.id != id);
          localStorage.setItem('newsData', JSON.stringify(filteredData));
          return true;
        }
        throw error;
      }
    }
  },
  
  // 商店相關
  store: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/store');
        // 保存到本地存儲
        localStorage.setItem('storeData', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('storeData') || '[]');
          return data;
        }
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await apiClient.get(`/store/${id}`);
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('storeData') || '[]');
          return data.find(item => item.id == id) || null;
        }
        throw error;
      }
    },
    
    create: async (product) => {
      try {
        const response = await apiClient.post('/store', product);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('storeData') || '[]');
        data.unshift(response.data);
        localStorage.setItem('storeData', JSON.stringify(data));
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中創建
          const data = JSON.parse(localStorage.getItem('storeData') || '[]');
          const newItem = {
            ...product,
            id: Date.now(),
            createdAt: new Date().toISOString()
          };
          data.unshift(newItem);
          localStorage.setItem('storeData', JSON.stringify(data));
          return newItem;
        }
        throw error;
      }
    },
    
    update: async (id, product) => {
      try {
        const response = await apiClient.put(`/store/${id}`, product);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('storeData') || '[]');
        const index = data.findIndex(item => item.id == id);
        if (index !== -1) {
          data[index] = { ...data[index], ...response.data };
          localStorage.setItem('storeData', JSON.stringify(data));
        }
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中更新
          const data = JSON.parse(localStorage.getItem('storeData') || '[]');
          const index = data.findIndex(item => item.id == id);
          if (index !== -1) {
            data[index] = { ...data[index], ...product, updatedAt: new Date().toISOString() };
            localStorage.setItem('storeData', JSON.stringify(data));
            return data[index];
          }
          throw new Error('找不到要更新的項目');
        }
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`/store/${id}`);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('storeData') || '[]');
        const filteredData = data.filter(item => item.id != id);
        localStorage.setItem('storeData', JSON.stringify(filteredData));
        
        return true;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中刪除
          const data = JSON.parse(localStorage.getItem('storeData') || '[]');
          const filteredData = data.filter(item => item.id != id);
          localStorage.setItem('storeData', JSON.stringify(filteredData));
          return true;
        }
        throw error;
      }
    }
  },
  
  // 委託相關
  commission: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/commission');
        // 保存到本地存儲
        localStorage.setItem('commissionData', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
          return data;
        }
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await apiClient.get(`/commission/${id}`);
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 從本地存儲獲取數據
          const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
          return data.find(item => item.id == id) || null;
        }
        throw error;
      }
    },
    
    create: async (commission) => {
      try {
        const response = await apiClient.post('/commission', commission);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
        data.unshift(response.data);
        localStorage.setItem('commissionData', JSON.stringify(data));
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中創建
          const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
          const newItem = {
            ...commission,
            id: Date.now(),
            status: 'pending',
            createdAt: new Date().toISOString()
          };
          data.unshift(newItem);
          localStorage.setItem('commissionData', JSON.stringify(data));
          return newItem;
        }
        throw error;
      }
    },
    
    update: async (id, commission) => {
      try {
        const response = await apiClient.put(`/commission/${id}`, commission);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
        const index = data.findIndex(item => item.id == id);
        if (index !== -1) {
          data[index] = { ...data[index], ...response.data };
          localStorage.setItem('commissionData', JSON.stringify(data));
        }
        
        return response.data;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中更新
          const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
          const index = data.findIndex(item => item.id == id);
          if (index !== -1) {
            data[index] = { ...data[index], ...commission, updatedAt: new Date().toISOString() };
            localStorage.setItem('commissionData', JSON.stringify(data));
            return data[index];
          }
          throw new Error('找不到要更新的項目');
        }
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`/commission/${id}`);
        
        // 更新本地存儲
        const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
        const filteredData = data.filter(item => item.id != id);
        localStorage.setItem('commissionData', JSON.stringify(filteredData));
        
        return true;
      } catch (error) {
        if (error.isNetworkError) {
          // 在本地存儲中刪除
          const data = JSON.parse(localStorage.getItem('commissionData') || '[]');
          const filteredData = data.filter(item => item.id != id);
          localStorage.setItem('commissionData', JSON.stringify(filteredData));
          return true;
        }
        throw error;
      }
    }
  }
};

export default apiService;