<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string|null $thumbnail_id
 * @property array|null $attachments
 * @property string $description
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $system_id
 * @property json|null $meta_data
 * @property array|null $player_characters
 */
#[Fillable(['name', 'thumbnail_id', 'attachments', 'description', 'user_id', 'system_id', 'meta_data', 'player_characters'])]
class Game extends Model
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
            'thumbnail_id' => 'string',
            'attachments' => 'array',
            'description' => 'string',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'system_id' => 'integer',
            'meta_data' => 'array',
            'player_characters' => 'array',
        ];
    }
}
