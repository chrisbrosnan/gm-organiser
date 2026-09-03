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
        Schema::table('spells', function (Blueprint $table) {
            $table->string('effect')->nullable();
        });

        Schema::table('items', function (Blueprint $table) {
            $table->string('effect')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('spells', function (Blueprint $table) {
            $table->dropColumn('effect');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('effect');
        });
    }
};
