<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\SceneController;
use App\Http\Controllers\SpellController;
use App\Http\Controllers\SystemController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Main Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Files

    Route::get('/files', [FileController::class, 'index'])
        ->name('files');

    // Games

    Route::get('/games', [GameController::class, 'index'])
        ->name('games');

    Route::get('/games/add', [GameController::class, 'new'])
        ->name('games.add');

    Route::post('/games', [GameController::class, 'create'])
        ->name('games.create');

    Route::get('/games/{game_id}', [GameController::class, 'show'])
        ->name('games.show');

    Route::post('/games/{game_id}', [GameController::class, 'update'])
        ->name('games.update');

    // Locations

    Route::get('/locations', [LocationController::class, 'index'])
        ->name('locations');

    Route::get('/locations/add', [LocationController::class, 'new'])
        ->name('locations.add');

    Route::post('/locations', [LocationController::class, 'create'])
        ->name('locations.create');

    Route::get('/locations/{location_id}', [LocationController::class, 'show'])
        ->name('locations.show');

    Route::post('/locations/{location_id}', [LocationController::class, 'update'])
        ->name('locations.update');

    // // // // //

    // Scenes

    Route::get('/scenes', [SceneController::class, 'index'])
        ->name('scenes');

    Route::get('/scenes/add', [SceneController::class, 'new'])
        ->name('scenes.add');

    Route::post('/scenes', [SceneController::class, 'create'])
        ->name('scenes.create');

    Route::get('/scenes/{scene_id}', [SceneController::class, 'show'])
        ->name('scenes.show');

    Route::post('/scenes/{scene_id}', [SceneController::class, 'update'])
        ->name('scenes.update');

    // Characters
    Route::get('/characters', [CharacterController::class, 'index'])
        ->name('characters');

    Route::get('/characters/add', [CharacterController::class, 'new'])
        ->name('characters.add');

    Route::post('/characters', [CharacterController::class, 'create'])
        ->name('characters.create');

    Route::prefix('characters')->group(function () {
        Route::get('enemies', [CharacterController::class, 'index_enemies'])
            ->name('enemies');
        Route::get('npcs', [CharacterController::class, 'index_npcs'])
            ->name('npcs');
        Route::get('pcs', [CharacterController::class, 'index_pcs'])
            ->name('pcs');
    });

    Route::get('/characters/{character_id}', [CharacterController::class, 'show'])
        ->name('characters.show');

    Route::post('/characters/{character_id}', [CharacterController::class, 'update'])
        ->name('characters.update');

    // // // // //

    // Quests
    Route::get('quests', [QuestController::class, 'index'])
        ->name('quests');
    Route::get('quests/add', [QuestController::class, 'new'])
        ->name('quests.add');
    Route::post('quests', [QuestController::class, 'create'])
        ->name('quests.create');
    Route::get('quests/{quest_id}', [QuestController::class, 'show'])
        ->name('quests.show');
    Route::post('quests/{quest_id}', [QuestController::class, 'update'])
        ->name('quests.update');

    // Items
    Route::get('items', [ItemController::class, 'index'])
        ->name('items');
    Route::get('items/add', [ItemController::class, 'new'])
        ->name('items.add');
    Route::post('items', [ItemController::class, 'create'])
        ->name('items.create');
    Route::get('items/{item_id}', [ItemController::class, 'show'])
        ->name('items.show');
    Route::post('items/{item_id}', [ItemController::class, 'update'])
        ->name('items.update');

    // Spells
    Route::get('spells', [SpellController::class, 'index'])
        ->name('spells');
    Route::get('spells/add', [SpellController::class, 'new'])
        ->name('spells.add');
    Route::post('spells', [SpellController::class, 'create'])
        ->name('spells.create');
    Route::get('spells/{spell_id}', [SpellController::class, 'show'])
        ->name('spells.show');
    Route::post('spells/{spell_id}', [SpellController::class, 'update'])
        ->name('spells.update');

    // Systems
    Route::get('systems', [SystemController::class, 'page'])->name('systems');
    // Route::inertia('systems/add', 'add_system')->name('system_create');
    // Route::inertia('systems/{system_id}', 'single_system')->name('system_single');

    // Notes
    Route::get('general-notes', [NoteController::class, 'index'])
        ->name('general_notes');
    Route::get('general-notes/add', [NoteController::class, 'new'])
        ->name('general_notes.add');
    Route::post('general-notes', [NoteController::class, 'create'])
        ->name('general_notes.create');
    Route::get('general-notes/edit', [NoteController::class, 'edit'])
        ->name('general_notes.edit');
    Route::get('general-notes/{note_id}', [NoteController::class, 'show'])
        ->name('general_notes.show');
    Route::post('general-notes/{note_id}', [NoteController::class, 'update'])
        ->name('general_notes.update');

    // Forums
    Route::get('forums', [ForumController::class, 'index'])
        ->name('forums');
    Route::get('forums/add', [ForumController::class, 'new'])
        ->name('forums.add');
    Route::post('forums', [ForumController::class, 'create'])
        ->name('forums.create');
    Route::get('forums/{forum_id}', [ForumController::class, 'show'])
        ->name('forums.show');
    Route::post('forums/{forum_id}', [ForumController::class, 'update'])
        ->name('forums.update');

    // Custom Fields
    Route::get('custom-fields', [CustomFieldController::class, 'index'])
        ->name('custom_fields');
    Route::get('custom-fields/add', [CustomFieldController::class, 'new'])
        ->name('custom_fields.add');
    Route::post('custom-fields', [CustomFieldController::class, 'create'])
        ->name('custom_fields.create');
    Route::get('custom-fields/{field_id}', [CustomFieldController::class, 'show'])
        ->name('custom_fields.show');
    Route::post('custom-fields/{field_id}', [CustomFieldController::class, 'update'])
        ->name('custom_fields.update');
    Route::get('custom-fields/remove/{field_id}', [CustomFieldController::class, 'remove'])
        ->name('custom_fields.remove');
});

require __DIR__.'/settings.php';
