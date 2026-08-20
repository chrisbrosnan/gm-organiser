import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import FormBuilder from '@/components/form-builder';
import { games } from '@/routes';
import { useEffect, useState } from 'react';

export default function GamesAdd({ locations, scenes, npcs, player_characters, systems, custom_fields, auth }: { locations: Array<{ id: string | number; name: string }>, scenes: Array<{ id: string | number; name: string }>, npcs: Array<{ id: string | number; name: string }>, player_characters: Array<{ id: string | number; name: string }>, systems: Array<{ id: string | number; name: string }>, custom_fields: Array<{ field: string; type: string }>, auth: { user: { id: string | number } } }) {

    // console.log('Fetching game with game_id:', game_id);
    console.log('Authenticated user_id:', auth.user.id);

    // Get game_id from route params and user_id from authenticated user
    const params = new URLSearchParams(window.location.search);
    const user_id = auth.user.id;

    return (
        <>
            <Head title="Add Game" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Add Game</h1>
                <FormBuilder
                    action="/games"
                    method="POST"
                    fields={[
                        { label: '', name: 'csrf_token', type: 'hidden', value: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '' },
                        { label: '', name: 'user_id', type: 'hidden', value: String(user_id) },
                        { label: 'Title', name: 'title', type: 'text' },
                        { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                        { label: 'Description', name: 'description', type: 'text' },
                        // If Systems are fetched, display a select field for them, otherwise display a text input
                        { label: 'System', name: 'system', type: 'select', options:
                            systems.map(system => ({ label: system?.name, value: String(system?.id) })) ?? [],
                            value: '1' },
                        { label: 'Type', name: 'type', type: 'select', options: [
                            { label: 'Campaign', value: 'campaign' },
                            { label: 'One-Shot', value: 'one_shot' },
                            { label: 'Mini-Campaign', value: 'mini_campaign' },
                            { label: 'Other', value: 'other' }, ],
                            value: 'campaign' },

                        // meta_data['locations']
                        locations.length > 0
                            ? { label: 'Locations', name: 'locations', type: 'checkbox', options:
                                locations.map(location => ({ label: location?.name, value: String(location?.id) })) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Location is not listed, do not worry, you can always add it afterwards and assign it to this game.</p>'
                            }
                            : { label: 'Locations', name: 'locations', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Locations available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // meta_data['scenes']
                        scenes.length > 0
                            ? { label: 'Scenes', name: 'scenes', type: 'checkbox', options:
                                scenes.map(scene => ({ label: scene?.name, value: String(scene?.id) })) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Scene is not listed, do not worry, you can always add it afterwards and assign it to this game.</p>'
                            }
                            : { label: 'Scenes', name: 'scenes', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Scenes available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // Add a list of PCs to select from in checkbox form, if any are fetched, otherwise display no PCs available with a link to add PCs
                        player_characters.length > 0
                            ? { label: 'Player Characters', name: 'pcs', type: 'checkbox', options:
                                player_characters.map(pc => ({ label: pc?.name, value: String(pc?.id) + '[]' })) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Player Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Player Characters', name: 'pcs', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Player Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        npcs.length > 0
                            ? { label: 'Non-Player Characters', name: 'npcs', type: 'checkbox', options:
                                npcs.map(npc => ({ label: npc?.name, value: String(npc?.id) + '[]' })) ?? [],
                                html_content: '<p class="text-sm text-gray-500">If your Non-Player Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>'
                            }
                            : { label: 'Non-Player Characters', name: 'npcs', type: 'checkbox', options: [], html_content: '<p class="text-sm text-gray-500">No Non-Player Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>' },

                        // For each custom field found, generate a matching input field with the name of the custom field as the label and name, and type text
                        ...(custom_fields.length > 0
                            ? [
                                { label: 'Custom Fields', name: 'custom_fields', type: 'hidden', html_content: '<p class="text-sm text-gray-500">The following custom fields for Games are added. Please fill them out as needed.</p>' },
                                ...custom_fields.map(customField => (
                                    { label: customField?.field, name: customField?.field, type: customField?.type }
                                ))
                              ] :
                            [
                                { label: 'Custom Fields', name: 'custom_fields', type: 'hidden', html_content: '<p class="text-sm text-gray-500">No custom fields for Games are added. You can add them on the Custom Fields page.</p>' }
                            ]
                        ),

                        // Attached files
                        { label: 'Attached Files', name: 'attachments[]', type: 'file', multiple: true, html_content: '<p class="text-sm text-gray-500">You can attach files to this game.</p>'},

                        // Text-area for Notes
                        { label: 'Notes', name: 'notes', type: 'textarea' },

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
