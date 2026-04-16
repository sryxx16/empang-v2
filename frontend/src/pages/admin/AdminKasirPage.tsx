import React, { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Upload, CheckCircle, Loader2, Calendar } from "lucide-react";
import Tesseract from "tesseract.js";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminKasirPage() {
  const [lombas, setLombas] = useState<any[]>([]);
  const [selectedLombaId, setSelectedLombaId] = useState<string>("");
  const [rekaps, setRekaps] = useState<any[]>([]);

  // State untuk OCR
  const [image, setImage] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedNames, setScannedNames] = useState<string[]>([]);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchLombas();
  }, []);

  useEffect(() => {
    if (selectedLombaId) fetchRekaps();
  }, [selectedLombaId]);

  const fetchLombas = async () => {
    try {
      const res = await axios.get("http://localhost/api/admin/lombas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLombas(res.data);
      if (res.data.length > 0) setSelectedLombaId(res.data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRekaps = async () => {
    try {
      const res = await axios.get(
        `http://localhost/api/admin/rekaps/${selectedLombaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRekaps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // FUNGSI OCR CLOUD (Pakai OCR.space)
  const handleScanImage = async () => {
    if (!image) return alert("Pilih foto buku dulu, Bang!");

    setIsScanning(true);

    // Siapkan data gambar untuk dikirim ke API
    const formData = new FormData();
    formData.append("file", image);
    formData.append("language", "eng"); // Pakai 'eng' biasanya lebih akurat buat baca huruf kapital
    formData.append("isOverlayRequired", "false");
    formData.append("OCREngine", "2"); // Engine 2 lebih bagus buat tulisan yang kurang jelas

    try {
      const response = await axios.post(
        "https://api.ocr.space/parse/image",
        formData,
        {
          headers: {
            apikey: "K87463542988957", // <--- GANTI PAKAI API KEY DARI EMAIL!
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const result = response.data;

      // Cek apakah API berhasil baca
      if (result.IsErroredOnProcessing) {
        alert("Waduh, server API-nya gagal proses foto lu Bang.");
        return;
      }

      // Teks mentah dari Cloud
      const rawText = result.ParsedResults[0].ParsedText;

      // Logika "Pembersih Teks" yang sama kayak tadi
      const namesArray = rawText
        .split("\n")
        .map((name: string) =>
          name
            .replace(/^[0-9\.\-\s]+/, "")
            .replace(/[^a-zA-Z\s]/g, "")
            .trim(),
        )
        .filter((name: string) => name.length > 2);

      setScannedNames(namesArray);

      if (namesArray.length === 0) {
        alert(
          "Gambarnya kurang terang atau tulisannya terlalu dokter nih Bang!",
        );
      }
    } catch (error) {
      console.error("Gagal nge-scan:", error);
      alert("Terjadi kesalahan saat memanggil API OCR.");
    } finally {
      setIsScanning(false);
    }
  };

  // Fungsi saat tombol Kasir diklik
  const handleBayar = async (nama: string, metode: string) => {
    try {
      await axios.post(
        "http://localhost/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: nama,
          metode_bayar: metode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Hapus dari daftar scan, masukkan ke daftar lunas
      setScannedNames(scannedNames.filter((n) => n !== nama));
      fetchRekaps();
    } catch (err) {
      console.error(err);
      alert("Gagal mencatat pembayaran");
    }
  };

  return (
    <AdminLayout>
      <main className="flex-grow p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
            <Camera className="text-[#ff4d4d]" size={32} /> Kasir & Scan OCR
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Upload foto buku catatan pendaftaran offline, sistem akan mendeteksi
            nama secara otomatis.
          </p>
        </header>

        {/* Pilih Sesi Lomba */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
            Sesi Lomba Aktif
          </label>
          <div className="relative w-full max-w-md">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <select
              value={selectedLombaId}
              onChange={(e) => setSelectedLombaId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
            >
              {lombas.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.tanggal_lomba} — {l.nama_lomba}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BAGIAN KIRI: UPLOAD OCR */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-black mb-4 uppercase text-slate-800 border-b pb-2">
              1. Upload Buku
            </h2>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center mb-4 bg-slate-50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </div>

            <button
              onClick={handleScanImage}
              disabled={isScanning || !image}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-black flex justify-center items-center gap-2 shadow-lg disabled:bg-slate-400"
            >
              {isScanning ? <Loader2 className="animate-spin" /> : <Upload />}
              {isScanning ? "MEMBACA GAMBAR..." : "SCAN SEKARANG"}
            </button>

            {/* Hasil Scan Draft */}
            {scannedNames.length > 0 && (
              <div className="mt-8">
                <h3 className="font-black text-sm text-slate-400 uppercase tracking-widest mb-3">
                  Hasil Baca Sistem:
                </h3>
                <ul className="space-y-3">
                  {scannedNames.map((nama, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-3 rounded-xl"
                    >
                      <span className="font-bold text-slate-800">{nama}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBayar(nama, "tunai")}
                          className="bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-green-600"
                        >
                          TUNAI
                        </button>
                        <button
                          onClick={() => handleBayar(nama, "transfer")}
                          className="bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-600"
                        >
                          TF
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: REKAP LUNAS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-black mb-4 uppercase text-green-700 border-b pb-2 flex items-center gap-2">
              <CheckCircle size={24} /> Data Lunas (Final)
            </h2>

            {rekaps.length === 0 ? (
              <p className="text-center font-bold text-slate-400 py-10">
                Belum ada data kasir.
              </p>
            ) : (
              <ul className="space-y-3">
                {rekaps.map((r: any) => (
                  <li
                    key={r.id}
                    className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-xl"
                  >
                    <span className="font-black text-slate-800">
                      {r.nama_peserta}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        r.metode_bayar === "tunai"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {r.metode_bayar}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
