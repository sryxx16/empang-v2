<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lomba extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lomba',
        'tanggal_lomba',
        'harga_tiket',
        'kuota',
        'is_active'
    ];

    // Kabel ke Data Rekap Kasir (Hasil Hari H)
    public function rekaps()
    {
        return $this->hasMany(Rekap::class);
    }

    // Kabel ke Data Pendaftaran Web (Pra-Lomba)
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
