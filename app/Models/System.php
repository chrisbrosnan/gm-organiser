<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int|null $thumbnail_id
 * @property array|null $attachments
 * @property int $version
 * @property array|null $meta_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property array|null $games
 */

class System extends Model
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
            'description' => 'string|null',
            'thumbnail_id' => 'integer|null',
            'attachments' => 'array|null',
            'version' => 'integer',
            'meta_data' => 'array|null',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'games' => 'array|null',
        ];
    }
}
