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
        Schema::create('scenes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('user_id');
            $table->timestamps();
            $table->integer('map')->nullable();
            $table->json('attachments')->nullable();
            $table->json('meta_data')->nullable();
            $table->integer('location_id')->nullable();
            $table->integer('thumbnail_id')->nullable();
            $table->json('characters')->nullable();
            $table->json('items')->nullable();
            $table->json('games')->nullable();
            $table->json('quests')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scenes');
    }
};
