<?php

namespace App\Models;

use App\Concerns\HasThumbnail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $type
 * @property string|null $thumbnail_id
 * @property array|null $attachments
 * @property string $description
 * @property int $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property array|null $meta_data
 * @property array|null $characters
 * @property array|null $games
 * @property array|null $spells
 * @property array|null $quests
 * @property array|null $locations
 * @property array|null $scenes
 */
#[Fillable(['name', 'type', 'thumbnail_id', 'attachments', 'description', 'user_id', 'meta_data', 'characters', 'games', 'spells', 'quests', 'locations', 'scenes'])]
class Item extends Model
{
    use HasThumbnail;

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
            'type' => 'string',
            'thumbnail_id' => 'string',
            'attachments' => 'array',
            'description' => 'string',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array',
            'characters' => 'array',
            'games' => 'array',
            'spells' => 'array',
            'quests' => 'array',
            'locations' => 'array',
            'scenes' => 'array',
        ];
    }
}
