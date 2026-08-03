<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SceneController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SpellController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\NotesController;
use App\Models\Game;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Main Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Games

    Route::get('/games', [GameController::class, 'index'])
        ->name('games');

    Route::get('/games/add', [GameController::class, 'new_game'])
        ->name('games.add');

    Route::get('/games/{game_id}', [GameController::class, 'show'])
        ->name('games_show');

    // Route::post('/games', [GameController::class, 'store'])
    //     ->name('games.store');

    // Route::put('/games/{game_id}', [GameController::class, 'update'])
    //     ->name('games.update');

    // Locations

    Route::get('/locations', [LocationController::class, 'index'])
        ->name('locations');

    // Route::get('/locations/add', [LocationController::class, 'new_location'])
    //     ->name('locations.add');

    // Route::get('/locations/{location_id}', [LocationController::class, 'show'])
    //     ->name('locations.show');

    // Route::post('/locations', [LocationController::class, 'store'])
    //     ->name('locations.store');

    // Route::put('/locations/{location_id}', [LocationController::class, 'update'])
    //     ->name('locations.update');

    // // // // //

    // Scenes
    Route::inertia('scenes', 'scenes')->name('scenes');
    Route::inertia('scenes/add', 'add_scene')->name('scene_create');
    Route::inertia('scenes/{scene_id}', 'single_scene')->name('scene_single');
    Route::inertia('scenes/{scene_id}/edit', 'edit_scene')->name('scene_edit');
    Route::post('scenes/{scene_id}/delete', [SceneController::class, 'delete'])->name('scene_delete');
    Route::post('scenes/{scene_id}/update', [SceneController::class, 'update'])->name('scene_update');
    Route::post('scenes/create', [SceneController::class, 'create'])->name('scene_create_post');

    // Characters
    Route::prefix('characters')->group(function () {
        Route::inertia('/', 'characters')->name('characters');
        Route::inertia('npcs', 'npcs')->name('npcs');
        Route::inertia('npcs/add', 'add_npc')->name('npc_create');
        Route::inertia('npcs/{npc_id}', 'single_npc')->name('npc_single');
        Route::inertia('npcs/{npc_id}/edit', 'edit_npc')->name('npc_edit');
        Route::post('npcs/{npc_id}/delete', [CharacterController::class, 'delete'])->name('npc_delete');
        Route::post('npcs/{npc_id}/update', [CharacterController::class, 'update'])->name('npc_update');
        Route::post('npcs/create', [CharacterController::class, 'create'])->name('npc_create_post');
        Route::inertia('pcs', 'pcs')->name('pcs');
        Route::inertia('pcs/add', 'add_pc')->name('pc_create');
        Route::inertia('pcs/{pc_id}', 'single_pc')->name('pc_single');
        Route::inertia('pcs/{pc_id}/edit', 'edit_pc')->name('pc_edit');
        Route::post('pcs/{pc_id}/delete', [CharacterController::class, 'delete'])->name('pc_delete');
        Route::post('pcs/{pc_id}/update', [CharacterController::class, 'update'])->name('pc_update');
        Route::inertia('enemies', 'enemies')->name('enemies');
        Route::inertia('enemies/add', 'add_enemy')->name('enemy_create');
        Route::inertia('enemies/{enemy_id}', 'single_enemy')->name('enemy_single');
        Route::inertia('enemies/{enemy_id}/edit', 'edit_enemy')->name('enemy_edit');
        Route::post('enemies/{enemy_id}/delete', [CharacterController::class, 'delete'])->name('enemy_delete');
        Route::post('enemies/{enemy_id}/update', [CharacterController::class, 'update'])->name('enemy_update');
        Route::post('enemies/create', [CharacterController::class, 'create'])->name('enemy_create_post');
    });

    // Quests
    Route::inertia('quests', 'quests')->name('quests');
    Route::inertia('quests/add', 'add_quest')->name('quest_create');
    Route::inertia('quests/{quest_id}', 'single_quest')->name('quest_single');
    Route::inertia('quests/{quest_id}/edit', 'edit_quest')->name('quest_edit');
    Route::post('quests/{quest_id}/delete', [QuestController::class, 'delete'])->name('quest_delete');
    Route::post('quests/{quest_id}/update', [QuestController::class, 'update'])->name('quest_update');
    Route::post('quests/create', [QuestController::class, 'create'])->name('quest_create_post');

    // Items
    Route::inertia('items', 'items')->name('items');
    Route::inertia('items/add', 'add_item')->name('item_create');
    Route::inertia('items/{item_id}', 'single_item')->name('item_single');
    Route::inertia('items/{item_id}/edit', 'edit_item')->name('item_edit');
    Route::post('items/{item_id}/delete', [ItemController::class, 'delete'])->name('item_delete');
    Route::post('items/{item_id}/update', [ItemController::class, 'update'])->name('item_update');
    Route::post('items/create', [ItemController::class, 'create'])->name('item_create_post');

    // Spells
    Route::inertia('spells', 'spells')->name('spells');
    Route::inertia('spells/add', 'add_spell')->name('spell_create');
    Route::inertia('spells/{spell_id}', 'single_spell')->name('spell_single');
    Route::inertia('spells/{spell_id}/edit', 'edit_spell')->name('spell_edit');
    Route::post('spells/{spell_id}/delete', [SpellController::class, 'delete'])->name('spell_delete');
    Route::post('spells/{spell_id}/update', [SpellController::class, 'update'])->name('spell_update');
    Route::post('spells/create', [SpellController::class, 'create'])->name('spell_create_post');

    // Systems
    // Route::inertia('systems', 'systems')->name('systems');
    // Route::inertia('systems/add', 'add_system')->name('system_create');
    // Route::inertia('systems/{system_id}', 'single_system')->name('system_single');
    // Route::inertia('systems/{system_id}/edit', 'edit_system')->name('system_edit');
    // Route::post('systems/{system_id}/delete', [SystemController::class, 'delete'])->name('system_delete');
    // Route::post('systems/{system_id}/update', [SystemController::class, 'update'])->name('system_update');
    // Route::post('systems/create', [SystemController::class, 'create'])->name('system_create_post');

    // Notes
    Route::inertia('general-notes', 'general_notes')->name('general_notes');
    Route::inertia('general-notes/add', 'general_notes_add')->name('general_notes_create');
    Route::inertia('general-notes/edit', 'general_notes_view')->name('general_notes_single');
    // Route::inertia('general-notes/{note_id}/edit', 'edit_general_note')->name('general_notes_edit');
    // Route::post('general-notes/{note_id}/delete', [NotesController::class, 'delete'])->name('general_notes_delete');
    // Route::post('general-notes/{note_id}/update', [NotesController::class, 'update'])->name('general_notes_update');
    // Route::post('general-notes/create', [NotesController::class, 'create'])->name('general_notes_create_post');

    // Forums
    Route::inertia('forums', 'forums')->name('forums');
    Route::inertia('forums/add', 'add_forum_post')->name('forum_create');
    Route::inertia('forums/{post_id}', 'single_forum_post')->name('forum_single');
    Route::post('forums', [ForumsController::class, 'create'])->name('forum_create_post');
    Route::post('forums/{post_id}/update', [ForumsController::class, 'update'])->name('forum_update');
    Route::post('forums/{post_id}/delete', [ForumsController::class, 'delete'])->name('forum_delete');

    // Custom Fields
    Route::inertia('custom-fields', 'custom_fields')->name('custom_fields');
    Route::inertia('custom-fields/add', 'add_custom_field')->name('custom_fields_create');
    Route::inertia('custom-fields/remove/{field_id}', 'remove_custom_field')->name('custom_fields_remove');
});

require __DIR__.'/settings.php';
