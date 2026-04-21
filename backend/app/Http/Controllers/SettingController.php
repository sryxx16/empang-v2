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
        try {
            $request->validate([
                'nama_pemancingan' => 'required|string',
                'nomor_wa' => 'required|string',
                'lokasi' => 'required|string',
                'info_rekening' => 'required|string',
            ]);

            $setting = Setting::first();
            $data = $request->only(['nama_pemancingan', 'nomor_wa', 'lokasi', 'info_rekening', 'peraturan_empang']);
            $setting->update($data);

            return response()->json(['message' => 'Pengaturan berhasil disimpan!', 'data' => $setting]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
        }
    }

    public function uploadGallery(Request $request)
    {
        try {
            $request->validate([
                'potret_kami_files.*' => 'image|mimes:jpeg,png,jpg,gif|max:5000'
            ]);

            $setting = Setting::first();
            $existingImages = is_array($setting->potret_kami) ? $setting->potret_kami : [];

            if ($request->hasFile('potret_kami_files')) {
                foreach ($request->file('potret_kami_files') as $file) {
                    $path = $file->store('potret', 'public');
                    $existingImages[] = '/storage/' . $path;
                }
                $setting->update(['potret_kami' => $existingImages]);
            }

            return response()->json(['message' => 'Foto berhasil diunggah!', 'data' => $setting]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteGalleryItem(Request $request)
    {
        try {
            $request->validate([
                'image_url' => 'required|string'
            ]);

            $setting = Setting::first();
            $existingImages = is_array($setting->potret_kami) ? $setting->potret_kami : [];
            
            $newImages = array_values(array_filter($existingImages, function($img) use ($request) {
                return $img !== $request->image_url;
            }));

            $setting->update(['potret_kami' => $newImages]);
            
            return response()->json(['message' => 'Foto berhasil dihapus!', 'data' => $setting]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
