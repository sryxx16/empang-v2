<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Nambahin lomba_id biar ketahuan dia daftar lomba yang mana
            $table->foreignId('lomba_id')->nullable()->constrained('lombas')->onDelete('cascade')->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['lomba_id']);
            $table->dropColumn('lomba_id');
        });
    }
};
