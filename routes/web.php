<?php

use Illuminate\Support\Facades\Route;
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

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main Dashboard
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Games
    Route::inertia('games', 'games')->name('games');
    Route::inertia('games/add', 'add_game')->name('game_create');
    Route::inertia('games/{game_id}', 'single_game')->name('game_single');
    Route::inertia('games/{game_id}/edit', 'edit_game')->name('game_edit');
    Route::post('games/{game_id}/delete', [GameController::class, 'delete'])->name('game_delete');
    Route::post('games/{game_id}/duplicate', [GameController::class, 'duplicate'])->name('game_duplicate');
    Route::post('games/{game_id}/update', [GameController::class, 'update'])->name('game_update');
    Route::post('games/create', [GameController::class, 'create'])->name('game_create_post');

    // Locations
    Route::inertia('locations', 'locations')->name('locations');
    Route::inertia('locations/add', 'add_location')->name('location_create');
    Route::inertia('locations/{location_id}', 'single_location')->name('location_single');
    Route::inertia('locations/{location_id}/edit', 'edit_location')->name('location_edit');
    Route::post('locations/{location_id}/delete', [LocationController::class, 'delete'])->name('location_delete');
    Route::post('locations/{location_id}/update', [LocationController::class, 'update'])->name('location_update');
    Route::post('locations/create', [LocationController::class, 'create'])->name('location_create_post');

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
    Route::inertia('systems', 'systems')->name('systems');
    Route::inertia('systems/add', 'add_system')->name('system_create');
    Route::inertia('systems/{system_id}', 'single_system')->name('system_single');
    Route::inertia('systems/{system_id}/edit', 'edit_system')->name('system_edit');
    Route::post('systems/{system_id}/delete', [SystemController::class, 'delete'])->name('system_delete');
    Route::post('systems/{system_id}/update', [SystemController::class, 'update'])->name('system_update');
    Route::post('systems/create', [SystemController::class, 'create'])->name('system_create_post');

    // Notes
    Route::inertia('general-notes', 'general_notes')->name('general_notes');
    Route::inertia('general-notes/add', 'add_general_note')->name('general_notes_create');
    Route::inertia('general-notes/{note_id}', 'single_general_note')->name('general_notes_single');
    Route::inertia('general-notes/{note_id}/edit', 'edit_general_note')->name('general_notes_edit');
    Route::post('general-notes/{note_id}/delete', [NotesController::class, 'delete'])->name('general_notes_delete');
    Route::post('general-notes/{note_id}/update', [NotesController::class, 'update'])->name('general_notes_update');
    Route::post('general-notes/create', [NotesController::class, 'create'])->name('general_notes_create_post');
});

require __DIR__.'/settings.php';
