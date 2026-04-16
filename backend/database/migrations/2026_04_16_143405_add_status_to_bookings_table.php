<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Menambahkan kolom status dengan nilai default 'pending'
            $table->string('status')->default('pending')->after('nomor_lapak');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Menghapus kolom jika sewaktu-waktu migrasi di-rollback
            $table->dropColumn('status');
        });
    }
};
