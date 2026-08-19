<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class QuestController extends Controller
{
    public function index(): Response
    {
        return inertia('quests', [
            'quests' => Quest::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('quests_add');
    }

    public function show(int $quest_id): Response
    {
        return inertia('quests_view', [
            'quest' => Quest::where('user_id', auth()->id())->findOrFail($quest_id),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $quest = new Quest;
        $quest->name = $validated['name'];
        $quest->type = $validated['type'] ?? null;
        $quest->description = $validated['description'] ?? null;
        $quest->user_id = (int) auth()->id();
        $quest->save();

        return redirect()->route('quests.show', ['quest_id' => $quest->id]);
    }

    public function update(Request $request, int $quest_id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $quest = Quest::where('user_id', auth()->id())->findOrFail($quest_id);
        $quest->name = $validated['name'];
        $quest->type = $validated['type'] ?? null;
        $quest->description = $validated['description'] ?? null;
        $quest->save();

        return redirect()->route('quests.show', ['quest_id' => $quest->id]);
    }
}
