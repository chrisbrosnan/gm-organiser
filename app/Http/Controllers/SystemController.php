<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;

class SystemController extends Controller
{
    public function index()
    {
        $systems = System::all();
        return response()->json($systems);
    }
}
