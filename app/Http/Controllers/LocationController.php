<?php

namespace App\Http\Controllers;

use App\Actions\SyncGameAssociations;
use App\Concerns\HandlesObjectAttachments;
use App\Models\Character;
use App\Models\CustomField;
use App\Models\Game;
use App\Models\Item;
use App\Models\Location;
use App\Models\Quest;
use App\Models\Scene;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LocationController extends Controller
{
    use HandlesObjectAttachments;

    public function __construct(private SyncGameAssociations $gameAssociations) {}

    public function new()
    {
        return inertia('locations_add');
    }

    public function index()
    {
        $locations = Location::where('user_id', auth()->id())->get();

        return inertia('locations', [
            'locations' => $locations,
        ]);
    }

    public function locationsByUserId($user_id)
    {
        Log::info('Fetching locations for user_id: '.$user_id);
        $locations = Location::where('user_id', $user_id)->get();
        Log::info('Fetched locations for user_id : '.$user_id.' : '.json_encode($locations));

        return response()->json($locations);
    }

    public function get($location_id)
    {
        Log::info('Fetching location with location_id: '.$location_id);
        $location = Location::where('user_id', auth()->id())->find($location_id);

        if (! $location) {
            Log::warning('Location not found with location_id: '.$location_id);

            return response()->json(['message' => 'Location not found'], 404);
        }

        Log::info('Fetched location with location_id: '.$location_id.' : '.json_encode($location));

        return response()->json($location);
    }

    public function update(Request $request, $location_id): RedirectResponse|JsonResponse
    {
        Log::info('Updating location with location_id: '.$location_id.' and data: '.json_encode($request->all()));

        $location = Location::find($location_id);

        if (! $location) {
            Log::warning('Location not found with location_id: '.$location_id);

            return response()->json(['message' => 'Location not found'], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $location->name = $validated['name'];
        $location->description = $validated['description'] ?? null;

        // Allow multiple values for games, pcs, npcs, enemies, quests, and items by removing '[]' from the values
        $location->games = $this->gameAssociations->normalizeIds($request->input('games', []));

        $location->meta_data = json_encode([
            'scenes' => $request->input('scenes', []),
            'npc_characters' => $request->input('npc_characters', []),
            'enemy_characters' => $request->input('enemy_characters', []),
            'items' => $request->input('items', [])
        ]);

        $this->storeObjectAttachments($request, $location, 'location');
        $location->save();
        $this->gameAssociations->syncFromLocation($location);

        Log::info('Updated location with location_id: '.$location_id.' : '.json_encode($location));

        // Return user to the location view page after updating
        return redirect()->route('locations.show', ['location_id' => $location_id]);
    }

    public function show($location_id)
    {
        $location = Location::with('thumbnail')
            ->where('user_id', auth()->id())
            ->findOrFail($location_id);
        $location->games = $this->gameAssociations->normalizeIds($location->games);

        return inertia('locations_view', [
            'location' => $location,
            'games' => Game::where('user_id', auth()->id())->get(),
            'scenes' => Scene::where('user_id', auth()->id())->get(),
            'npc_characters' => Character::where('user_id', auth()->id())->where('type', 'npc')->get(),
            'enemy_characters' => Character::where('user_id', auth()->id())->where('type', 'enemy')->get(),
            'quests' => Quest::where('user_id', auth()->id())->get(),
            'items' => Item::where('user_id', auth()->id())->get(),
            'custom_fields' => CustomField::where('user_id', auth()->id())->get(),
        ]);
    }

    public function create(Request $request): JsonResponse|RedirectResponse
    {
        Log::info('Creating location with data: '.json_encode($request->all()));

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $location = new Location;

        $location->name = $validated['name'];
        $location->description = $validated['description'] ?? null;
        $location->user_id = (int) auth()->id();

        // Allow multiple values for games, pcs, npcs, enemies, quests, and items by removing '[]' from the values
        $location->games = $this->gameAssociations->normalizeIds($request->input('games', []));

        $location->meta_data = json_encode([
            'npc_characters' => $request->input('npc_characters', []),
            'enemy_characters' => $request->input('enemy_characters', []),
            'quests' => $request->input('quests', []),
            'items' => $request->input('items', []),
        ]);

        $this->storeObjectAttachments($request, $location, 'location');
        $location->save();
        $this->gameAssociations->syncFromLocation($location);

        // return response()->json($location, 201);
        $location_id = $location->id;
        Log::info('Created location with location_id: '.$location_id.' : '.json_encode($location));

        return redirect()->route('locations.show', ['location_id' => $location_id]);
    }

    public function duplicate(Request $request): JsonResponse
    {
        $location_id = $request->query('location_id');
        Log::info('Duplicating location with location_id: '.$location_id);

        $location = Location::find($location_id);

        if (! $location) {
            Log::warning('Location not found with location_id: '.$location_id);

            return response()->json(['message' => 'Location not found'], 404);
        }

        $newLocation = $location->replicate();
        $newLocation->name = $newLocation->name.' (Copy)';
        $newLocation->save();

        Log::info('Duplicated location with new location_id: '.$newLocation->id);

        return response()->json($newLocation, 201);
    }

    public function delete(Request $request): JsonResponse
    {
        $location_id = $request->query('location_id');
        Log::info('Deleting location with location_id: '.$location_id);

        $location = Location::find($location_id);

        if (! $location) {
            Log::warning('Location not found with location_id: '.$location_id);

            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->delete();

        Log::info('Deleted location with location_id: '.$location_id);

        return response()->json(['message' => 'Location deleted successfully'], 200);
    }
}
