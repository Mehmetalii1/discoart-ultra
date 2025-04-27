 const fs = require('fs');
const path = require('path');

const memoryFilePath = path.join(__dirname, '../memory/memory.json');

// Kullanıcının hafıza verisini okuma
function getMemory(userId) {
  try {
    const data = fs.readFileSync(memoryFilePath, 'utf-8');
    const json = JSON.parse(data);
    return json.kullanicilar[userId] || null;
  } catch (error) {
    console.error('Hafıza okuma hatası:', error);
    return null;
  }
}

// Kullanıcının hafıza verisini güncelleme
function updateMemory(userId, newData) {
  try {
    const data = fs.readFileSync(memoryFilePath, 'utf-8');
    const json = JSON.parse(data);
    json.kullanicilar[userId] = newData;
    fs.writeFileSync(memoryFilePath, JSON.stringify(json, null, 2));
  } catch (error) {
    console.error('Hafıza yazma hatası:', error);
  }
}

module.exports = {
  getMemory,
  updateMemory
};
