<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekap extends Model
{
    use HasFactory;

    // Ini yang bikin Laravel ngizinin semua data masuk
    protected $fillable = [
        'lomba_id',
        'nama_peserta',
        'nomor_lapak',
        'no_wa',
        'harga_tiket',
        'nominal_bayar',
        'metode_bayar',
        'status_bayar'
    ];

    // Kabel balik ke tabel Lomba
    public function lomba()
    {
        return $this->belongsTo(Lomba::class);
    }
}
