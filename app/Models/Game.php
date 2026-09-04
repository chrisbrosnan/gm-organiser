<?php

namespace App\Models;

use App\Concerns\HasThumbnail;
use App\Models\Attachment;
use App\Models\System;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $thumbnail_id
 * @property array|null $attachments
 * @property string $type
 * @property string $description
 * @property int $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int $system_id
 * @property array<string, mixed>|null $meta_data
 * @property array|null $player_characters
 */
#[Fillable(['name', 'thumbnail_id', 'attachments', 'type', 'description', 'user_id', 'system_id', 'meta_data', 'player_characters'])]
class Game extends Model
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
            'type' => 'string',
            'description' => 'string',
            'user_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'system_id' => 'integer',
            'meta_data' => 'array',
            'player_characters' => 'array',
        ];
    }

    public static function getGamesByUserId(int $user_id): array
    {
        $games = self::where('user_id', $user_id)->get();

        // Get system name from systems table
        foreach ($games as $game) {
            $system = System::find($game->system_id);
            if ($system) {
                $game->system_name = $system->name;
            }
            $thumbnail = Attachment::find($game->thumbnail_id);
            if ($thumbnail) {
                $game->attachment_path = $thumbnail->attachment_path;
            }
        }

        return $games->toArray();
    }
}
