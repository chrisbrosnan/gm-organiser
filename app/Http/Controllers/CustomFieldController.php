<?php

namespace App\Http\Controllers;

use App\Models\CustomField;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CustomFieldController extends Controller
{
    public function index(): Response
    {
        return inertia('custom_fields', [
            'custom_fields' => CustomField::where('user_id', auth()->id())->latest()->get(),
        ]);
    }

    public function new(): Response
    {
        return inertia('custom_fields_add');
    }

    public function show(int $field_id): Response
    {
        return inertia('custom_fields_view', [
            'custom_field' => CustomField::where('user_id', auth()->id())->findOrFail($field_id),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'field' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'object_type' => ['required', 'string', 'max:255'],
        ]);

        $customField = new CustomField;
        $customField->field = $validated['field'];
        $customField->value = $validated['value'];
        $customField->type = $validated['type'];
        $customField->object_type = $validated['object_type'];
        $customField->user_id = (int) auth()->id();
        $customField->save();

        return redirect()->route('custom_fields.show', ['field_id' => $customField->id]);
    }

    public function update(Request $request, int $field_id): RedirectResponse
    {
        $validated = $request->validate([
            'field' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'object_type' => ['required', 'string', 'max:255'],
        ]);

        $customField = CustomField::where('user_id', auth()->id())->findOrFail($field_id);
        $customField->field = $validated['field'];
        $customField->value = $validated['value'];
        $customField->type = $validated['type'];
        $customField->object_type = $validated['object_type'];
        $customField->save();

        return redirect()->route('custom_fields.show', ['field_id' => $customField->id]);
    }

    public function remove(int $field_id): RedirectResponse
    {
        $customField = CustomField::where('user_id', auth()->id())->findOrFail($field_id);
        $customField->delete();

        return redirect()->route('custom_fields');
    }

    public function fetchCustomFields($user_id)
    {
        $customFields = CustomField::where('user_id', $user_id)
            ->where('object_type', 'games')
            ->get();

        return response()->json($customFields);
    }

    public function fetchGeneralNotesCustomFields($user_id)
    {
        $customFields = CustomField::where('user_id', $user_id)
            ->whereIn('object_type', ['general_notes', 'general-notes'])
            ->get();

        return response()->json($customFields);
    }
}
