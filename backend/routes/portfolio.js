const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// 模擬作品資料
const mockPortfolios = [
  {
    _id: '1',
    title: '奇幻風景插圖',
    description: '充滿神秘感的奇幻世界風景畫',
    category: 'illustration',
    images: ['/images/portfolio/fantasy-scene.jpg'],
    featured: true,
    createdAt: new Date()
  },
  {
    _id: '2', 
    title: '角色設計稿',
    description: '遊戲角色概念設計',
    category: 'character',
    images: ['/images/portfolio/character-design.jpg'],
    featured: false,
    createdAt: new Date()
  }
];

// 獲取所有作品集項目
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    
    // 嘗試從資料庫獲取
    const portfolios = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    console.log('使用模擬作品資料');
    // 資料庫失敗時使用模擬資料
    let filteredData = mockPortfolios;
    if (req.query.category) {
      filteredData = filteredData.filter(item => item.category === req.query.category);
    }
    if (req.query.featured) {
      filteredData = filteredData.filter(item => item.featured === (req.query.featured === 'true'));
    }
    res.json(filteredData);
  }
});

// 獲取單個作品集項目
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: '作品集項目未找到' });
    }
    res.json(portfolio);
  } catch (error) {
    console.log('📝 使用模擬單一作品資料');
    // 資料庫失敗時使用模擬資料
    const mockItem = mockPortfolios.find(item => item._id === req.params.id);
    if (mockItem) {
      res.json(mockItem);
    } else {
      res.status(404).json({ message: '作品集項目未找到' });
    }
  }
});

// 創建新的作品集項目
router.post('/', async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    const savedPortfolio = await portfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新作品集項目
router.put('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: '作品集項目未找到' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除作品集項目
router.delete('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: '作品集項目未找到' });
    }
    res.json({ message: '作品集項目已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;