import { ResourceFormPage } from '@/components/resource-pages';
import { characters } from '@/routes';

interface Character {
    id: number;
    name: string;
    type: string;
    bio?: string | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
    meta_data?: {
        system_id?: string | number | null;
    } | null;
}

export default function CharactersView({
    auth,
    character,
    bucketUrl,
    systems,
}: {
    auth: { user: { id: string | number } };
    character: Character;
    bucketUrl: string;
    systems: Record<string, string>;
}){
    if (auth?.user.id !== character?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this character.</p>
            </div>
        );
    }

    console.log(character);

    return (
        <ResourceFormPage
            title={`Edit Character: ${character.name}`}
            action={`/characters/${character.id}`}
            thumbnailPath={character.thumbnail?.attachment_path ? `${character.thumbnail.attachment_path}` : undefined}
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
                    label: 'System',
                    name: 'system_id',
                    type: 'select',
                    options: Object.entries(systems).map(([id, name]) => ({ label: name, value: id })),
                    value: character.meta_data?.system_id != null ? String(character.meta_data.system_id) : '',
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
