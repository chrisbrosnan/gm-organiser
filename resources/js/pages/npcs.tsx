import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { characters, npcs } from '@/routes';
import { ResourceIndexPage } from '@/components/resource-pages';

interface Character {
    id: number;
    name: string;
    type: string;
    bio?: string | null;
    created_at: string;
}

export default function Npcs({
    characters: characterList,
}: {
    characters: Character[];
}) {
    return (
        <ResourceIndexPage
            title="Characters"
            addLabel="Add Character"
            addPath="/characters/add"
            emptyMessage="No characters found. Create a new character to get started."
            cards={characterList.map((character) => ({
                id: character.id,
                title: character.name,
                description: character.bio ?? null,
                meta: [
                    `Type: ${character.type.toUpperCase()}`,
                    `Created At: ${new Date(character.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/characters/${character.id}`,
            }))}
        />
    );
}

Npcs.layout = {
    breadcrumbs: [
        {
            title: 'Characters',
            href: characters(),
        },
        {
            title: 'NPCs',
            href: npcs(),
        }
    ],
};
