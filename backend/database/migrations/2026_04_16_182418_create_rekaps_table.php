<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rekaps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lomba_id')->constrained('lombas')->onDelete('cascade'); // Nyambung ke tabel lomba
            $table->string('nama_peserta');
            $table->string('nomor_lapak')->nullable();

            // Status bayar: 'belum', 'tunai', 'transfer'
            $table->enum('metode_bayar', ['belum', 'tunai', 'transfer'])->default('belum');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rekaps');
    }
};
