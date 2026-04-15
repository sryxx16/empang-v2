<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi: Pastikan React mengirim data yang lengkap
        $validatedData = $request->validate([
            'nama_peserta' => 'required|string|max:255',
            'tanggal_lomba' => 'required|date',
            'nomor_lapak' => 'required|string',
        ]);

        // 2. Simpan ke Database (status_pembayaran otomatis 'pending' sesuai migration)
        $booking = Booking::create($validatedData);

        // 3. Beri jawaban (Response) ke React bahwa proses sukses
        return response()->json([
            'message' => 'Booking berhasil dibuat! Silakan lanjutkan pembayaran.',
            'data' => $booking
        ], 201);
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
}