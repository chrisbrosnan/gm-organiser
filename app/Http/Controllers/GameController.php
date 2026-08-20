<?php

namespace App\Http\Controllers;

use App\Concerns\HandlesObjectAttachments;
use App\Models\Character;
use App\Models\CustomField;
use App\Models\Game;
use App\Models\Location;
use App\Models\Scene;
use App\Models\System;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class GameController extends Controller
{
    use HandlesObjectAttachments;

    public function new()
    {
        return $this->games_form_add();
    }

    public function create(Request $request): JsonResponse
    {
        return $this->new_game($request);
    }

    public function index()
    {
        $games = Game::where('user_id', auth()->id())->get();

        return inertia('games', [
            'games' => $games,
        ]);
    }

    public function show($game_id)
    {
        $game = Game::find($game_id);

        Gate::authorize('view', $game);

        return inertia('games_view', [
            'game' => $game,
            'locations' => Location::where('user_id', auth()->id())->get(),
            'npcs' => Character::where([
                ['user_id', auth()->id()],
                ['type', 'npc'],
            ])->get(),
            'player_characters' => Character::where([
                ['user_id', auth()->id()],
                ['type', 'pc'],
            ])->get(),
            'systems' => System::all(),
            'custom_fields' => CustomField::where('user_id', auth()->id())->get(),
            'scenes' => Scene::where('user_id', auth()->id())->get(),
        ]);
    }

    public function games_form_add()
    {
        return inertia('games_add', [
            'locations' => Location::where('user_id', auth()->id())->get(),
            'npcs' => Character::where([
                ['user_id', auth()->id()],
                ['type', 'npc'],
            ])->get(),
            'player_characters' => Character::where([
                ['user_id', auth()->id()],
                ['type', 'pc'],
            ])->get(),
            'systems' => System::all(),
            'custom_fields' => CustomField::where('user_id', auth()->id())->get(),
            'scenes' => Scene::where('user_id', auth()->id())->get(),
        ]);
    }

    public function new_game(Request $request): JsonResponse
    {
        Log::info('Creating game with data: '.json_encode($request->all()).' files: '.json_encode(array_keys($request->allFiles())));

        $request->validate($this->attachmentValidationRules());

        $game = new Game;
        $game->user_id = (int) auth()->id();
        $game->name = $request->input('title');
        $game->system_id = $request->input('system');
        $game->description = $request->input('description');
        $game->type = $request->input('type');

        $game->meta_data = [
            'locations' => $request->input('locations', []),
            'player_characters' => $request->input('player_characters', []),
            'npcs' => $request->input('npcs', []),
            'notes' => $request->input('notes', ''),
            'scenes' => $request->input('scenes', []),
        ];

        $this->storeObjectAttachments($request, $game, 'game');
        $game->save();

        return response()->json($game, 201);
    }

    public function update(Request $request, $game_id): RedirectResponse|JsonResponse
    {
        Log::info('Updating game with game_id: '.$game_id.' and data: '.json_encode($request->all()).' files: '.json_encode(array_keys($request->allFiles())));

        $request->validate($this->attachmentValidationRules());

        $game = Game::where('user_id', auth()->id())->find($game_id);

        if (! $game) {
            Log::warning('Game not found with game_id: '.$game_id);

            return response()->json(['message' => 'Game not found'], 404);
        }

        $game->name = $request->input('title', $game->name);
        $game->system_id = $request->input('system', $game->system_id);
        $game->description = $request->input('description', $game->description);
        $game->type = $request->input('type', $game->type);

        // $game->meta_data['locations'] = $request->input('locations', $game->meta_data['locations'] ?? []);
        $game->meta_data = array_merge($game->meta_data ?? [], [
            'locations' => $request->input('locations', $game->meta_data['locations'] ?? []),
        ]);
        // $game->meta_data['player_characters'] = $request->input('player_characters', $game->meta_data['player_characters'] ?? []);
        $game->meta_data = array_merge($game->meta_data ?? [], [
            'player_characters' => $request->input('player_characters', $game->meta_data['player_characters'] ?? []),
        ]);
        // $game->meta_data['npcs'] = $request->input('npcs', $game->meta_data['npcs'] ?? []);
        $game->meta_data = array_merge($game->meta_data ?? [], [
            'npcs' => $request->input('npcs', $game->meta_data['npcs'] ?? []),
        ]);
        // $game->meta_data['notes'] = $request->input('notes', $game->meta_data['notes'] ?? '');
        $game->meta_data = array_merge($game->meta_data ?? [], [
            'notes' => $request->input('notes', $game->meta_data['notes'] ?? ''),
        ]);

        // $game->meta_data['scenes'] = $request->input('scenes', $game->meta_data['scenes'] ?? []);
        $game->meta_data = array_merge($game->meta_data ?? [], [
            'scenes' => $request->input('scenes', $game->meta_data['scenes'] ?? []),
        ]);

        // For each custom field, update the meta_data with the value from the request
        $customFields = $request->input('custom_fields', []);
        foreach ($customFields as $field) {
            $game->meta_data = array_merge($game->meta_data ?? [], [
                $field['field'] => $field['value'],
            ]);
        }

        $this->storeObjectAttachments($request, $game, 'game');
        $game->save();

        Log::info('Updated game with game_id: '.$game_id.' : '.json_encode($game));

        // Return user to the game view page after updating
        return redirect()->route('games.show', ['game_id' => $game_id])->with('success', 'Game updated successfully.');
    }

    public function duplicate(Request $request): JsonResponse
    {
        $game_id = $request->query('game_id');
        Log::info('Duplicating game with game_id: '.$game_id);

        $game = Game::find($game_id);

        if (! $game) {
            Log::warning('Game not found with game_id: '.$game_id);

            return response()->json(['message' => 'Game not found'], 404);
        }

        $newGame = $game->replicate();
        $newGame->name = $newGame->name.' (Copy)';
        $newGame->save();

        Log::info('Duplicated game with new game_id: '.$newGame->id);

        return response()->json($newGame, 201);
    }

    public function delete(Request $request): RedirectResponse|JsonResponse
    {
        $game_id = $request->query('game_id');
        Log::info('Deleting game with game_id: '.$game_id);

        $game = Game::find($game_id);

        if (! $game) {
            Log::warning('Game not found with game_id: '.$game_id);

            return response()->json(['message' => 'Game not found'], 404);
        }

        $game->delete();
        Log::info('Deleted game with game_id: '.$game_id);

        return redirect()->route('games')->with('success', 'Game deleted successfully.');
    }

    // -----

    public function gamesByUserId($user_id)
    {
        Log::info('Fetching games for user_id: '.$user_id);
        $games = Game::getGamesByUserId($user_id);
        Log::info('Fetched games for user_id : '.$user_id.' : '.json_encode($games));

        return response()->json($games);
    }

    // public function get($game_id)
    // {
    //     Log::info('Fetching game with game_id: ' . $game_id);
    //     $game = Game::find($game_id);

    //     if (!$game) {
    //         Log::warning('Game not found with game_id: ' . $game_id);
    //         return response()->json(['message' => 'Game not found'], 404);
    //     }

    //     Log::info('Fetched game with game_id: ' . $game_id . ' : ' . json_encode($game));
    //     return response()->json($game);
    // }

    // public function index($user_id)
    // {
    //     Log::info('Fetching all games for user_id: ' . $user_id);
    //     $games = Game::where('user_id', $user_id)->get();

    //     Log::info('Fetched games for user_id: ' . $user_id . ' : ' . json_encode($games));
    //     return response()->json($games);
    // }
}
