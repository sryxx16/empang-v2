import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Save,
  Building,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    nama_pemancingan: "",
    nomor_wa: "",
    lokasi: "",
    info_rekening: "",
    potret_kami: [] as string[],
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("/api/admin/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(res.data);
    } catch (err) {
      console.error("Gagal ambil settings", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.put("/api/admin/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err: any) {
      alert("Gagal menyimpan pengaturan: " + (err.response?.data?.error || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return alert("Pilih minimal 1 gambar dulu!");
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append("potret_kami_files[]", img);
      });

      await axios.post("/api/admin/settings/gallery", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });
      setImages([]);
      fetchSettings(); // Refresh data to get new images
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err: any) {
      alert("Gagal mengunggah foto: " + (err.response?.data?.error || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryDelete = async (imageUrl: string) => {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;

    try {
      await axios.delete("/api/admin/settings/gallery", {
        headers: { Authorization: `Bearer ${token}` },
        data: { image_url: imageUrl }
      });
      fetchSettings(); // Refresh data
    } catch (err: any) {
      alert("Gagal menghapus foto: " + (err.response?.data?.error || err.message));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <AdminLayout>
      <main className="flex-grow p-8 bg-slate-50 min-h-screen">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Pengaturan Web
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Kelola informasi publik yang muncul di halaman depan.
          </p>
        </header>

        <div className="max-w-3xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 space-y-6">
                {/* NAMA PEMANCINGAN */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Nama Pemancingan
                  </label>
                  <div className="relative">
                    <Building
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="text"
                      value={settings.nama_pemancingan || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          nama_pemancingan: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                      placeholder="Contoh: Pemancingan Galatama Jaya"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NOMOR WA */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      WhatsApp Admin
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                      />
                      <input
                        type="text"
                        value={settings.nomor_wa || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, nomor_wa: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                        placeholder="628123456789"
                      />
                    </div>
                  </div>

                  {/* LOKASI */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Lokasi / Alamat
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                      />
                      <input
                        type="text"
                        value={settings.lokasi || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, lokasi: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                        placeholder="Cibinong, Bogor"
                      />
                    </div>
                  </div>
                </div>

                {/* INFO REKENING */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Informasi Rekening & Pembayaran
                  </label>
                  <div className="relative">
                    <CreditCard
                      className="absolute left-4 top-4 text-slate-400"
                      size={20}
                    />
                    <textarea
                      rows={3}
                      value={settings.info_rekening || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          info_rekening: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                      placeholder="Contoh: BCA 12345678 a/n Budi Santoso"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Catatan: Info ini akan muncul saat user selesai mengisi form
                    booking.
                  </p>
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Save size={20} />{" "}
                  {isSaving ? "Menyimpan..." : "SIMPAN PENGATURAN UMUM"}
                </button>
              </div>
            </div>
          </form>

          {/* FORM GALERI POTRET KAMI */}
          <form onSubmit={handleGalleryUpload} className="mt-8 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">
                    Galeri / Potret Kami
                  </h2>
                  <p className="text-slate-500 font-bold mb-6 text-sm">
                    Kelola foto-foto fasilitas dan kemeriahan aktivitas di empang Anda.
                  </p>

                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Unggah Foto Baru (Bisa Pilih Beberapa)
                  </label>
                  <div className="relative mb-6">
                    <ImageIcon
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff4d4d] file:text-white hover:file:bg-red-600 cursor-pointer"
                    />
                  </div>
                  
                  {settings.potret_kami && settings.potret_kami.length > 0 && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Galeri Tersimpan Saat Ini ({settings.potret_kami.length} Foto)
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {settings.potret_kami.map((img, i) => (
                          <div key={i} className="group relative aspect-square bg-white rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm hover:border-[#ff4d4d] transition-all">
                            <img src={img.startsWith('http') ? img : img} alt="Potret" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleGalleryDelete(img)}
                              className="absolute top-2 right-2 bg-white/90 text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-95"
                              title="Hapus Foto Ini"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER ACTION GALERI */}
              <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading || images.length === 0}
                  className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                >
                  <UploadCloud size={20} />{" "}
                  {isUploading ? "Mengunggah..." : "TAMBAHKAN KE GALERI"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* NOTIFIKASI SUKSES (TOAST) */}
        {showToast && (
          <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
            <CheckCircle size={24} />
            <span className="font-black uppercase tracking-wide">
              Pengaturan Berhasil Disimpan!
            </span>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
