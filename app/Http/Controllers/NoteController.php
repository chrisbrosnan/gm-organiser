<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class NoteController extends Controller
{
    public function index(): Response
    {
        return inertia('general_notes', [
            'notes' => Note::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('general_notes_add');
    }

    public function show(int $note_id): Response
    {
        return inertia('general_notes_view', [
            'note' => Note::where('user_id', auth()->id())->findOrFail($note_id),
        ]);
    }

    public function edit(Request $request): Response
    {
        $noteId = (int) $request->query('note_id');

        return $this->show($noteId);
    }

    public function getByUserId($user_id)
    {
        $notes = Note::where('user_id', $user_id)->get();

        return response()->json($notes);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
        ]);

        $note = new Note;
        $note->title = $validated['title'];
        $note->content = $validated['content'] ?? null;
        $note->user_id = (int) auth()->id();
        $note->save();

        $note_id = $note->id;
        Log::info('Created new note with ID: '.$note_id.' for user_id: '.$note->user_id);

        return redirect()->route('general_notes.show', ['note_id' => $note_id]);
    }

    public function update(Request $request, int $note_id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
        ]);

        $note = Note::where('user_id', auth()->id())->findOrFail($note_id);
        $note->title = $validated['title'];
        $note->content = $validated['content'] ?? null;
        $note->save();

        return redirect()->route('general_notes.show', ['note_id' => $note->id]);
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
