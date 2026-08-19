<?php

namespace App\Http\Controllers;

use App\Models\System;
use Inertia\Response;

class SystemController extends Controller
{
    public function page(): Response
    {
        return inertia('systems');
    }

    public function index()
    {
        $systems = System::all();

        return response()->json($systems);
    }
}
