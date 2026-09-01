<?php

use App\Models\Character;
use App\Models\Game;
use App\Models\Location;
use App\Models\Scene;
use App\Models\User;

test('updating a game removes unselected related records', function () {
    $user = User::factory()->create();
    $game = new Game;
    $game->name = 'The Lost Mine';
    $game->type = 'campaign';
    $game->user_id = $user->id;
    $game->system_id = 1;
    $game->meta_data = [
        'locations' => [1, 2],
        'scenes' => [1],
        'player_characters' => [1],
        'npcs' => [2],
    ];
    $game->save();
    $firstLocation = new Location;
    $firstLocation->name = 'Mine Entrance';
    $firstLocation->user_id = $user->id;
    $firstLocation->games = [$game->id];
    $firstLocation->save();
    $secondLocation = new Location;
    $secondLocation->name = 'Old Shaft';
    $secondLocation->user_id = $user->id;
    $secondLocation->games = [$game->id];
    $secondLocation->save();
    $scene = new Scene;
    $scene->name = 'The Collapse';
    $scene->user_id = $user->id;
    $scene->games = [$game->id];
    $scene->save();
    $playerCharacter = new Character;
    $playerCharacter->name = 'Mira';
    $playerCharacter->type = 'pc';
    $playerCharacter->user_id = $user->id;
    $playerCharacter->games = [$game->id];
    $playerCharacter->save();
    $nonPlayerCharacter = new Character;
    $nonPlayerCharacter->name = 'Miner';
    $nonPlayerCharacter->type = 'npc';
    $nonPlayerCharacter->user_id = $user->id;
    $nonPlayerCharacter->games = [$game->id];
    $nonPlayerCharacter->save();

    $this->actingAs($user)
        ->post(route('games.update', ['game_id' => $game->id]), [
            'title' => $game->name,
            'type' => $game->type,
            'system' => $game->system_id,
        ])
        ->assertRedirect(route('games.show', ['game_id' => $game->id]));

    $game->refresh();
    $firstLocation->refresh();
    $secondLocation->refresh();
    $scene->refresh();
    $playerCharacter->refresh();
    $nonPlayerCharacter->refresh();

    expect($game->meta_data['locations'])->toBe([])
        ->and($game->meta_data['scenes'])->toBe([])
        ->and($game->meta_data['player_characters'])->toBe([])
        ->and($game->meta_data['npcs'])->toBe([])
        ->and($firstLocation->games)->toBe([])
        ->and($secondLocation->games)->toBe([])
        ->and($scene->games)->toBe([])
        ->and($playerCharacter->games)->toBe([])
        ->and($nonPlayerCharacter->games)->toBe([]);
});

test('creating a game adds it to selected related records', function () {
    $user = User::factory()->create();
    $location = new Location;
    $location->name = 'Mine Entrance';
    $location->user_id = $user->id;
    $location->save();
    $scene = new Scene;
    $scene->name = 'The Collapse';
    $scene->user_id = $user->id;
    $scene->save();
    $playerCharacter = new Character;
    $playerCharacter->name = 'Mira';
    $playerCharacter->type = 'pc';
    $playerCharacter->user_id = $user->id;
    $playerCharacter->save();
    $nonPlayerCharacter = new Character;
    $nonPlayerCharacter->name = 'Miner';
    $nonPlayerCharacter->type = 'npc';
    $nonPlayerCharacter->user_id = $user->id;
    $nonPlayerCharacter->save();

    $this->actingAs($user)
        ->post(route('games.create'), [
            'title' => 'The Lost Mine',
            'type' => 'campaign',
            'system' => 1,
            'locations' => [$location->id],
            'scenes' => [$scene->id],
            'pcs' => [$playerCharacter->id],
            'npcs' => [$nonPlayerCharacter->id],
        ])
        ->assertRedirect();

    $game = Game::query()->sole();
    $location->refresh();
    $scene->refresh();
    $playerCharacter->refresh();
    $nonPlayerCharacter->refresh();

    expect($game->meta_data['locations'])->toBe([$location->id])
        ->and($game->meta_data['scenes'])->toBe([$scene->id])
        ->and($game->meta_data['player_characters'])->toBe([$playerCharacter->id])
        ->and($game->meta_data['npcs'])->toBe([$nonPlayerCharacter->id])
        ->and($location->games)->toBe([$game->id])
        ->and($scene->games)->toBe([$game->id])
        ->and($playerCharacter->games)->toBe([$game->id])
        ->and($nonPlayerCharacter->games)->toBe([$game->id]);
});

test('updating a location removes it from unselected games', function () {
    $user = User::factory()->create();
    $location = new Location;
    $location->name = 'Mine Entrance';
    $location->user_id = $user->id;
    $location->save();
    $game = new Game;
    $game->name = 'The Lost Mine';
    $game->type = 'campaign';
    $game->system_id = 1;
    $game->user_id = $user->id;
    $game->meta_data = ['locations' => [$location->id]];
    $game->save();
    $location->games = [$game->id];
    $location->save();

    $this->actingAs($user)
        ->post(route('locations.update', ['location_id' => $location->id]), [
            'name' => $location->name,
        ])
        ->assertRedirect(route('locations.show', ['location_id' => $location->id]));

    $game->refresh();
    $location->refresh();

    expect($location->games)->toBe([])
        ->and($game->meta_data['locations'])->toBe([]);
});
