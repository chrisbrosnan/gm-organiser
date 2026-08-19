<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CharacterController extends Controller
{
    public function index(): Response
    {
        return inertia('characters', [
            'characters' => Character::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('characters_add');
    }

    public function show(int $character_id): Response
    {
        return inertia('characters_view', [
            'character' => Character::where('user_id', auth()->id())->findOrFail($character_id),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:npc,pc,enemy'],
            'bio' => ['nullable', 'string'],
        ]);

        $character = new Character;
        $character->name = $validated['name'];
        $character->type = $validated['type'];
        $character->bio = $validated['bio'] ?? null;
        $character->user_id = (int) auth()->id();
        $character->save();

        return redirect()->route('characters.show', ['character_id' => $character->id]);
    }

    public function update(Request $request, int $character_id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:npc,pc,enemy'],
            'bio' => ['nullable', 'string'],
        ]);

        $character = Character::where('user_id', auth()->id())->findOrFail($character_id);
        $character->name = $validated['name'];
        $character->type = $validated['type'];
        $character->bio = $validated['bio'] ?? null;
        $character->save();

        return redirect()->route('characters.show', ['character_id' => $character->id]);
    }

    public function fetchPlayerCharacters($user_id)
    {
        $characters = Character::where('user_id', $user_id)
            ->where('type', 'pc')
            ->get();

        return response()->json($characters);
    }

    public function fetchNonPlayerCharacters($user_id)
    {
        $characters = Character::where('user_id', $user_id)
            ->where('type', 'npc')
            ->get();

        return response()->json($characters);
    }

    public function fetchEnemyCharacters($user_id)
    {
        $characters = Character::where('user_id', $user_id)
            ->where('type', 'enemy')
            ->get();

        return response()->json($characters);
    }
}
