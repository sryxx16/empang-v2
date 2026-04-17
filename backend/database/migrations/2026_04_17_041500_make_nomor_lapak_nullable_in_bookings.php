<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Ubah nomor_lapak jadi nullable dan beri default value
            $table->string('nomor_lapak')->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Kembalikan ke string biasa tanpa default
            $table->string('nomor_lapak')->nullable(false)->change();
        });
    }
};
