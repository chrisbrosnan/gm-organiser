<?php

namespace App\Concerns;

use App\Models\Attachment;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasThumbnail
{
    public function thumbnail(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'thumbnail_id');
    }
}
