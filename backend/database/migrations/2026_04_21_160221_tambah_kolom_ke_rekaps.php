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
        if (!Schema::hasColumn('rekaps', 'no_wa')) {
            Schema::table('rekaps', function (Blueprint $table) {
                $table->string('no_wa')->nullable();
            });
        }
        
        if (!Schema::hasColumn('rekaps', 'nominal_bayar')) {
            Schema::table('rekaps', function (Blueprint $table) {
                $table->integer('nominal_bayar')->default(0);
            });
        }
        
        if (!Schema::hasColumn('rekaps', 'status_bayar')) {
            Schema::table('rekaps', function (Blueprint $table) {
                $table->string('status_bayar')->default('lunas');
            });
        }
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
