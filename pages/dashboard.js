import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // İleride burada login kontrolü yapacağız!
    // Şu anlık serbest erişim
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  const handleUpload = () => {
    router.push('/upload');
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#6A0DAD" }}>DiscoArt Ultra Dashboard</h1>
      <p style={{ marginBottom: "30px" }}>Başarıyla giriş yaptınız!</p>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <button onClick={handleUpload}>Yeni Resim Yükle</button>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </div>
  );
}
