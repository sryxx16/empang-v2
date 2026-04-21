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
    Schema::table('rekaps', function (Blueprint $table) {
        $table->integer('nominal_bayar')->default(0)->after('harga_tiket');
        $table->string('status_bayar')->default('lunas')->after('metode_bayar'); // lunas / hutang
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rekaps', function (Blueprint $table) {
            //
        });
    }
};