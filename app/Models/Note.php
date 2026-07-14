<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $content
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $game_id
 */
#[Fillable(['title', 'content', 'user_id', 'game_id'])]

class Note extends Model
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
            'title' => 'string',
            'content' => 'string',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'game_id' => 'integer',
        ];
    }
}
