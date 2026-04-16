<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::firstOrCreate(
            ['id' => 1],
            [
                'nama_pemancingan' => 'Pemancingan Combro',
                'nomor_wa' => '6281234567890',
                'info_rekening' => 'BCA 123456789 a.n Udin',
                'peraturan_empang' => "1. Dilarang pakai umpan hidup\n2. Dilarang mabuk\n3. Keputusan panitia mutlak"
            ]
        );

        return response()->json($setting);
    }

    public function update(Request $request)
    {
        $setting = Setting::find(1);

        $setting->update([
            'nama_pemancingan' => $request->nama_pemancingan,
            'nomor_wa' => $request->nomor_wa,
            'info_rekening' => $request->info_rekening,
            'peraturan_empang' => $request->peraturan_empang,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan Web berhasil diperbarui!'
        ]);
    }
}
