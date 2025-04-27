import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin var.' });
  }

  const { kullaniciAdi, sifre } = req.body;

  if (!kullaniciAdi || !sifre) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir.' });
  }

  const dosyaYolu = join(process.cwd(), 'data', 'memory.json');
  const jsonData = readFileSync(dosyaYolu);
  const data = JSON.parse(jsonData);

  const user = Object.values(data.kullanicilar).find(u => u.profil.kullaniciAdi === kullaniciAdi);

  if (!user) {
    return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
  }

  const sifreDogruMu = bcrypt.compareSync(sifre, user.profil.sifre);

  if (!sifreDogruMu) {
    return res.status(401).json({ error: 'Şifre yanlış.' });
  }

  res.status(200).json({ message: 'Giriş başarılı!' });
}
