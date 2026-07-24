import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { locations } from '@/routes';
import { useEffect, useState } from 'react';
import FormBuilder from '@/components/form-builder';

interface Game {
    system_name: string;
    id: number;
    name: string;
    system_id: number;
    type: string;
    created_at: string;
}

export default function Locations({ auth }: { auth: { user: { id: string | number } } }) {

    // Fetch All Games for User from API
    const [locationsData, setLocationsData] = useState<Game[]>([]);
    // const [pcs, setPcs] = useState<Array<{ id: string | number; name: string }>>([]);
    const [games, setGames] = useState<Array<{ id: string | number; name: string }>>([]);
    const [npcs, setNpcs] = useState<Array<{ id: string | number; name: string }>>([]);
    const [enemies, setEnemies] = useState<Array<{ id: string | number; name: string }>>([]);
    const [customFields, setCustomFields] = useState<Array<{ field: string; type: string }>>([]);
    const [quests, setQuests] = useState<Array<{ id: string | number; name: string }>>([]);
    const [items, setItems] = useState<Array<{ id: string | number; name: string }>>([]);

    useEffect(() => {
        fetch(`/api/locations/user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setLocationsData(data));

        fetch(`/api/characters/npcs/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setNpcs(data))
            .catch(() => setNpcs([]));

        fetch(`/api/characters/enemies/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setEnemies(data))
            .catch(() => setEnemies([]));

        fetch(`/api/custom_fields/locations/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setCustomFields(data))
            .catch(() => setCustomFields([]));

        fetch(`/api/quests/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setQuests(data))
            .catch(() => setQuests([]));

        fetch(`/api/items/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(() => setItems([]));

        fetch(`/api/games/by_user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(() => setGames([]));
    }, []);

    const deleteConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
            // Window.href = `/locations/delete?location_id=${location_id}`
            window.location.href = `/locations/delete?location_id=${game_id}`;
        }
    };

    const duplicateConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to duplicate this location?')) {
            window.location.href = `/locations/duplicate?location_id=${game_id}`;
        }
    };

    console.log(locationsData, 'locationsData');

    return (
        <>
            <Head title="Locations" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Add Location</h1>
                <FormBuilder
                    action="/api/locations"
                    method="POST"
                    fields={[
                        { label: '', name: 'csrf_token', type: 'hidden', value: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '' },
                        { label: '', name: 'user_id', type: 'hidden', value: String(auth.user.id) },
                        { label: 'Name', name: 'name', type: 'text' },
                        // { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                        { label: 'Description', name: 'description', type: 'text' },
                        // { label: 'Map', name: 'map', type: 'file' },



                        // Add a list of Games to select from in checkbox form, if any are fetched, otherwise display no Games available with a link to add Games
                        games.length > 0
                            ? { label: 'Games', name: 'games', type: 'checkbox', options:
                                games.map(game => ({ label: game?.name, value: String(game?.id)})) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Game is not listed, do not worry, you can always add them afterwards and assign them to this location.</p>'
                            }
                            : { label: 'Games', name: 'games', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Games available. But do not worry, you can always add them afterwards and assign them to this location.</p>' },

                        // Add a list of PCs to select from in checkbox form, if any are fetched, otherwise display no PCs available with a link to add PCs
                        npcs.length > 0
                            ? { label: 'Non-Player Characters', name: 'pcs', type: 'checkbox', options:
                                npcs.map(npc => ({ label: npc?.name, value: String(npc?.id)})) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Non-Player Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Non-Player Characters', name: 'pcs', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Non-Player Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // Add a list of Enemy characters to select from in checkbox form, if any are fetched, otherwise display no Enemy characters available with a link to add them
                        enemies.length > 0
                            ? { label: 'Enemy Characters', name: 'enemies', type: 'checkbox', options:
                                enemies.map(enemy => ({ label: enemy?.name, value: String(enemy?.id)})) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Enemy Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Enemy Characters', name: 'enemies', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Enemy Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // Add a list of Quests to select from in checkbox form, if any are fetched, otherwise display no Quests available with a link to add them
                        quests.length > 0
                            ? { label: 'Quests', name: 'quests', type: 'checkbox', options:
                                quests.map(quest => ({ label: quest?.name, value: String(quest?.id)})) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Quest is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Quests', name: 'quests', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Quests available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // Add a list of Items to select from in checkbox form, if any are fetched, otherwise display no Items available with a link to add them
                        items.length > 0
                            ? { label: 'Items', name: 'items', type: 'checkbox', options:
                                items.map(item => ({ label: item?.name, value: String(item?.id)})) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Item is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Items', name: 'items', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Items available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },


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

Locations.layout = {
    breadcrumbs: [
        {
            title: 'Locations',
            href: locations(),
        },
    ],
};
