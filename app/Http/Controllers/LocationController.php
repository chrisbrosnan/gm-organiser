<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    public function locationsByUserId($user_id)
    {
        Log::info('Fetching locations for user_id: ' . $user_id);
        $locations = Location::where('user_id', $user_id)->get();
        Log::info('Fetched locations for user_id : ' . $user_id . ' : ' . json_encode($locations));
        return response()->json($locations);
    }

    public function get($location_id)
    {
        Log::info('Fetching location with location_id: ' . $location_id);
        $location = Location::find($location_id);

        if (!$location) {
            Log::warning('Location not found with location_id: ' . $location_id);
            return response()->json(['message' => 'Location not found'], 404);
        }

        // Convert JSON fields back to arrays for the response and remove [] from values
        $location->games = json_decode($location->games, true);
        $location->characters = json_decode($location->characters, true);
        $location->quests = json_decode($location->quests, true);
        $location->items = json_decode($location->items, true);

        Log::info('Fetched location with location_id: ' . $location_id . ' : ' . json_encode($location));
        return response()->json($location);
    }

    public function update(Request $request, $location_id): \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
    {
        Log::info('Updating location with location_id: ' . $location_id . ' and data: ' . json_encode($request->all()));

        $location = Location::find($location_id);

        if (!$location) {
            Log::warning('Location not found with location_id: ' . $location_id);
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->name = $request->input('name', $location->name);
        $location->description = $request->input('description', $location->description);
        $location->user_id = $request->input('user_id', $location->user_id);

        // Get Game ID from the request and assign it to the location
        $location->games = json_encode([str_replace('[]', '', $request->input('games'))]);

        // Combine 'pcs', 'npcs', and 'enemies' into a single characters array
        $characters = array_merge(
            str_replace('[]', '', $request->input('pcs', [])),
            str_replace('[]', '', $request->input('npcs', [])),
            str_replace('[]', '', $request->input('enemies', []))
        );
        $location->characters = json_encode($characters);

        $location->quests = json_encode(str_replace('[]', '', $request->input('quests', [])));
        $location->items = json_encode(str_replace('[]', '', $request->input('items', [])));
        $location->save();

        Log::info('Updated location with location_id: ' . $location_id . ' : ' . json_encode($location));

        // Return user to the location view page after updating
        return redirect()->route('location_single', ['location_id' => $location_id]);
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
    {
        Log::info('Creating location with data: ' . json_encode($request->all()));

        $location = new Location();

        $location->name = $request->input('name');
        $location->description = $request->input('description');
        $location->user_id = $request->input('user_id');

        // Get Game ID from the request and assign it to the location
        $location->games = json_encode([str_replace('[]', '', $request->input('games'))]);

        // Combine 'pcs', 'npcs', and 'enemies' into a single characters array
        $characters = array_merge(
            str_replace('[]', '', $request->input('pcs', [])),
            str_replace('[]', '', $request->input('npcs', [])),
            str_replace('[]', '', $request->input('enemies', []))
        );
        $location->characters = json_encode($characters);

        $location->quests = json_encode(str_replace('[]', '', $request->input('quests', [])));
        $location->items = json_encode(str_replace('[]', '', $request->input('items', [])));
        $location->save();

        // return response()->json($location, 201);
        $location_id = $location->id;
        Log::info('Created location with location_id: ' . $location_id . ' : ' . json_encode($location));
        return redirect()->route('location_single', ['location_id' => $location_id]);
    }

    public function duplicate(Request $request): \Illuminate\Http\JsonResponse
    {
        $location_id = $request->query('location_id');
        Log::info('Duplicating location with location_id: ' . $location_id);

        $location = Location::find($location_id);

        if (!$location) {
            Log::warning('Location not found with location_id: ' . $location_id);
            return response()->json(['message' => 'Location not found'], 404);
        }

        $newLocation = $location->replicate();
        $newLocation->name = $newLocation->name . ' (Copy)';
        $newLocation->save();

        Log::info('Duplicated location with new location_id: ' . $newLocation->id);

        return response()->json($newLocation, 201);
    }

    public function delete(Request $request): \Illuminate\Http\JsonResponse
    {
        $location_id = $request->query('location_id');
        Log::info('Deleting location with location_id: ' . $location_id);

        $location = Location::find($location_id);

        if (!$location) {
            Log::warning('Location not found with location_id: ' . $location_id);
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->delete();

        Log::info('Deleted location with location_id: ' . $location_id);

        return response()->json(['message' => 'Location deleted successfully'], 200);
    }
}
