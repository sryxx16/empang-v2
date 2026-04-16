import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Camera,
  LogOut,
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
          <div className="w-8 h-8 bg-[#ff4d4d] rounded-lg shadow-lg shadow-red-500/20"></div>
          <span className="font-black text-xl tracking-tighter">
            COMBRO ADMIN
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link
            to="/admin/dashboard"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/dashboard")
                ? "bg-[#ff4d4d] text-white shadow-lg shadow-red-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link
            to="/admin/reports"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/reports")
                ? "bg-[#ff4d4d] text-white shadow-lg shadow-red-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FileText size={20} /> Laporan Keuangan
          </Link>

          <Link
            to="/admin/settings"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              isActive("/admin/settings")
                ? "bg-[#ff4d4d] text-white shadow-lg shadow-red-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Settings size={20} /> Pengaturan Lomba
          </Link>
          <Link
            to="/admin/kasir"
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${isActive("/admin/kasir") ? "bg-[#ff4d4d] text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            <Camera size={20} /> Scan & Kasir
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
