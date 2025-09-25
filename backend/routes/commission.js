const express = require('express');
const router = express.Router();
const Commission = require('../models/Commission');

// 獲取所有委託請求
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    
    const commissions = await Commission.find(filter).sort({ createdAt: -1 });
    res.json(commissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 獲取單個委託請求
router.get('/:id', async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);
    if (!commission) {
      return res.status(404).json({ message: '委託請求未找到' });
    }
    res.json(commission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 創建新的委託請求
router.post('/', async (req, res) => {
  try {
    const commission = new Commission(req.body);
    const savedCommission = await commission.save();
    res.status(201).json(savedCommission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新委託狀態
router.put('/:id', async (req, res) => {
  try {
    const commission = await Commission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!commission) {
      return res.status(404).json({ message: '委託請求未找到' });
    }
    res.json(commission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除委託請求
router.delete('/:id', async (req, res) => {
  try {
    const commission = await Commission.findByIdAndDelete(req.params.id);
    if (!commission) {
      return res.status(404).json({ message: '委託請求未找到' });
    }
    res.json({ message: '委託請求已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;