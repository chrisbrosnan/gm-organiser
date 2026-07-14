<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $user_id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property json|null $meta_data
 * @property json|null $characters
 */
#[Fillable(['name', 'description', 'user_id', 'type', 'meta_data', 'characters'])]

class Quest extends Model
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
            'type' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'meta_data' => 'array',
            'characters' => 'array',
        ];
    }
}
