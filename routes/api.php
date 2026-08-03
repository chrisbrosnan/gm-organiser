<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\NoteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/**
 * GAMES Routes
 */

Route::post('/games', [GameController::class, 'create'])
    ->name('games_create');

Route::post('/games/{game_id}', [GameController::class, 'update'])
    ->name('games_update');

Route::delete('/games/{game_id}', [GameController::class, 'delete'])
    ->name('games.delete');

Route::post('/games/{game_id}/duplicate', [GameController::class, 'duplicate'])
    ->name('games.duplicate');

// Route::get('/games/user/{user_id}', [GameController::class, 'gamesByUserId'])
//     ->name('games_index_api');

/**
 * SYSTEMS Routes
 */

// Systems
Route::get('/systems', [SystemController::class, 'index'])->name('systems_index');
// Route::get('/systems/{user_id}/{system_id}', [SystemController::class, 'fetchSystemById']);
// Route::post('/systems', [SystemController::class, 'createSystem']);

// Characters
Route::get('/characters/pcs/{user_id}', [CharacterController::class, 'fetchPlayerCharacters']);
Route::get('/characters/npcs/{user_id}', [CharacterController::class, 'fetchNonPlayerCharacters']);
Route::get('/characters/enemies/{user_id}', [CharacterController::class, 'fetchEnemyCharacters']);
// Route::post('/characters', [CharacterController::class, 'createCharacter']);

// Custom Fields
Route::get('/custom_fields/games/by_user/{user_id}', [CustomFieldController::class, 'fetchCustomFields']);
Route::get('/custom_fields/general_notes/by_user/{user_id}', [CustomFieldController::class, 'fetchGeneralNotesCustomFields']);

// Locations
Route::post('/locations', [LocationController::class, 'create'])->name('locations_create');
Route::post('/locations/{location_id}', [LocationController::class, 'update'])->name('locations_update');
Route::get('/locations/{location_id}', [LocationController::class, 'get'])->name('locations_get_by_id');
Route::get('/locations/user/{user_id}', [LocationController::class, 'locationsByUserId'])->name('locations_get');

// Notes
Route::post('/notes', [NoteController::class, 'create'])->name('notes_create');
// Route::post('/notes/delete/{note_id}', [NoteController::class, 'delete'])->name('notes_delete');
Route::get('/notes/by_user/{user_id}', [NoteController::class, 'getByUserId'])->name('notes_get_by_user');
Route::get('/notes/{note_id}', [NoteController::class, 'get'])->name('notes_get_by_id');
