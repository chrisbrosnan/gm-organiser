<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    public function getByUserId($user_id)
    {
        $notes = Note::where('user_id', $user_id)->get();
        return response()->json($notes);
    }

    public function create(Request $request)
    {
        $note = new Note();
        $note->title = $request->input('title');
        $note->content = $request->input('content');
        $note->user_id = $request->input('user_id');
        $note->save();

        $note_id = $note->id;
        Log::info('Created new note with ID: ' . $note_id . ' for user_id: ' . $note->user_id);

        return redirect()->route('general_notes_single', ['note_id' => $note_id]);
    }

    public function get($note_id)
    {
        $note = Note::find($note_id);
        if ($note) {
            return response()->json($note);
        } else {
            return response()->json(['error' => 'Note not found'], 404);
        }
    }

    public function delete($note_id)
    {
        $note = Note::find($note_id);
        if ($note) {
            $note->delete();
            return redirect()->route('general_notes')->with('success', 'Note deleted successfully.');
        } else {
            return response()->json(['error' => 'Note not found'], 404);
        }
    }
}
