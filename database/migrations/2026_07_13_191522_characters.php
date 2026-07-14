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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('portrait')->nullable();
            $table->text('bio')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type')->default('npc');
            $table->timestamps();
            $table->json('meta_data')->nullable();
            $table->json('games')->nullable();
            $table->json('spells')->nullable();
            $table->json('items')->nullable();
            $table->json('quests')->nullable();
            $table->json('locations')->nullable();
            $table->json('scenes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
