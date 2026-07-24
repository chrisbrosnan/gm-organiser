import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import FormBuilder from '@/components/form-builder';
import { games } from '@/routes';
import { useEffect, useState } from 'react';

export default function GamesAdd({ auth }: { auth: { user: { id: string | number } } }) {

    // Fetch All Games for User from API
    const [systems, setSystems] = useState<Array<{ id: string | number; name: string }>>([]);
    const [pcs, setPcs] = useState<Array<{ id: string | number; name: string }>>([]);
    const [customFields, setCustomFields] = useState<Array<{ field: string; type: string }>>([]);

    useEffect(() => {
        fetch(`/api/systems`)
            .then(response => response.json())
            .then(data => setSystems(data))
            .catch(() => setSystems([]));

        fetch(`/api/characters/pcs/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setPcs(data))
            .catch(() => setPcs([]));

        fetch(`/api/custom_fields/games/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setCustomFields(data))
            .catch(() => setCustomFields([]));

    }, []);

    console.log(systems);

    // Get user_id from authenticated user

    return (
        <>
            <Head title="Add Game" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Add Game</h1>
                <FormBuilder
                    action="/api/games"
                    method="POST"
                    fields={[
                        { label: '', name: 'csrf_token', type: 'hidden', value: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '' },
                        { label: '', name: 'user_id', type: 'hidden', value: String(auth.user.id) },
                        { label: 'Title', name: 'title', type: 'text' },
                        // { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                        { label: 'Description', name: 'description', type: 'text' },
                        // If Systems are fetched, display a select field for them, otherwise display a text input
                        { label: 'System', name: 'system', type: 'select', options:
                            systems.map(system => ({ label: system?.name, value: String(system?.id) })) ?? []
                        },
                        { label: 'Type', name: 'type', type: 'select', options: [
                            { label: 'Campaign', value: 'campaign' },
                            { label: 'One-Shot', value: 'one_shot' },
                            { label: 'Mini-Campaign', value: 'mini_campaign' },
                            { label: 'Other', value: 'other' },
                        ]},
                        // Add a list of PCs to select from in checkbox form, if any are fetched, otherwise display no PCs available with a link to add PCs
                        pcs.length > 0
                            ? { label: 'Player Characters', name: 'pcs', type: 'checkbox', options:
                                pcs.map(pc => ({ label: pc?.name, value: String(pc?.id) + '[]' })) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Player Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Player Characters', name: 'pcs', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Player Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },
                        // For each custom field found, generate a matching input field with the name of the custom field as the label and name, and type text
                        ...(customFields.length > 0
                            ? [
                                { label: 'Custom Fields', name: 'custom_fields', type: 'hidden', html_content: '<p class="text-sm text-gray-500">The following custom fields for Games are added. Please fill them out as needed.</p>' },
                                ...customFields.map(customField => (
                                    { label: customField?.field, name: customField?.field, type: customField?.type }
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

GamesAdd.layout = {
    breadcrumbs: [
        {
            title: 'Games',
            href: games(),
        },
        {
            title: 'Add Game',
            href: '',
        }
    ],
};
