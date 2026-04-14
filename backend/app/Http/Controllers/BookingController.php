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
}
