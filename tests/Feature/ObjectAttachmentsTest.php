<?php

use App\Models\Attachment;
use App\Models\Character;
use App\Models\Game;
use App\Models\Item;
use App\Models\Location;
use App\Models\Quest;
use App\Models\Scene;
use App\Models\Spell;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('resource editors store thumbnails and attachments', function (
    string $route,
    string $modelClass,
    array $attributes,
    string $objectType,
    string $property,
) {
    Storage::fake('public');
    $user = User::factory()->create();
    $thumbnail = UploadedFile::fake()->image('thumbnail.png');
    $firstAttachment = UploadedFile::fake()->create('notes.pdf', 100, 'application/pdf');
    $secondAttachment = UploadedFile::fake()->create('map.txt', 100, 'text/plain');

    $this->actingAs($user)
        ->post($route, [
            ...$attributes,
            'thumbnail' => $thumbnail,
            'attachments' => [$firstAttachment, $secondAttachment],
        ])
        ->assertRedirect();

    $resource = $modelClass::query()
        ->where('user_id', $user->id)
        ->sole();

    expect($resource->thumbnail_id)->not->toBeNull()
        ->and($resource->attachments)->toHaveCount(2);

    $thumbnailAttachment = Attachment::findOrFail($resource->thumbnail_id);
    expect($thumbnailAttachment->object_type)->toBe($objectType)
        ->and($thumbnailAttachment->attachment_type)->toBe('thumbnail');
    Storage::disk('public')->assertExists($thumbnailAttachment->attachment_path);

    $attachments = Attachment::query()
        ->whereIn('id', $resource->attachments)
        ->get();

    expect($attachments)->toHaveCount(2);

    $attachments->each(function (Attachment $attachment) use ($objectType): void {
        expect($attachment->object_type)->toBe($objectType)
            ->and($attachment->attachment_type)->toBe('attachment');
        Storage::disk('public')->assertExists($attachment->attachment_path);
    });

    $this->actingAs($user)
        ->get("{$route}/{$resource->id}")
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page->where(
                "{$property}.thumbnail.attachment_path",
                $thumbnailAttachment->attachment_path,
            ),
        );
})->with([
    ['/games', Game::class, ['title' => 'New Game', 'system' => 1, 'type' => 'campaign'], 'game', 'game'],
    ['/locations', Location::class, ['name' => 'Harbor'], 'location', 'location'],
    ['/scenes', Scene::class, ['name' => 'Opening Scene'], 'scene', 'scene'],
    ['/characters', Character::class, ['name' => 'Aria', 'type' => 'npc'], 'character', 'character'],
    ['/quests', Quest::class, ['name' => 'Lost Relic'], 'quest', 'quest'],
    ['/items', Item::class, ['name' => 'Silver Key'], 'item', 'item'],
    ['/spells', Spell::class, ['name' => 'Fire Bolt'], 'spell', 'spell'],
]);

test('updating a resource preserves existing attachment IDs', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $item = new Item;
    $item->name = 'Silver Key';
    $item->type = 'tool';
    $item->user_id = $user->id;
    $item->attachments = [100];
    $item->save();

    $this->actingAs($user)
        ->post("/items/{$item->id}", [
            'name' => $item->name,
            'type' => $item->type,
            'thumbnail' => UploadedFile::fake()->image('thumbnail.png'),
            'attachments' => [UploadedFile::fake()->create('clue.txt', 100, 'text/plain')],
        ])
        ->assertRedirect();

    $item->refresh();

    expect($item->thumbnail_id)->not->toBeNull()
        ->and($item->attachments)->toHaveCount(2)
        ->and($item->attachments)->toContain(100);
});
