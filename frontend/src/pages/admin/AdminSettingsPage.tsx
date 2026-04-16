import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Save,
  Loader2,
  Phone,
  CreditCard,
  AlignLeft,
  Building,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    nama_pemancingan: "",
    nomor_wa: "",
    info_rekening: "",
    peraturan_empang: "",
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
      setFormData({
        nama_pemancingan: response.data.nama_pemancingan || "",
        nomor_wa: response.data.nomor_wa || "",
        info_rekening: response.data.info_rekening || "",
        peraturan_empang: response.data.peraturan_empang || "",
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
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Gagal menyimpan pengaturan", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            Pengaturan Website
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Sesuaikan informasi utama, kontak WhatsApp, dan peraturan empang
            untuk Landing Page.
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl">
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Pemancingan */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                  Nama Pemancingan
                </label>
                <div className="relative">
                  <Building
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="nama_pemancingan"
                    value={formData.nama_pemancingan}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                    required
                  />
                </div>
              </div>

              {/* Nomor WA */}
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                  Nomor WhatsApp Admin (Awal 62)
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="nomor_wa"
                    value={formData.nomor_wa}
                    onChange={handleChange}
                    placeholder="6281234567890"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Info Rekening */}
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Info Rekening / Dana
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  name="info_rekening"
                  value={formData.info_rekening}
                  onChange={handleChange}
                  placeholder="BCA 1234567 a.n Udin"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                />
              </div>
            </div>

            {/* Peraturan Empang */}
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Peraturan & Tata Tertib Empang
              </label>
              <div className="relative">
                <AlignLeft
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <textarea
                  name="peraturan_empang"
                  value={formData.peraturan_empang}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                ></textarea>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-95 disabled:bg-slate-400"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                SIMPAN PENGATURAN WEB
              </button>
            </div>
          </form>
        </div>
      </main>
    </AdminLayout>
  );
}
