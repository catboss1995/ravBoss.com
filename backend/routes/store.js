const express = require('express');
const router = express.Router();

// 商店相關路由 - 基本結構
router.get('/', (req, res) => {
  res.json({ message: '商店 API - 待實施' });
});

module.exports = router;