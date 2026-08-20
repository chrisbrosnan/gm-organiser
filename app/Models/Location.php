<?php

namespace App\Models;

use App\Concerns\HasThumbnail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $thumbnail_id
 * @property array|null $attachments
 * @property int|null $map_id
 * @property string $description
 * @property int $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property json|null $meta_data
 * @property array|null $games
 * @property array|null $characters
 * @property array|null $quests
 * @property array|null $items
 */
#[Fillable(['name', 'description', 'user_id', 'meta_data', 'games', 'characters', 'quests', 'items'])]
class Location extends Model
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
            'thumbnail_id' => 'string',
            'attachments' => 'array',
            'map_id' => 'integer',
            'description' => 'string',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array',
            'games' => 'array',
            'characters' => 'array',
            'quests' => 'array',
            'items' => 'array',
        ];
    }
}
