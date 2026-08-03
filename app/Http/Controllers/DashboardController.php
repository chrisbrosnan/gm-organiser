<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            // Fetch all games for the authenticated user and get system name from systems table for each
            'games' => Game::getGamesByUserId(auth()->user()->id),
        ]);
    }
}
