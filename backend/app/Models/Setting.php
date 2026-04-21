<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pemancingan',
        'nomor_wa',
        'lokasi',
        'info_rekening',
        'peraturan_empang',
        'potret_kami'
    ];

    protected $casts = [
        'potret_kami' => 'array'
    ];
}

