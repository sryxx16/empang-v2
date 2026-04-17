<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rekaps', function (Blueprint $table) {
            // Tambah kolom harga_tiket
            $table->decimal('harga_tiket', 12, 2)->default(0)->after('metode_bayar');
        });
    }

    public function down(): void
    {
        Schema::table('rekaps', function (Blueprint $table) {
            $table->dropColumn('harga_tiket');
        });
    }
};
