<?php

namespace App\Http\Controllers;

use App\Models\Scene;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SceneController extends Controller
{
    public function index(): Response
    {
        return inertia('scenes', [
            'scenes' => Scene::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        $locations = Location::where('user_id', auth()->id())->get(['id', 'name']);
        return inertia('scenes_add', [
            'locations' => $locations,
        ]);
    }

    public function show(int $scene_id): Response
    {
        $locations = Location::where('user_id', auth()->id())->get(['id', 'name']);
        return inertia('scenes_view', [
            'scene' => Scene::where('user_id', auth()->id())->findOrFail($scene_id),
            'locations' => $locations,
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location_id' => ['nullable', 'integer'],
        ]);

        $scene = new Scene;
        $scene->name = $validated['name'];
        $scene->description = $validated['description'] ?? null;
        $scene->location_id = $validated['location_id'] ?? null;
        $scene->user_id = (int) auth()->id();
        $scene->save();

        return redirect()->route('scenes.show', ['scene_id' => $scene->id]);
    }

    public function update(Request $request, int $scene_id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location_id' => ['nullable', 'integer'],
        ]);

        $scene = Scene::where('user_id', auth()->id())->findOrFail($scene_id);
        $scene->name = $validated['name'];
        $scene->description = $validated['description'] ?? null;
        $scene->location_id = $validated['location_id'] ?? null;
        $scene->save();

        return redirect()->route('scenes.show', ['scene_id' => $scene->id]);
    }
}
