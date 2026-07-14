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
            'location_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array',
            'characters' => 'array',
            'items' => 'array',
            'games' => 'array',
            'quests' => 'array',
        ];
    }
}
