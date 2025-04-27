const fs = require('fs');
const path = require('path');

// Memory dosyasının yolu
const memoryPath = path.join(__dirname, '../memory/memory.json');

// Hafıza Verisini Okuma
function readMemoryFile() {
  const data = fs.readFileSync(memoryPath, 'utf8');
  return JSON.parse(data);
}

// Hafıza Verisini Yazma
function writeMemoryFile(data) {
  fs.writeFileSync(memoryPath, JSON.stringify(data, null, 2));
}

// Belirli Kullanıcının Verisini Getirme
function getMemory(userId) {
  const memory = readMemoryFile();
  return memory.kullanicilar[userId] || null;
}

// Belirli Kullanıcının Verisini Güncelleme veya Ekleme
function updateMemory(userId, newData) {
  const memory = readMemoryFile();
  memory.kullanicilar[userId] = newData;
  writeMemoryFile(memory);
}

module.exports = {
  getMemory,
  updateMemory
};
