<?php

use App\Models\Character;
use App\Models\CustomField;
use App\Models\Forum;
use App\Models\Item;
use App\Models\Note;
use App\Models\Quest;
use App\Models\Scene;
use App\Models\Spell;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('resource index pages render', function (string $routeName, string $component) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['scenes', 'scenes'],
    ['characters', 'characters'],
    ['quests', 'quests'],
    ['items', 'items'],
    ['spells', 'spells'],
    ['general_notes', 'general_notes'],
    ['forums', 'forums'],
    ['custom_fields', 'custom_fields'],
]);

test('resource add pages render', function (string $routeName, string $component) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['scenes.add', 'scenes_add'],
    ['characters.add', 'characters_add'],
    ['quests.add', 'quests_add'],
    ['items.add', 'items_add'],
    ['spells.add', 'spells_add'],
    ['general_notes.add', 'general_notes_add'],
    ['forums.add', 'forums_add'],
    ['custom_fields.add', 'custom_fields_add'],
]);

test('resource show pages render', function (Closure $makeRecord, string $routeName, string $parameterName, string $component) {
    $user = User::factory()->create();
    $record = $makeRecord($user);

    $this->actingAs($user)
        ->get(route($routeName, [$parameterName => $record->id]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    [
        function (User $user): Scene {
            $scene = new Scene;
            $scene->name = 'Opening Scene';
            $scene->description = 'An intro scene';
            $scene->user_id = $user->id;
            $scene->save();

            return $scene;
        },
        'scenes.show',
        'scene_id',
        'scenes_view',
    ],
    [
        function (User $user): Character {
            $character = new Character;
            $character->name = 'Aria';
            $character->type = 'npc';
            $character->bio = 'Helpful guide';
            $character->user_id = $user->id;
            $character->save();

            return $character;
        },
        'characters.show',
        'character_id',
        'characters_view',
    ],
    [
        function (User $user): Quest {
            $quest = new Quest;
            $quest->name = 'Lost Relic';
            $quest->type = 'Main';
            $quest->description = 'Recover the relic';
            $quest->user_id = $user->id;
            $quest->save();

            return $quest;
        },
        'quests.show',
        'quest_id',
        'quests_view',
    ],
    [
        function (User $user): Item {
            $item = new Item;
            $item->name = 'Silver Key';
            $item->type = 'Quest Item';
            $item->description = 'Opens the vault';
            $item->user_id = $user->id;
            $item->save();

            return $item;
        },
        'items.show',
        'item_id',
        'items_view',
    ],
    [
        function (User $user): Spell {
            $spell = new Spell;
            $spell->name = 'Fire Bolt';
            $spell->description = 'A quick ranged spell';
            $spell->user_id = $user->id;
            $spell->save();

            return $spell;
        },
        'spells.show',
        'spell_id',
        'spells_view',
    ],
    [
        function (User $user): Note {
            $note = new Note;
            $note->title = 'Session Summary';
            $note->content = 'The party reached the ruins.';
            $note->user_id = $user->id;
            $note->save();

            return $note;
        },
        'general_notes.show',
        'note_id',
        'general_notes_view',
    ],
    [
        function (User $user): Forum {
            $forum = new Forum;
            $forum->title = 'Town Rumours';
            $forum->content = 'Strange lights were seen at night.';
            $forum->user_id = $user->id;
            $forum->save();

            return $forum;
        },
        'forums.show',
        'forum_id',
        'forums_view',
    ],
    [
        function (User $user): CustomField {
            $customField = new CustomField;
            $customField->field = 'Mood';
            $customField->value = 'Tense';
            $customField->type = 'text';
            $customField->object_type = 'scenes';
            $customField->user_id = $user->id;
            $customField->save();

            return $customField;
        },
        'custom_fields.show',
        'field_id',
        'custom_fields_view',
    ],
]);
