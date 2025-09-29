// 簡單的 API 測試腳本
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPIs() {
    console.log('🧪 開始測試 API 端點...\n');
    
    // 測試基本連線
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log('基本連線測試:', response.data);
    } catch (error) {
        console.log('基本連線失敗:', error.message);
        return;
    }
    
    // 測試各個 API 端點
    const endpoints = [
        'GET /api/portfolio',
        'GET /api/posts', 
        'GET /api/store'
    ];
    
    for (let endpoint of endpoints) {
        try {
            const [method, path] = endpoint.split(' ');
            const response = await axios[method.toLowerCase()](`${BASE_URL}${path}`);
            console.log(` ${endpoint}:`, response.data?.length || 'OK');
        } catch (error) {
            console.log(` ${endpoint}:`, error.response?.status || error.message);
        }
    }
}

testAPIs();