<?php

use App\Models\Game;
use App\Models\User;

test('updating a game removes unselected locations', function () {
    $user = User::factory()->create();
    $game = new Game;
    $game->name = 'The Lost Mine';
    $game->type = 'campaign';
    $game->user_id = $user->id;
    $game->system_id = 1;
    $game->meta_data = [
        'locations' => [1, 2],
    ];
    $game->save();

    $this->actingAs($user)
        ->post(route('games.update', ['game_id' => $game->id]), [
            'title' => $game->name,
            'type' => $game->type,
            'system' => $game->system_id,
        ])
        ->assertRedirect(route('games.show', ['game_id' => $game->id]));

    $game->refresh();

    expect($game->meta_data['locations'])->toBe([]);
});
