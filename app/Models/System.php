<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $thumbnail_id
 * @property array|null $attachments
 * @property int $version
 * @property json|null $meta_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property json|null $games
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
            'version' => 'integer',
            'meta_data' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'games' => 'array',
        ];
    }
}
