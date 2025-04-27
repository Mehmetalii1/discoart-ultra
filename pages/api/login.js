import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin var.' });
  }

  const { kullaniciAdi, sifre } = req.body;

  if (!kullaniciAdi || !sifre) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir.' });
  }

  const dosyaYolu = join(process.cwd(), 'data', 'memory.json');
  const jsonData = readFileSync(dosyaYolu, 'utf-8');
  const data = JSON.parse(jsonData);

  const user = Object.values(data.kullanicilar).find(u => u.profil.kullaniciAdi === kullaniciAdi);

  if (!user) {
    return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
  }

  if (user.profil.sifre !== sifre) {
    return res.status(401).json({ error: 'Şifre yanlış.' });
  }

  res.status(200).json({ message: 'Giriş başarılı!' });
}
