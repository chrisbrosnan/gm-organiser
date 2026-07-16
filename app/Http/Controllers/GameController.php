<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::all()->where('user_id', auth()->id());
        return response()->json($games);
    }
}
