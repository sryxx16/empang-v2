<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lomba;

class LombaController extends Controller
{
    // 1. Mengambil semua jadwal lomba (Buat dropdown di React)
    public function index()
    {
        // Ambil data lomba dari yang paling baru
        $lombas = Lomba::latest()->get();
        return response()->json($lombas);
    }

    // 2. Bikin jadwal lomba baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_lomba' => 'required|string',
            'tanggal_lomba' => 'required|date',
            'harga_tiket' => 'required|numeric',
        ]);

        $lomba = Lomba::create([
            'nama_lomba' => $request->nama_lomba,
            'tanggal_lomba' => $request->tanggal_lomba,
            'harga_tiket' => $request->harga_tiket,
            'kuota' => 34, // Sesuai lapak lu
            'is_active' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Jadwal Lomba berhasil dibuat!',
            'data' => $lomba
        ]);
    }

    // 3. Mengambil detail 1 lomba beserta data rekapan pesertanya
    public function show($id)
    {
        // Tarik data lomba sekalian bawa data 'rekaps' dan 'bookings'
        $lomba = Lomba::with(['rekaps', 'bookings'])->findOrFail($id);

        return response()->json($lomba);
    }

public function destroy($id)
    {
        $lomba = Lomba::findOrFail($id);

        // Hapus data lomba
        $lomba->delete();

        return response()->json([
            'success' => true,
            'message' => 'Jadwal Lomba berhasil dihapus!'
        ]);
    }
}
