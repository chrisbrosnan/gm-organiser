<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Log;

class GameController extends Controller
{
    public function gamesByUserId($user_id)
    {
        Log::info('Fetching games for user_id: ' . $user_id);
        $games = Game::getGamesByUserId($user_id);
        Log::info('Fetched games for user_id : ' . $user_id . ' : ' . json_encode($games));
        return response()->json($games);
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        Log::info('Creating game with data: ' . json_encode($request->all()));

        $game = new Game();
        $game->user_id = $request->input('user_id');
        $game->name = $request->input('title');
        $game->system_id = $request->input('system');
        $game->description = $request->input('description');
        $game->type = $request->input('type');
        $game->save();

        return response()->json($game, 201);
    }

    public function update(Request $request, $game_id): \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
    {
        Log::info('Updating game with game_id: ' . $game_id . ' and data: ' . json_encode($request->all()));

        $game = Game::find($game_id);

        if (!$game) {
            Log::warning('Game not found with game_id: ' . $game_id);
            return response()->json(['message' => 'Game not found'], 404);
        }

        $game->name = $request->input('title', $game->name);
        $game->system_id = $request->input('system', $game->system_id);
        $game->description = $request->input('description', $game->description);
        $game->type = $request->input('type', $game->type);
        $game->save();

        Log::info('Updated game with game_id: ' . $game_id . ' : ' . json_encode($game));

        // Return user to the game view page after updating
        return redirect()->route('game_single', ['game_id' => $game_id]);
    }

    public function duplicate(Request $request): \Illuminate\Http\JsonResponse
    {
        $game_id = $request->query('game_id');
        Log::info('Duplicating game with game_id: ' . $game_id);

        $game = Game::find($game_id);

        if (!$game) {
            Log::warning('Game not found with game_id: ' . $game_id);
            return response()->json(['message' => 'Game not found'], 404);
        }

        $newGame = $game->replicate();
        $newGame->name = $newGame->name . ' (Copy)';
        $newGame->save();

        Log::info('Duplicated game with new game_id: ' . $newGame->id);

        return response()->json($newGame, 201);
    }

    public function delete(Request $request): \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
    {
        $game_id = $request->query('game_id');
        Log::info('Deleting game with game_id: ' . $game_id);

        $game = Game::find($game_id);

        if (!$game) {
            Log::warning('Game not found with game_id: ' . $game_id);
            return response()->json(['message' => 'Game not found'], 404);
        }

        $game->delete();
        Log::info('Deleted game with game_id: ' . $game_id);

        return redirect()->route('games')->with('success', 'Game deleted successfully.');
    }

    public function get($game_id)
    {
        Log::info('Fetching game with game_id: ' . $game_id);
        $game = Game::find($game_id);

        if (!$game) {
            Log::warning('Game not found with game_id: ' . $game_id);
            return response()->json(['message' => 'Game not found'], 404);
        }

        Log::info('Fetched game with game_id: ' . $game_id . ' : ' . json_encode($game));
        return response()->json($game);
    }

    public function index($user_id)
    {
        Log::info('Fetching all games for user_id: ' . $user_id);
        $games = Game::where('user_id', $user_id)->get();

        Log::info('Fetched games for user_id: ' . $user_id . ' : ' . json_encode($games));
        return response()->json($games);
    }
}
