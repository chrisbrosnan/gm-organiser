import { ResourceFormPage } from '@/components/resource-pages';
import { characters } from '@/routes';

interface Character {
    id: number;
    name: string;
    type: string;
    bio?: string | null;
}

export default function CharactersView({
    character,
}: {
    character: Character;
}) {
    return (
        <ResourceFormPage
            title={`Edit Character: ${character.name}`}
            action={`/characters/${character.id}`}
            fields={[
                {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    value: character.name,
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'select',
                    value: character.type,
                    options: [
                        { label: 'NPC', value: 'npc' },
                        { label: 'PC', value: 'pc' },
                        { label: 'Enemy', value: 'enemy' },
                    ],
                },
                {
                    label: 'Bio',
                    name: 'bio',
                    type: 'textarea',
                    value: character.bio ?? '',
                },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

CharactersView.layout = {
    breadcrumbs: [
        {
            title: 'Characters',
            href: characters(),
        },
    ],
};
