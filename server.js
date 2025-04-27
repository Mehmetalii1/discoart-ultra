const express = require('express');
const app = express();

// Route dosyalarını çağır
const memoryRoutes = require('./routes/memoryRoutes');
const sketchRoutes = require('./routes/sketchRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use(express.json());

// Ana route bağlantıları
app.use('/memory', memoryRoutes);
app.use('/sketch', sketchRoutes);
app.use('/task', taskRoutes);
app.use('/report', reportRoutes);

// Hatalı istekler için yakalama
app.use((req, res) => {
  res.status(404).send({ error: 'Endpoint bulunamadı.' });
});

// Sunucuyu başlat
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DiscoArt Ultra Server çalışıyor: http://localhost:${port}`);
});
