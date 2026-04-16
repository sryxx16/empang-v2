<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    // Mengambil data pengaturan
    public function index()
    {
        // Karena lombanya cuma 1, kita ambil baris pertama di database.
        // Kalau tabelnya masih kosong, otomatis buat data default.
        $setting = Setting::firstOrCreate(
            ['id' => 1],
            [
                'nama_lomba' => 'Lomba Mancing Combro Akbar',
                'tanggal_lomba' => '2026-05-01',
                'harga_tiket' => 100000,
                'kuota_peserta' => 50
            ]
        );

        return response()->json($setting);
    }

    // Menyimpan perubahan dari React
    public function update(Request $request)
    {
        $setting = Setting::find(1); // Selalu ambil ID 1

        $setting->update([
            'nama_lomba' => $request->nama_lomba,
            'tanggal_lomba' => $request->tanggal_lomba,
            'harga_tiket' => $request->harga_tiket,
            'kuota_peserta' => $request->kuota_peserta,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan lomba berhasil diperbarui!'
        ]);
    }
}
