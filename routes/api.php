<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\GameController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/games/user/{user_id}',
    [GameController::class, 'gamesByUserId']
)->name('games_index');

Route::post('/games', [GameController::class, 'create'])->name('games_create');
Route::post('/games/{game_id}', [GameController::class, 'update'])->name('games_update');
Route::get('/games/by_user/{user_id}', [GameController::class, 'index'])->name('games_get');
Route::get('/games/{game_id}', [GameController::class, 'get'])->name('games_get_by_id');
// Route::get('/games/{user_id}/all', [GameController::class, 'index'])->name('games_get_all');

// [GameController::class, 'update'])->name('games_update');
// Route::get('/user/{user_id}/games/{game_id}', [GameController::class, 'index'])->name('games_get');
// Route::put('/games/{game_id}', [GameController::class, 'update']);
// Route::delete('/games/{game_id}', [GameController::class, 'destroy']);

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
Route::get('/custom_fields/games/{user_id}', [CustomFieldController::class, 'fetchCustomFields']);

// Locations
Route::post('/locations', [\App\Http\Controllers\LocationController::class, 'create'])->name('locations_create');
Route::post('/locations/{location_id}', [\App\Http\Controllers\LocationController::class, 'update'])->name('locations_update');
Route::get('/locations/{location_id}', [\App\Http\Controllers\LocationController::class, 'get'])->name('locations_get_by_id');
Route::get('/locations/user/{user_id}', [\App\Http\Controllers\LocationController::class, 'locationsByUserId'])->name('locations_get');
