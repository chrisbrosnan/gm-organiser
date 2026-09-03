<?php

namespace App\Concerns;

use App\Models\Attachment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

trait HandlesObjectAttachments
{
    /**
     * @return array<string, array<int, string>>
     */
    protected function attachmentValidationRules(): array
    {
        return [
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:10240'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:20480'],
        ];
    }

    protected function storeObjectAttachments(Request $request, Model $object, string $objectType): void
    {
        if ($request->file('thumbnail') instanceof UploadedFile) {
            $thumbnail = $this->storeObjectAttachment(
                $request->file('thumbnail'),
                (int) $object->user_id,
                $objectType,
                'thumbnail',
            );

            $object->thumbnail_id = $thumbnail->id;
        }

        $files = $request->file('attachments', []);
        if (! is_array($files)) {
            $files = [$files];
        }

        $attachmentIds = [];
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $attachmentIds[] = $this->storeObjectAttachment(
                    $file,
                    (int) $object->user_id,
                    $objectType,
                    'attachment',
                )->id;
            }
        }

        if ($attachmentIds !== []) {
            $existingAttachmentIds = is_array($object->attachments) ? $object->attachments : [];
            $object->attachments = array_values(array_unique([
                ...$existingAttachmentIds,
                ...$attachmentIds,
            ]));
        }
    }

    private function storeObjectAttachment(
        UploadedFile $file,
        int $userId,
        string $objectType,
        string $attachmentType,
    ): Attachment {
        try {
            $path = $file->store("uploads/{$objectType}s", 's3');
            if ($path === false) {
                throw new \RuntimeException();
            }
        } catch (\Exception $e) {
            Log::error('Failed to store attachment: '.$e->getMessage());
            throw $e;
        }
        $attachment = new Attachment;
        $attachment->object_type = $objectType;
        $attachment->attachment_type = $attachmentType;
        $attachment->attachment_path = $path;
        $attachment->user_id = $userId;
        $attachment->save();

        Log::info('Attachment Path: '.$attachment->attachment_path);

        return $attachment;
    }
}
