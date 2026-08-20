import { ResourceFormPage } from '@/components/resource-pages';
import { characters } from '@/routes';

export default function CharactersAdd() {
    return (
        <ResourceFormPage
            title="Add Character"
            action="/characters"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'select',
                    value: 'npc',
                    options: [
                        { label: 'NPC', value: 'npc' },
                        { label: 'PC', value: 'pc' },
                        { label: 'Enemy', value: 'enemy' },
                    ],
                },
                { label: 'Bio', name: 'bio', type: 'textarea' },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

CharactersAdd.layout = {
    breadcrumbs: [
        {
            title: 'Characters',
            href: characters(),
        },
        {
            title: 'Add Character',
            href: '',
        },
    ],
};
