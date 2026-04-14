<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('bookings', function (Blueprint $table) {
        $table->id(); // Secara otomatis membuat ID unik (Primary Key) untuk setiap transaksi

        // Data dari Form Frontend
        $table->string('nama_peserta');
        $table->date('tanggal_lomba');
        $table->string('nomor_lapak');

        // Status untuk Admin Panel
        $table->enum('status_pembayaran', ['pending', 'paid', 'verified'])->default('pending');

        $table->timestamps(); // Otomatis mencatat waktu 'created_at' (kapan booking dibuat)
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
