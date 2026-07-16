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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('user_id');
            $table->integer('map')->nullable();
            $table->integer('thumbnail_id')->nullable();
            $table->integer('map_id')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamps();
            $table->json('meta_data')->nullable();
            $table->json('games')->nullable();
            $table->json('characters')->nullable();
            $table->json('quests')->nullable();
            $table->json('items')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
