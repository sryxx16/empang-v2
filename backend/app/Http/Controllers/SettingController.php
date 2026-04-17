<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        // Ambil data pertama, kalau nggak ada buat baru yang kosong
        return response()->json(Setting::firstOrCreate([], [
            'nama_pemancingan' => 'Nama Empang Lu',
            'nomor_wa' => '08123456789',
            'lokasi' => 'Alamat Empang',
            'info_rekening' => 'Bank Mandiri 123456789 a/n Nama Lu'
        ]));
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_pemancingan' => 'required|string',
            'nomor_wa' => 'required|string',
            'lokasi' => 'required|string',
            'info_rekening' => 'required|string',
        ]);

        $setting = Setting::first();
        $setting->update($request->all());

        return response()->json(['message' => 'Pengaturan berhasil disimpan!', 'data' => $setting]);
    }
}
