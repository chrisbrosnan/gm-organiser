<?php

namespace App\Http\Controllers;

use App\Concerns\HandlesObjectAttachments;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ItemController extends Controller
{
    use HandlesObjectAttachments;

    public function index(): Response
    {
        return inertia('items', [
            'items' => Item::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('items_add');
    }

    public function show(int $item_id): Response
    {
        return inertia('items_view', [
            'item' => Item::with('thumbnail')->where('user_id', auth()->id())->findOrFail($item_id),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $item = new Item;
        $item->name = $validated['name'];
        $item->type = $validated['type'] ?? null;
        $item->description = $validated['description'] ?? null;
        $item->user_id = (int) auth()->id();
        $this->storeObjectAttachments($request, $item, 'item');
        $item->save();

        return redirect()->route('items.show', ['item_id' => $item->id]);
    }

    public function update(Request $request, int $item_id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            ...$this->attachmentValidationRules(),
        ]);

        $item = Item::where('user_id', auth()->id())->findOrFail($item_id);
        $item->name = $validated['name'];
        $item->type = $validated['type'] ?? null;
        $item->description = $validated['description'] ?? null;
        $this->storeObjectAttachments($request, $item, 'item');
        $item->save();

        return redirect()->route('items.show', ['item_id' => $item->id]);
    }
}
