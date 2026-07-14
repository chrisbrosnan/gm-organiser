<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string|null $portrait
 * @property array|null $attachments
 * @property string $bio
 * @property int $user_id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property array|null $meta_data
 * @property array|null $games
 * @property array|null $spells
 * @property array|null $items
 * @property array|null $quests
 * @property array|null $locations
 * @property array|null $scenes
 */

#[Fillable(['name', 'portrait', 'attachments', 'bio', 'user_id', 'type', 'meta_data', 'games', 'spells', 'items', 'quests', 'locations', 'scenes'])]
class Character extends Model
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
            'portrait' => 'string',
            'attachments' => 'array',
            'bio' => 'string',
            'user_id' => 'integer',
            'type' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array',
            'games' => 'array',
            'spells' => 'array',
            'items' => 'array',
            'quests' => 'array',
            'locations' => 'array',
            'scenes' => 'array',
        ];
    }
}
