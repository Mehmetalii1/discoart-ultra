const express = require('express');
const { getMemory, updateMemory } = require('../services/memoryService');

const router = express.Router();

// Kullanıcının hafıza verisini getirme
router.get('/memory/:userId', (req, res) => {
  const userId = req.params.userId;
  const memoryData = getMemory(userId);

  if (memoryData) {
    res.json(memoryData);
  } else {
    res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
  }
});

// Kullanıcının hafıza verisini güncelleme
router.post('/memory/:userId', (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;

  updateMemory(userId, newData);
  res.json({ message: 'Hafıza verisi güncellendi.' });
});

module.exports = router;
