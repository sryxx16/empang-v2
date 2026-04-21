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
        Schema::table('settings', function (Blueprint $table) {
            if (!Schema::hasColumn('settings', 'lokasi')) {
                $table->string('lokasi')->nullable()->after('nomor_wa');
            }
            if (!Schema::hasColumn('settings', 'potret_kami')) {
                $table->json('potret_kami')->nullable()->after('peraturan_empang');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn('potret_kami');
        });
    }
};
