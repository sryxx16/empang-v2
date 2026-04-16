<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rekap;

class RekapController extends Controller
{
    // Mengambil data kasir berdasarkan ID Lomba
    public function getByLomba($lomba_id)
    {
        $rekaps = Rekap::where('lomba_id', $lomba_id)->latest()->get();
        return response()->json($rekaps);
    }

    // Menyimpan peserta yang baru lunas (dari hasil scan OCR)
    public function store(Request $request)
    {
        $request->validate([
            'lomba_id' => 'required|exists:lombas,id',
            'nama_peserta' => 'required|string',
            'metode_bayar' => 'required|in:tunai,transfer',
        ]);

        $rekap = Rekap::create([
            'lomba_id' => $request->lomba_id,
            'nama_peserta' => $request->nama_peserta,
            'metode_bayar' => $request->metode_bayar,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran berhasil dicatat!',
            'data' => $rekap
        ]);
    }
}
