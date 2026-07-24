<?php

namespace App\Http\Controllers;
use App\Models\Character;

use Illuminate\Http\Request;

class CharacterController extends Controller
{
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
