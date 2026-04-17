<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekap extends Model
{
    use HasFactory;

    protected $fillable = [
        'lomba_id',
        'nama_peserta',
        'nomor_lapak',
        'metode_bayar',
        'harga_tiket'
    ];

    // Kabel balik ke tabel Lomba
    public function lomba()
    {
        return $this->belongsTo(Lomba::class);
    }
}
