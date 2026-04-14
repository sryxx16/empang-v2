<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    // Mengizinkan kolom-kolom ini diisi secara massal dari React
    protected $fillable = [
        'nama_peserta',
        'tanggal_lomba',
        'nomor_lapak',
        'status_pembayaran',
    ];
}
