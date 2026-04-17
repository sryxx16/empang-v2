<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // INI YANG PALING PENTING BANG! Buka gembok kolomnya.
    protected $fillable = [
        'lomba_id',
        'nama_peserta',
        'no_wa', // Pastikan nama kolom ini sama persis sama yang di database lu
        'nomor_lapak',
        'status'
    ];

    // Relasi balik ke Lomba (Biar kalau dipanggil $booking->lomba jalan)
    public function lomba()
    {
        return $this->belongsTo(Lomba::class);
    }
}
