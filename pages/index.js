import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [mesaj, setMesaj] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMesaj('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kullaniciAdi, sifre }),
        credentials: 'include'
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setMesaj(data.error || 'Giriş başarısız.');
      }
    } catch (err) {
      console.error(err);
      setMesaj('Sunucu hatası.');
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "30px", color: "#6A0DAD" }}>DiscoArt Ultra</h1>
      <form onSubmit={handleLogin} style={{ width: "300px", display: "flex", flexDirection: "column" }}>
        <input type="text" placeholder="Kullanıcı Adı" value={kullaniciAdi} onChange={(e) => setKullaniciAdi(e.target.value)} required />
        <input type="password" placeholder="Şifre" value={sifre} onChange={(e) => setSifre(e.target.value)} required />
        <button type="submit">Giriş Yap</button>
      </form>
      {mesaj && <p style={{ marginTop: "20px", color: "red" }}>{mesaj}</p>}
    </div>
  );
}
