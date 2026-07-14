<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $thumbnail_id
 * @property json|null $attachments
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property json|null $meta_data
 * @property json|null $characters
 */
#[Fillable(['name', 'description', 'user_id', 'meta_data'])]

class Spell extends Model
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
            'thumbnail_id' => 'integer|null',
            'attachments' => 'array|null',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array|null',
            'characters' => 'array|null',
        ];
    }
}
