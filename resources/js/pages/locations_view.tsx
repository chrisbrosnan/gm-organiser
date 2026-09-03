import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { locations } from '@/routes';
import { useEffect, useState } from 'react';
import FormBuilder from '@/components/form-builder';

interface Location {
    id: number;
    name: string;
    games: Array<{ id: string | number; name: string }>;
    meta_data: {
        scenes: Array<{ id: string | number; name: string }>;
        npc_characters: Array<{ id: string | number; name: string }>;
        enemy_characters: Array<{ id: string | number; name: string }>;
        quests: Array<{ id: string | number; name: string }>;
        items: Array<{ id: string | number; name: string }>;
    };
    description: string;
    created_at: string;
    thumbnail?: { attachment_path?: string } | null;
}

export default function Locations({
    auth,
    location,
    games,
    meta_data,
    custom_fields,
}: {
    auth: { user: { id: string | number } };
    location: {
        id: number;
        name: string;
        games: Array<{ id: string | number; name: string }>;
        meta_data: {
            npc_characters: Array<{ id: string | number; name: string }>;
            enemy_characters: Array<{ id: string | number; name: string }>;
            quests: Array<{ id: string | number; name: string }>;
            items: Array<{ id: string | number; name: string }>;
        };
        description: string;
        created_at: string;
        thumbnail?: { attachment_path?: string } | null;
    };
    games: Array<{ id: string | number; name: string }>;
    meta_data: {
        scenes: Array<{ id: string | number; name: string }>;
        npc_characters: Array<{ id: string | number; name: string }>;
        enemy_characters: Array<{ id: string | number; name: string }>;
        quests: Array<{ id: string | number; name: string }>;
        items: Array<{ id: string | number; name: string }>;
    };
    custom_fields: Array<{ field: string; type: string }>;
}) {
    const params = new URLSearchParams(window.location.search);
    // const location_id = params.get('location_id');

    console.log(location, 'locationsData');

    return (
        <>
            <Head title="Locations" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">
                    Edit Location: {location?.name ?? ''}
                </h1>
                <img
                    src={
                        location?.thumbnail?.attachment_path
                            ? `/storage/${location.thumbnail.attachment_path}`
                            : '/images/default-thumbnail.svg'
                    }
                    alt="Location thumbnail"
                    className="h-64 w-64 rounded-lg object-cover"
                />
                <FormBuilder
                    action={`/locations/${location?.id ?? ''}`}
                    method="POST"
                    fields={[
                        {
                            label: '',
                            name: '_token',
                            type: 'hidden',
                            value:
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute('content') ?? '',
                        },
                        {
                            label: 'Name',
                            name: 'name',
                            type: 'text',
                            value: location?.name ?? '',
                        },
                        { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                        {
                            label: 'Description',
                            name: 'description',
                            type: 'text',
                            value: location?.description ?? '',
                        },
                        // { label: 'Map', name: 'map', type: 'file' },
                        {
                            label: 'Attachments',
                            name: 'attachments[]',
                            type: 'file',
                            multiple: true,
                        },

                        // Add a list of Games to select from in checkbox form, if any are fetched, otherwise display no Games available with a link to add Games
                        games.length > 0
                            ? {
                                  label: 'Games',
                                  name: 'games',
                                  type: 'checkbox',
                                  options:
                                      games.map((game) => ({
                                          label: game?.name,
                                          value: String(game?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Game is not listed, do not worry, you can always add them afterwards and assign them to this location.</p>',
                                  preselected_values: location?.games,
                              }
                            : {
                                  label: 'Games',
                                  name: 'games',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Games available. But do not worry, you can always add them afterwards and assign them to this location.</p>',
                              },

                        // Add a list of Scenes to select from in checkbox form, if any are fetched, otherwise display no Scenes available with a link to add Scenes
                        meta_data?.scenes.length > 0
                            ? {
                                  label: 'Scenes',
                                  name: 'scenes',
                                  type: 'checkbox',
                                  options:
                                      meta_data?.scenes.map((scene) => ({
                                          label: scene?.name,
                                          value: String(scene?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Scene is not listed, do not worry, you can always add them afterwards and assign them to this location.</p>',
                              }
                            : {
                                  label: 'Scenes',
                                  name: 'scenes',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Scenes available. But do not worry, you can always add them afterwards and assign them to this location.</p>',
                              },

                        // Add a list of PCs to select from in checkbox form, if any are fetched, otherwise display no PCs available with a link to add PCs
                        meta_data?.npc_characters.length > 0
                            ? {
                                  label: 'Non-Player Characters',
                                  name: 'npc_characters',
                                  type: 'checkbox',
                                  options:
                                      meta_data?.npc_characters.map((npc) => ({
                                          label: npc?.name,
                                          value: String(npc?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Non-Player Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>',
                              }
                            : {
                                  label: 'Non-Player Characters',
                                  name: 'npc_characters',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Non-Player Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>',
                              },

                        // Add a list of Enemy characters to select from in checkbox form, if any are fetched, otherwise display no Enemy characters available with a link to add them
                        meta_data?.enemy_characters.length > 0
                            ? {
                                  label: 'Enemy Characters',
                                  name: 'enemy_characters',
                                  type: 'checkbox',
                                  options:
                                      meta_data?.enemy_characters.map((enemy) => ({
                                          label: enemy?.name,
                                          value: String(enemy?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Enemy Character is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>',
                              }
                            : {
                                  label: 'Enemy Characters',
                                  name: 'enemy_characters',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Enemy Characters available. But do not worry, you can always add them afterwards and assign them to this game.</p>',
                              },

                        // Add a list of Quests to select from in checkbox form, if any are fetched, otherwise display no Quests available with a link to add them
                        meta_data?.quests.length > 0
                            ? {
                                  label: 'Quests',
                                  name: 'quests',
                                  type: 'checkbox',
                                  options:
                                      meta_data?.quests.map((quest) => ({
                                          label: quest?.name,
                                          value: String(quest?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Quest is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>',
                              }
                            : {
                                  label: 'Quests',
                                  name: 'quests',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Quests available. But do not worry, you can always add them afterwards and assign them to this game.</p>',
                              },

                        // Add a list of Items to select from in checkbox form, if any are fetched, otherwise display no Items available with a link to add them
                        meta_data?.items.length > 0
                            ? {
                                  label: 'Items',
                                  name: 'items',
                                  type: 'checkbox',
                                  options:
                                      meta_data?.items.map((item) => ({
                                          label: item?.name,
                                          value: String(item?.id),
                                      })) ?? [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">If your Item is not listed, do not worry, you can always add them afterwards and assign them to this game.</p>',
                              }
                            : {
                                  label: 'Items',
                                  name: 'items',
                                  type: 'checkbox',
                                  options: [],
                                  html_content:
                                      '<p class="text-sm text-gray-500">No Items available. But do not worry, you can always add them afterwards and assign them to this game.</p>',
                              },

                        // For each custom field found, generate a matching input field with the name of the custom field as the label and name, and type text
                        ...(custom_fields.length > 0
                            ? [
                                  {
                                      label: 'Custom Fields',
                                      name: 'custom_fields',
                                      type: 'hidden',
                                      html_content:
                                          '<p class="text-sm text-gray-500">The following custom fields for Games are added. Please fill them out as needed.</p>',
                                  },
                                  ...custom_fields.map((customField) => ({
                                      label: customField?.field,
                                      name: customField?.field,
                                      type: customField?.type,
                                  })),
                              ]
                            : [
                                  {
                                      label: 'Custom Fields',
                                      name: 'custom_fields',
                                      type: 'hidden',
                                      html_content:
                                          '<p class="text-sm text-gray-500">No custom fields for Games are added. You can add them on the Custom Fields page.</p>',
                                  },
                              ]),
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
