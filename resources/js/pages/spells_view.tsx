import { ResourceFormPage } from '@/components/resource-pages';
import { spells } from '@/routes';

interface Spell {
    id: number;
    name: string;
    description?: string | null;
    meta_data?: {
        pc_characters?: { id: number }[];
        npc_characters?: { id: number }[];
        enemy_characters?: { id: number }[];
    } | null;
    effect: string | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
}

export default function SpellsView({ auth, spell, pc_characters, npc_characters, enemy_characters, bucketUrl }: { auth: { user: { id: string | number } }; spell: Spell, pc_characters: any[], npc_characters: any[], enemy_characters: any[], bucketUrl: string }) {

    if (auth?.user.id !== spell?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this spell.</p>
            </div>
        );
    }

    console.log(spell, 'Spell: ');

    return (
        <ResourceFormPage
            title={`Edit Spell: ${spell.name}`}
            action={`/spells/${spell.id}`}
            thumbnailPath={spell.thumbnail?.attachment_path ? `${bucketUrl ?? ''}${spell.thumbnail.attachment_path}` : undefined}
            fields={[
                {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    value: spell.name,
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: spell.description ?? '',
                },
                {
                    label: 'Effect',
                    name: 'effect',
                    type: 'text',
                    value: spell.effect ?? '',
                },
                {
                    label: 'Player Characters',
                    name: 'player_characters[]',
                    type: 'checkbox',
                    options: pc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.pc_characters ?? [],
                },
                {
                    label: 'Non-Player Characters',
                    name: 'npc_characters[]',
                    type: 'checkbox',
                    options: npc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.npc_characters ?? [],
                },
                {
                    label: 'Enemy Characters',
                    name: 'enemy_characters[]',
                    type: 'checkbox',
                    options: enemy_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.enemy_characters ?? [],
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

SpellsView.layout = {
    breadcrumbs: [
        {
            title: 'Spells',
            href: spells(),
        },
    ],
};
