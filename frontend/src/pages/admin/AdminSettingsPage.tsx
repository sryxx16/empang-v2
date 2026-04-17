import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Save,
  Building,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    nama_pemancingan: "",
    nomor_wa: "",
    lokasi: "",
    info_rekening: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost/api/admin/settings", {
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
      await axios.put("http://localhost/api/admin/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert("Gagal menyimpan pengaturan");
    } finally {
      setIsSaving(false);
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
                      value={settings.nama_pemancingan}
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
                        value={settings.nomor_wa}
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
                        value={settings.lokasi}
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
                      value={settings.info_rekening}
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
                  {isSaving ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
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
