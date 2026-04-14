import React from "react";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            COMBRO
          </span>
        </div>

        {/* Center Menu */}
        <div className="hidden lg:flex items-center gap-8 font-bold text-[15px] text-slate-600">
          <a
            href="#tentang-kami"
            className="hover:text-slate-900 transition-colors"
          >
            Tentang Kami
          </a>
          <a
            href="#fasilitas"
            className="hover:text-slate-900 transition-colors"
          >
            Fasilitas
          </a>
          <a href="#booking" className="hover:text-slate-900 transition-colors">
            Jadwal Lomba
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="bg-[#ff4d4d] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e64444] transition-all shadow-md">
            Mulai Booking
          </button>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
      {/* Garis Merah Tipis di bawah Navbar sesuai referensi */}
      <div className="h-[1px] bg-red-100 w-full opacity-50"></div>
    </nav>
  );
}
