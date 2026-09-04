import { ResourceFormPage } from '@/components/resource-pages';
import { characters } from '@/routes';

interface Character {
    id: number;
    name: string;
    type: string;
    bio?: string | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
}

export default function CharactersView({
    auth,
    character,
    bucketUrl,
}: {
    auth: { user: { id: string | number } };
    character: Character;
    bucketUrl: string;
}){
    if (auth?.user.id !== character?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this character.</p>
            </div>
        );
    }

    return (
        <ResourceFormPage
            title={`Edit Character: ${character.name}`}
            action={`/characters/${character.id}`}
            thumbnailPath={character.thumbnail?.attachment_path ? `${bucketUrl ?? ''}${character.thumbnail.attachment_path}` : undefined}
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
                {
                    label: 'Attachments',
                    name: 'attachments[]',
                    type: 'file',
                    multiple: true,
                },
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
