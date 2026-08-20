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
        Schema::table('quests', function (Blueprint $table) {
            $table->unsignedBigInteger('thumbnail_id')->nullable()->after('name');
            $table->json('attachments')->nullable()->after('thumbnail_id');
        });

        Schema::table('characters', function (Blueprint $table) {
            $table->unsignedBigInteger('thumbnail_id')->nullable()->after('portrait_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quests', function (Blueprint $table) {
            $table->dropColumn(['thumbnail_id', 'attachments']);
        });

        Schema::table('characters', function (Blueprint $table) {
            $table->dropColumn('thumbnail_id');
        });
    }
};
