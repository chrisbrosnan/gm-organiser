import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { general_notes } from '@/routes';
import FormBuilder from '@/components/form-builder';
import { useEffect, useState } from 'react';

export default function GeneralNotes({ auth }: { auth: { user: { id: string | number } } }) {
    const [customFields, setCustomFields] = useState<Array<{ field: string; type: string }>>([]);
    const [noteData, setNoteData] = useState<any>(null);
    const params = new URLSearchParams(window.location.search);
    const note_id = params.get('note_id');

    useEffect(() => {
        fetch(`/api/custom_fields/general_notes/by_user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setCustomFields(data));

        fetch(`/api/notes/${note_id}`)
            .then(response => response.json())
            .then(data => setNoteData(data));
    }, []);

    console.log('noteData: ', noteData);

    return (
        <>
            <Head title="General Notes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Note</h1>
                <FormBuilder
                    action="/api/notes"
                    method="POST"
                    fields={[
                        { label: '', name: 'csrf_token', type: 'hidden' },
                        { label: '', name: 'user_id', type: 'hidden' },

                        { label: 'Summary', name: 'title', type: 'text', value: noteData?.title ?? '' },
                        { label: 'Content', name: 'content', type: 'textarea', value: noteData?.content ?? '' },

                        // For each custom field found, generate a matching input field with the name of the custom field as the label and name, and type text
                        ...(customFields.length > 0
                            ? [
                                { label: 'Custom Fields', name: 'custom_fields', type: 'hidden', html_content: '<p class="text-sm text-gray-500">The following custom fields for Games are added. Please fill them out as needed.</p>' },
                                ...customFields.map(customField => (
                                    { label: customField?.field, name: customField?.field, type: customField?.type, value: noteData?.custom_fields?.[customField?.field] ?? '' }
                                ))
                                ] :
                            [
                                { label: 'Custom Fields', name: 'custom_fields', type: 'hidden', html_content: '<p class="text-sm text-gray-500">No custom fields for Games are added. You can add them on the Custom Fields page.</p>' }
                            ]
                        ),
                        // Buttons
                        { label: '', name: 'submit', type: 'submit' },
                        { label: '', name: 'clear', type: 'reset' },

                    ]}
                />
            </div>
        </>
    );
}

GeneralNotes.layout = {
    breadcrumbs: [
        {
            title: 'General Notes',
            href: general_notes(),
        }
    ],
};
