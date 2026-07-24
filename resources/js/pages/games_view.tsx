import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import FormBuilder from '@/components/form-builder';
import { games } from '@/routes';
import { useEffect, useState } from 'react';

export default function GamesView({ auth }: { game_id: string | number, auth: { user: { id: string | number } } }) {

    // console.log('Fetching game with game_id:', game_id);
    console.log('Authenticated user_id:', auth.user.id);

    // Get game_id from route params and user_id from authenticated user
    const params = new URLSearchParams(window.location.search);
    const user_id = auth.user.id;
    const game_id = params.get('game_id');

    // Fetch All Games for User from API
    const [game, setGame] = useState<{ id: string | number; name: string; description?: string; type?: string; system_id?: string | number } | null>(null);
    const [pcs, setPcs] = useState<Array<{ id: string | number; name: string }>>([]);
    const [customFields, setCustomFields] = useState<Array<{ field: string; type: string }>>([]);
    const [systems, setSystems] = useState<Array<{ id: string | number; name: string }>>([]);

    useEffect(() => {
        fetch(`/api/systems`)
            .then(response => response.json())
            .then(data => setSystems(data))
            .catch(() => setSystems([]));

        // fetch(`/api/characters/pcs/${auth.user.id}`)
        //     .then(response => response.json())
        //     .then(data => setPcs(data))
        //     .catch(() => setPcs([]));

        // fetch(`/api/custom_fields/${auth.user.id}`)
        //     .then(response => response.json())
        //     .then(data => setCustomFields(data))
        //     .catch(() => setCustomFields([]));

        fetch(`/api/games/${game_id}`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(() => setGame(null));

    }, []);

    console.log(game);

    // Get user_id from authenticated user

    return (
        <>
            <Head title={`View Game: ${game?.name ?? ''}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Game: {game?.name ?? ''}</h1>
                <FormBuilder
                    action={`/api/games/${game_id}`}
                    method="POST"
                    fields={[
                        { label: '', name: 'csrf_token', type: 'hidden', value: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '' },
                        { label: '', name: 'user_id', type: 'hidden', value: String(user_id) },
                        { label: 'Title', name: 'title', type: 'text', value: game?.name ?? '' },
                        // { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                        { label: 'Description', name: 'description', type: 'text', value: game?.description ?? '' },
                        // If Systems are fetched, display a select field for them, otherwise display a text input
                        { label: 'System', name: 'system', type: 'select', options:
                            systems.map(system => ({ label: system?.name, value: String(system?.id) })) ?? []
                        , value: game?.system_id ? String(game?.system_id) : systems.length > 0 ? String(systems[0]?.id) : '' },
                        { label: 'Type', name: 'type', type: 'select', options: [
                            { label: 'Campaign', value: 'campaign' },
                            { label: 'One-Shot', value: 'one_shot' },
                            { label: 'Mini-Campaign', value: 'mini_campaign' },
                            { label: 'Other', value: 'other' },
                        ], value: game?.type ?? 'campaign' },
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

GamesView.layout = {
    breadcrumbs: [
        {
            title: 'Games',
            href: games(),
        },
        {
            title: 'Game',
            href: '',
        }
    ],
};
