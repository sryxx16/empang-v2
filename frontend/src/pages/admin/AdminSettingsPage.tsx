import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Save,
  Loader2,
  Trophy,
  Calendar,
  Ticket,
  Users,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    nama_lomba: "",
    tanggal_lomba: "",
    harga_tiket: 0,
    kuota_peserta: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost/api/admin/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Masukkan data dari database ke dalam form
      setFormData({
        nama_lomba: response.data.nama_lomba,
        tanggal_lomba: response.data.tanggal_lomba || "",
        harga_tiket: response.data.harga_tiket,
        kuota_peserta: response.data.kuota_peserta,
      });
    } catch (err) {
      console.error("Gagal mengambil pengaturan", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await axios.put(
        "http://localhost/api/admin/settings",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        alert(response.data.message); // Notifikasi sukses!
      }
    } catch (err) {
      console.error("Gagal menyimpan pengaturan", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "harga_tiket" || name === "kuota_peserta"
          ? Number(value)
          : value,
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="animate-spin text-[#ff4d4d]" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <main className="flex-grow p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
            <Settings className="text-[#ff4d4d]" size={32} />
            Pengaturan Lomba
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Sesuaikan informasi utama perlombaan di sini. Perubahan akan
            langsung terlihat di Landing Page.
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden max-w-3xl">
          <form onSubmit={handleSave} className="p-8 space-y-6">
            {/* Input Nama Lomba */}
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Nama Lomba
              </label>
              <div className="relative">
                <Trophy
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  name="nama_lomba"
                  value={formData.nama_lomba}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                  required
                />
              </div>
            </div>

            {/* Input Tanggal Lomba */}
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Tanggal Lomba
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="date"
                  name="tanggal_lomba"
                  value={formData.tanggal_lomba}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Harga Tiket */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                  Harga Tiket (Rp)
                </label>
                <div className="relative">
                  <Ticket
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="harga_tiket"
                    value={formData.harga_tiket}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                    required
                  />
                </div>
              </div>

              {/* Input Kuota Peserta */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                  Kuota Lapak
                </label>
                <div className="relative">
                  <Users
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="kuota_peserta"
                    value={formData.kuota_peserta}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Tombol Simpan */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                SIMPAN PENGATURAN
              </button>
            </div>
          </form>
        </div>
      </main>
    </AdminLayout>
  );
}
