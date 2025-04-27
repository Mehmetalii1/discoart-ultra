import { useState } from 'react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mesaj, setMesaj] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMesaj('Lütfen bir dosya seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setMesaj('Yükleme başarılı!');
      } else {
        setMesaj('Yükleme başarısız.');
      }
    } catch (err) {
      console.error(err);
      setMesaj('Sunucu hatası.');
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#6A0DAD" }}>Yeni Resim Yükle</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: "20px" }} />
      <button onClick={handleUpload}>Yükle</button>
      {mesaj && <p style={{ marginTop: "20px", color: "lightgreen" }}>{mesaj}</p>}
    </div>
  );
}
