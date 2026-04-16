<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            // Hapus kolom lama
            $table->dropColumn(['nama_lomba', 'tanggal_lomba', 'harga_tiket', 'kuota_peserta']);

            // Tambah kolom baru
            $table->string('nama_pemancingan')->default('Pemancingan Combro');
            $table->string('nomor_wa')->default('6281234567890'); // Pakai 62 depannya
            $table->string('info_rekening')->nullable();
            $table->text('peraturan_empang')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['nama_pemancingan', 'nomor_wa', 'info_rekening', 'peraturan_empang']);
            $table->string('nama_lomba');
            $table->date('tanggal_lomba')->nullable();
            $table->integer('harga_tiket');
            $table->integer('kuota_peserta');
        });
    }
};
