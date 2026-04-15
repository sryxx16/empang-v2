import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
            COMBRO
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-bold text-[15px] text-slate-600">
          <Link to="/" className="hover:text-slate-900">
            Beranda
          </Link>
          <Link to="/status" className="hover:text-slate-900">
            Cek Status
          </Link>
          <a href="/#tentang-kami" className="hover:text-slate-900">
            Tentang Kami
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="bg-[#ff4d4d] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e64444] transition-all shadow-md"
          >
            Mulai Booking
          </Link>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}
