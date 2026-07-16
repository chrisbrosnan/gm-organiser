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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('thumbnail_id')->nullable();
            $table->json('attachments')->nullable();
            $table->string('type');
            $table->string('description')->nullable();
            $table->integer('user_id');
            $table->timestamps();
            $table->integer('system_id');
            $table->json('meta_data')->nullable();
            $table->json('player_characters')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
