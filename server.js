const express = require('express');
const routes = require('./routes/memoryRoutes');  // Buradaki yolu doğru yazdığından emin ol.

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);  // Rotaların doğru şekilde dahil edildiği satır.

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
