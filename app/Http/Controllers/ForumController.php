<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ForumController extends Controller
{
    public function index(): Response
    {
        return inertia('forums', [
            'forums' => Forum::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('forums_add');
    }

    public function show(int $forum_id): Response
    {
        return inertia('forums_view', [
            'forum' => Forum::where('user_id', auth()->id())->findOrFail($forum_id),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'parent_id' => ['nullable', 'integer'],
        ]);

        $forum = new Forum;
        $forum->title = $validated['title'];
        $forum->content = $validated['content'];
        $forum->parent_id = $validated['parent_id'] ?? null;
        $forum->user_id = (int) auth()->id();
        $forum->save();

        return redirect()->route('forums.show', ['forum_id' => $forum->id]);
    }

    public function update(Request $request, int $forum_id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'parent_id' => ['nullable', 'integer'],
        ]);

        $forum = Forum::where('user_id', auth()->id())->findOrFail($forum_id);
        $forum->title = $validated['title'];
        $forum->content = $validated['content'];
        $forum->parent_id = $validated['parent_id'] ?? null;
        $forum->save();

        return redirect()->route('forums.show', ['forum_id' => $forum->id]);
    }
}
