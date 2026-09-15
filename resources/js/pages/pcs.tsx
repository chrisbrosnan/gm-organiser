import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ResourceIndexPage } from '@/components/resource-pages';
import { characters, pcs } from '@/routes';

interface Character {
    id: number;
    name: string;
    type: string;
    bio?: string | null;
    created_at: string;
}

export default function Pcs({
    characters: characterList,
}: {
    characters: Character[];
}) {
    return (
        <ResourceIndexPage
            title="Player Characters"
            addLabel="Add Character"
            addPath="/characters/add"
            emptyMessage="No characters found. Create a new character to get started."
            cards={characterList.map((character) => ({
                id: character.id,
                title: character.name,
                description: character.bio ?? null,
                meta: [
                    `Type: PC`,
                    `Created At: ${new Date(character.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/characters/${character.id}`,
            }))}
        />
    );
}

Pcs.layout = {
    breadcrumbs: [
        {
            title: 'Characters',
            href: characters(),
        },
        {
            title: 'PCs',
            href: pcs(),
        }
    ],
};
