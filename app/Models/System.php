<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int|null $thumbnail_id
 * @property array|null $attachments
 * @property int $version
 * @property array|null $meta_data
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property array|null $games
 */
#[Fillable(['name', 'description', 'attachments', 'version', 'meta_data', 'games'])]
class System extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'attachments',
        'version',
        'meta_data',
        'games',
    ];

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
            'version' => 'integer',
            'meta_data' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'games' => 'array',
        ];
    }
}
