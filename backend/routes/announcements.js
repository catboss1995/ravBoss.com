const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// 獲取所有公告
router.get('/', async (req, res) => {
  try {
    const { type, published } = req.query;
    let filter = {};
    
    if (type) filter.type = type;
    if (published !== undefined) filter.published = published === 'true';
    
    const announcements = await Announcement.find(filter).sort({ publishDate: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 獲取單個公告
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: '公告未找到' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 創建新公告
router.post('/', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    const savedAnnouncement = await announcement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新公告
router.put('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: '公告未找到' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除公告
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: '公告未找到' });
    }
    res.json({ message: '公告已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;