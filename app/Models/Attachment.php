<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $table = 'object_attachments';

    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'object_type' => 'string',
            'attachment_type' => 'string',
            'attachment_path' => 'string',
            'user_id' => 'integer',
        ];
    }
}
