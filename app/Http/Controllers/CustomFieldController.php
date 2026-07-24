<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomField;

class CustomFieldController extends Controller
{
    public function fetchCustomFields($user_id)
    {
        $customFields = \App\Models\CustomField::where('user_id', $user_id)->get();
        return response()->json($customFields);
    }
}
