import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  CheckCircle,
  Clock,
  Search,
  LayoutDashboard,
} from "lucide-react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil token dari localStorage
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    // PROTEKSI: Kalau tidak ada token, tendang balik ke login
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Kita panggil API Laravel (Nanti kita buat route index-nya)
      const response = await axios.get("http://localhost/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (err) {
      console.error("Gagal ambil data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Sederhana */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-[#ff4d4d] rounded-lg"></div>
          <span className="font-black text-xl tracking-tighter">
            COMBRO ADMIN
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          <button className="w-full flex items-center gap-3 bg-[#ff4d4d] p-3 rounded-xl font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-slate-400 hover:text-white font-bold transition-all p-3"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            MANAJEMEN BOOKING
          </h1>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 flex items-center gap-2">
            <Users size={18} /> Total: {bookings.length} Peserta
          </div>
        </header>

        {/* Tabel Kustom */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">
                  Nama Peserta
                </th>
                <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">
                  Tanggal Lomba
                </th>
                <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">
                  Status
                </th>
                <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center font-bold text-slate-400"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center font-bold text-slate-400"
                  >
                    Belum ada pendaftar.
                  </td>
                </tr>
              ) : (
                bookings.map((b: any) => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-5 font-bold text-slate-700">
                      {b.nama_peserta}
                    </td>
                    <td className="p-5 text-slate-500 font-medium">
                      {b.tanggal_lomba}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide border ${
                          b.status === "verified"
                            ? "bg-green-50 text-green-600 border-green-100"
                            : "bg-yellow-50 text-yellow-600 border-yellow-100"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <button className="text-sm font-black text-[#ff4d4d] hover:underline">
                        VERIFIKASI
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
