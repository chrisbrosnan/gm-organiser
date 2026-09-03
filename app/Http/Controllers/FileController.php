<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attachment;

class FileController extends Controller
{
    public function index()
    {
        $attachments = Attachment::where('user_id', auth()->id())->get();

        return inertia('files', [
            'files' => $attachments
        ]);
    }
}
