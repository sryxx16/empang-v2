<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    // Mengizinkan 4 kolom ini untuk diisi/diedit
    protected $fillable = [
        'nama_lomba',
        'tanggal_lomba',
        'harga_tiket',
        'kuota_peserta'
    ];
}
