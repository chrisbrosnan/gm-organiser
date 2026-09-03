<?php

namespace App\Http\Controllers;

use App\Concerns\HandlesObjectAttachments;
use App\Models\Spell;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Character;

class SpellController extends Controller
{
    use HandlesObjectAttachments;

    public function index(): Response
    {
        return inertia('spells', [
            'spells' => Spell::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('spells_add', [
            'pc_characters' => Character::where('user_id', auth()->id())->where('type', 'pc')->get(),
            'npc_characters' => Character::where('user_id', auth()->id())->where('type', 'npc')->get(),
            'enemy_characters' => Character::where('user_id', auth()->id())->where('type', 'enemy')->get(),
        ]);
    }

    public function show(int $spell_id): Response
    {
        return inertia('spells_view', [
            'spell' => Spell::with('thumbnail')->where('user_id', auth()->id())->findOrFail($spell_id),
            'pc_characters' => Character::where('user_id', auth()->id())->where('type', 'pc')->get(),
            'npc_characters' => Character::where('user_id', auth()->id())->where('type', 'npc')->get(),
            'enemy_characters' => Character::where('user_id', auth()->id())->where('type', 'enemy')->get(),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $spell = new Spell;
        $spell->name = $validated['name'];
        $spell->description = $validated['description'] ?? null;
        $spell->meta_data = [
            'pc_characters' => $request->input('pc_characters', []),
            'npc_characters' => $request->input('npc_characters', []),
            'enemy_characters' => $request->input('enemy_characters', []),
        ];
        $spell->user_id = (int) auth()->id();
        $this->storeObjectAttachments($request, $spell, 'spell');
        $spell->save();

        return redirect()->route('spells.show', ['spell_id' => $spell->id]);
    }

    public function update(Request $request, int $spell_id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $spell = Spell::where('user_id', auth()->id())->findOrFail($spell_id);
        $spell->name = $validated['name'];
        $spell->description = $validated['description'] ?? null;
        $spell->meta_data = [
            'pc_characters' => $request->input('pc_characters', []),
            'npc_characters' => $request->input('npc_characters', []),
            'enemy_characters' => $request->input('enemy_characters', []),
        ];
        $this->storeObjectAttachments($request, $spell, 'spell');
        $spell->save();

        return redirect()->route('spells.show', ['spell_id' => $spell->id]);
    }
}
