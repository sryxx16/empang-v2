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
import AdminLayout from "../../components/admin/AdminLayout";

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
      // Kita panggil API Laravel
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

  const handleVerify = async (id: number) => {
    // Tampilkan konfirmasi biar admin gak salah pencet
    if (!window.confirm("Yakin ingin verifikasi tiket ini?")) return;

    try {
      // Tembak API Laravel untuk ubah status
      const response = await axios.put(
        `http://localhost/api/admin/bookings/${id}/verify`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        // Update data di tabel React secara langsung tanpa perlu refresh halaman
        setBookings(
          bookings.map((b: any) =>
            b.id === id ? { ...b, status: "verified" } : b,
          ),
        );

        // Munculkan notifikasi sukses
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Gagal verifikasi", err);
      alert("Terjadi kesalahan saat memverifikasi data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 flex">
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
                  bookings.map((b: any) => {
                    // LOGIKA PENGAMAN: Paksa jadi huruf kecil, kalau kosong paksa jadi 'pending'
                    const statusText = (b.status || "pending").toLowerCase();

                    return (
                      <tr
                        key={b.id || Math.random()}
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
                              statusText === "verified"
                                ? "bg-green-50 text-green-600 border-green-100"
                                : "bg-yellow-50 text-yellow-600 border-yellow-100"
                            }`}
                          >
                            {statusText}
                          </span>
                        </td>
                        <td className="p-5">
                          {/* Pengecekan menggunakan variabel yang sudah aman */}
                          {statusText === "pending" ? (
                            <button
                              onClick={() => handleVerify(b.id)}
                              className="text-sm font-black text-[#ff4d4d] hover:text-[#e64444] transition-colors flex items-center gap-1 group"
                            >
                              <CheckCircle
                                size={16}
                                className="group-hover:scale-110 transition-transform"
                              />
                              VERIFIKASI
                            </button>
                          ) : (
                            <span className="text-sm font-bold text-slate-300 flex items-center gap-1">
                              <CheckCircle size={16} /> LUNAS
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
