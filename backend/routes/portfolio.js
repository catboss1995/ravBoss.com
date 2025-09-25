const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// 獲取所有作品集項目
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    
    const portfolios = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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