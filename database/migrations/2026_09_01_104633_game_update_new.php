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
        Schema::table('locations', function (Blueprint $table) {
            $table->json('npc_characters')->nullable();
            $table->json('enemy_characters')->nullable();
            $table->json('scenes')->nullable();
            $table->json('items')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->dropColumn('npc_characters');
            $table->dropColumn('enemy_characters');
            $table->dropColumn('scenes');
            $table->dropColumn('items');
        });
    }
};
