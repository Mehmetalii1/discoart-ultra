import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

// Cloudinary Ayarları
cloudinary.config({
  cloud_name: 'dq13podrt',
  api_key: '126927757859478',
  api_secret: 'bI-eYkb7WdM1eY-aJ6aiv5iXdbE'
});

// Rastgele skor üreten yardımcı fonksiyon
function generateScores() {
  return {
    anatomi: Math.floor(Math.random() * 41) + 60, // 60-100 arası
    perspektif: Math.floor(Math.random() * 41) + 60,
    renkKullanimi: Math.floor(Math.random() * 41) + 60,
    kompozisyon: Math.floor(Math.random() * 41) + 60,
    isikGolgeleme: Math.floor(Math.random() * 41) + 60,
    ifadeAtmosfer: Math.floor(Math.random() * 41) + 60,
    cizgiKalitesi: Math.floor(Math.random() * 41) + 60,
    yaraticilik: Math.floor(Math.random() * 41) + 60,
    detaylandirma: Math.floor(Math.random() * 41) + 60
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin var.' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Dosya işleme hatası.' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'Dosya bulunamadı.' });
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(file.filepath, {
        folder: 'discoart-ultra'
      });

      // Kullanıcının memory.json'a kaydı
      const memoryPath = join(process.cwd(), 'data', 'memory.json');
      const memoryData = JSON.parse(fs.readFileSync(memoryPath, 'utf-8'));

      const userId = 'testUserId'; // Şu an tek kullanıcı var

      if (!memoryData.kullanicilar[userId]) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
      }

      const newEntry = {
        url: uploadResult.secure_url,
        yuklemeTarihi: new Date().toISOString(),
        skorlar: generateScores()
      };

      memoryData.kullanicilar[userId].resimler = memoryData.kullanicilar[userId].resimler || [];
      memoryData.kullanicilar[userId].resimler.push(newEntry);

      fs.writeFileSync(memoryPath, JSON.stringify(memoryData, null, 2));

      return res.status(200).json({ message: 'Yükleme ve skor kaydı başarılı!', url: uploadResult.secure_url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Cloudinary veya kayıt hatası.' });
    }
  });
}
