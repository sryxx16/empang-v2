<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Nambahin kolom no_wa kalau belum ada
            if (!Schema::hasColumn('bookings', 'no_wa')) {
                $table->string('no_wa')->nullable()->after('nama_peserta');
            }

            // Nambahin kolom status kalau belum ada
            if (!Schema::hasColumn('bookings', 'status')) {
                $table->string('status')->default('pending')->after('no_wa');
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'no_wa')) {
                $table->dropColumn('no_wa');
            }
            if (Schema::hasColumn('bookings', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
