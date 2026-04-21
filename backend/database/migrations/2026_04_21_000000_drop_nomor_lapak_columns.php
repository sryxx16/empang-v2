<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'nomor_lapak')) {
                $table->dropColumn('nomor_lapak');
            }
        });

        Schema::table('rekaps', function (Blueprint $table) {
            if (Schema::hasColumn('rekaps', 'nomor_lapak')) {
                $table->dropColumn('nomor_lapak');
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (!Schema::hasColumn('bookings', 'nomor_lapak')) {
                $table->string('nomor_lapak')->nullable()->after('status');
            }
        });

        Schema::table('rekaps', function (Blueprint $table) {
            if (!Schema::hasColumn('rekaps', 'nomor_lapak')) {
                $table->string('nomor_lapak')->nullable()->after('nama_peserta');
            }
        });
    }
};
