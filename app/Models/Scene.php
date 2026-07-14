<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scene extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'name' => 'string',
            'description' => 'string',
            'user_id' => 'integer',
            'location_id' => 'integer|null',
            'thumbnail_id' => 'integer|null',
            'attachments' => 'array|null',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array|null',
            'characters' => 'array|null',
            'items' => 'array|null',
            'games' => 'array|null',
            'quests' => 'array|null',
        ];
    }
}
