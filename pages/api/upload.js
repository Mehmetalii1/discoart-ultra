import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
};

// Cloudinary ayarları
cloudinary.config({
  cloud_name: 'dq13podrt',
  api_key: '126927757859478',
  api_secret: 'bI-eYkb7WdM1eY-aJ6aiv5iXdbE'
});

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

      return res.status(200).json({ message: 'Yükleme başarılı!', url: uploadResult.secure_url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Cloudinary yükleme hatası.' });
    }
  });
}
