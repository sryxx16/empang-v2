<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rekap;
use App\Models\Lomba;

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

        // Ambil harga tiket dari tabel lombas
        $lomba = Lomba::findOrFail($request->lomba_id);

        $rekap = Rekap::create([
            'lomba_id' => $request->lomba_id,
            'nama_peserta' => $request->nama_peserta,
            'metode_bayar' => $request->metode_bayar,
            'harga_tiket' => $lomba->harga_tiket,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran berhasil dicatat!',
            'data' => $rekap
        ]);
    }

    public function destroy($id)
{
    $rekap = Rekap::find($id);
    if (!$rekap) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }

    $rekap->delete();
    return response()->json(['success' => true, 'message' => 'Data berhasil dihapus']);
}
}
