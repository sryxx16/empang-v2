import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Camera,
  LogOut,
  Calendar, // <-- Ini icon baru buat Jadwal Lomba
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  // Fungsi pintar untuk mendeteksi apakah menu sedang aktif
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ========================================== */}
      {/* SIDEBAR (Hanya ditulis 1x di sini)         */}
      {/* ========================================== */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:flex flex-col print:hidden sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="Combro Admin Logo" className="h-10 w-auto" />
          <span className="font-black text-xl tracking-tighter">
            COMBRO ADMIN
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link
            to="/admin/dashboard"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/dashboard")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          {/* MENU BARU: JADWAL LOMBA */}
          <Link
            to="/admin/lomba"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/lomba")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calendar size={20} /> Jadwal Lomba
          </Link>

          <Link
            to="/admin/rekap-hybrid"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/rekap-hybrid")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Camera size={20} /> Hybrid Check-IN
          </Link>

          <Link
            to="/admin/reports"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/reports")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FileText size={20} /> Laporan Keuangan
          </Link>

          <Link
            to="/admin/settings"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/settings")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Settings size={20} /> Pengaturan Web
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-slate-400 hover:text-white font-bold transition-all p-3 mt-auto group"
        >
          <LogOut
            size={20}
            className="group-hover:text-red-500 transition-colors"
          />{" "}
          Logout
        </button>
      </aside>

      {/* ========================================== */}
      {/* MAIN CONTENT (Halaman akan muncul di sini) */}
      {/* ========================================== */}
      <div className="flex-grow flex flex-col min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
