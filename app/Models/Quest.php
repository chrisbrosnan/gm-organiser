<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int|null $thumbnail_id
 * @property array|null $attachments
 * @property int $user_id
 * @property string $type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property json|null $meta_data
 * @property json|null $characters
 */
#[Fillable(['name', 'thumbnail_id', 'attachments', 'description', 'user_id', 'type', 'meta_data', 'characters'])]

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
            'thumbnail_id' => 'integer',
            'attachments' => 'array',
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
