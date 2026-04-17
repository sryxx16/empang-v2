<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lomba;
use App\Models\Booking;
use App\Models\Setting;

class PublicController extends Controller
{
    // 1. Mengambil Jadwal Lomba Aktif + Live Slot + Info Empang
    public function getHomeData()
    {
        $settings = Setting::first();

        $lombas = Lomba::where('is_active', true)
            ->whereDate('tanggal_lomba', '>=', now())
            ->orderBy('tanggal_lomba', 'asc')
            ->get()
            ->map(function ($lomba) {

                // REVISI: Cuma ngitung dari pendaftar Web aja (yang belum dibatalkan/ditolak)
                // Jadi laporan Kasir (Rekap) gak bakal ganggu sisa slot di depan!
                $terisi = $lomba->bookings()->whereIn('status', ['pending', 'verified'])->count();

                // Pastikan sisa slot gak minus
                $sisa = max(0, $lomba->kuota - $terisi);

                return [
                    'id' => $lomba->id,
                    'nama_lomba' => $lomba->nama_lomba,
                    'tanggal_lomba' => $lomba->tanggal_lomba,
                    'harga_tiket' => $lomba->harga_tiket,
                    'kuota' => $lomba->kuota,
                    'terisi' => $terisi,
                    'sisa' => $sisa,
                ];
            });

        return response()->json([
            'settings' => $settings,
            'lombas' => $lombas
        ]);
    }
    // 2. Menerima Pendaftaran dari Web (Masuk sebagai Pending)
    public function storeBooking(Request $request)
    {
        $request->validate([
            'lomba_id' => 'required|exists:lombas,id',
            'nama_peserta' => 'required|string',
            'no_wa' => 'required|string' // Sesuai dengan database awal lu
        ]);

        $booking = Booking::create([
            'lomba_id' => $request->lomba_id,
            'nama_peserta' => $request->nama_peserta,
            'no_wa' => $request->no_wa,
            'status' => 'pending'
        ]);

        // Bikin Kode Booking simpel (Misal: CMBR-007)
        $kode_booking = 'CMBR-' . str_pad($booking->id, 3, '0', STR_PAD_LEFT);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil disimpan!',
            'kode_booking' => $kode_booking
        ]);
    }
}
