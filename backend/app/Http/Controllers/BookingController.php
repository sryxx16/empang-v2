<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
   public function store(Request $request)
    {
        $request->validate([
            'nama_peserta' => 'required',
            'tanggal_lomba' => 'required',
        ]);

        $booking = new \App\Models\Booking();
        $booking->nama_peserta = $request->nama_peserta;
        $booking->tanggal_lomba = $request->tanggal_lomba;

        // ----------------------------------------------------
        // TAMBAHKAN BARIS INI AGAR STATUSNYA TIDAK KOSONG
        $booking->status = 'pending';
        // ----------------------------------------------------

        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil disimpan!'
        ]);
    }

    public function checkStatus($nama)
{
    // Mencari data berdasarkan nama_peserta (menggunakan 'like' agar pencarian lebih fleksibel)
    $booking = \App\Models\Booking::where('nama_peserta', 'like', '%' . $nama . '%')
                ->latest() // Ambil yang paling baru didaftarkan
                ->first();

    if (!$booking) {
        return response()->json([
            'success' => false,
            'message' => 'Data tidak ditemukan. Pastikan nama sesuai saat mendaftar.'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => [
            'nama' => $booking->nama_peserta,
            'tanggal' => $booking->tanggal_lomba,
            'status' => $booking->status, // Defaultnya 'pending'
            'dibuat_pada' => $booking->created_at->format('d M Y H:i')
        ]
    ]);
}

public function index()
    {
        // Ambil semua data pendaftaran dari yang paling baru
        $bookings = \App\Models\Booking::latest()->get();

        // Langsung kembalikan dalam format JSON
        return response()->json($bookings);
    }

    // 2. Mengubah status pendaftar menjadi 'verified'
    public function verifyBooking($id)
    {
        $booking = \App\Models\Booking::find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Data tiket tidak ditemukan.'
            ], 404);
        }

        // Ubah statusnya
        $booking->status = 'verified';
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Tiket atas nama ' . $booking->nama_peserta . ' berhasil diverifikasi!'
        ]);
    }

    // 3. Mengambil data khusus Laporan Keuangan & Peserta
    public function report()
    {
        // Asumsi harga tiket (bisa diubah sesuai kebutuhan)
        $hargaTiket = 100000;

        // Hitung statistik
        $totalPendaftar = \App\Models\Booking::count();
        $pesertaLunas = \App\Models\Booking::where('status', 'verified')->count();
        $pesertaPending = \App\Models\Booking::where('status', 'pending')->count();

        // Hitung pendapatan (hanya dari yang sudah lunas)
        $totalPendapatan = $pesertaLunas * $hargaTiket;

        // Ambil daftar nama yang sudah lunas saja untuk dicetak
        $daftarLunas = \App\Models\Booking::where('status', 'verified')->latest()->get();

        return response()->json([
            'statistik' => [
                'total_pendaftar' => $totalPendaftar,
                'lunas' => $pesertaLunas,
                'pending' => $pesertaPending,
                'pendapatan' => $totalPendapatan
            ],
            'peserta' => $daftarLunas
        ]);
    }

    public function destroy($id)
{
    $booking = Booking::findOrFail($id);
    $booking->delete();

    return response()->json([
        'success' => true,
        'message' => 'Peserta berhasil dihapus, slot kembali tersedia'
    ]);
}
}
