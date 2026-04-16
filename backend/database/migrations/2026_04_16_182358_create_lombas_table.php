<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lombas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lomba'); // Misal: "Lomba Eksekutif"
            $table->date('tanggal_lomba'); // Misal: 2026-04-19
            $table->integer('harga_tiket'); // Misal: 150000
            $table->integer('kuota')->default(34); // Sesuai lapak empang lu
            $table->boolean('is_active')->default(true); // Buat nandain lomba mana yang lagi jalan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lombas');
    }
};
