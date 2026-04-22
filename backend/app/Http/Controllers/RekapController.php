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

    // Menyimpan data rekap baru (Lunas & Hutang)
    public function store(Request $request)
    {
        // 1. Ambil harga tiket asli dari database lomba
        $lomba = Lomba::findOrFail($request->lomba_id);
        $harga_tiket = $lomba->harga_tiket;

        // 2. Simpan data (Otomatis ngatur hutang atau lunas)
        $rekap = Rekap::create([
            'lomba_id' => $request->lomba_id,
            'nama_peserta' => $request->nama_peserta,
            'no_wa' => $request->no_wa ?? '-',
            'harga_tiket' => $harga_tiket,
            'nominal_bayar' => $request->nominal_bayar ?? $harga_tiket,
            'metode_bayar' => $request->metode_bayar,
            'status_bayar' => $request->status_bayar ?? 'lunas',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran berhasil dicatat!',
            'data' => $rekap
        ]);
    }

    // Memperbarui data (misal: pelunasan hutang)
    public function update(Request $request, $id)
    {
        $rekap = Rekap::find($id);
        if (!$rekap) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $rekap->update([
            'nominal_bayar' => $request->nominal_bayar ?? $rekap->nominal_bayar,
            'metode_bayar' => $request->metode_bayar ?? $rekap->metode_bayar,
            'status_bayar' => $request->status_bayar ?? $rekap->status_bayar,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil diperbarui!',
            'data' => $rekap
        ]);
    }

    // Menghapus data
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
