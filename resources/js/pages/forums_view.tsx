import { ResourceFormPage } from '@/components/resource-pages';
import { forums } from '@/routes';

interface Forum {
    id: number;
    title: string;
    content: string;
    parent_id?: number | null;
}

export default function ForumsView({ forum }: { forum: Forum }) {
    return (
        <ResourceFormPage
            title={`Edit Forum Post: ${forum.title}`}
            action={`/forums/${forum.id}`}
            fields={[
                {
                    label: 'Title',
                    name: 'title',
                    type: 'text',
                    value: forum.title,
                },
                {
                    label: 'Content',
                    name: 'content',
                    type: 'textarea',
                    value: forum.content,
                },
                {
                    label: 'Parent ID',
                    name: 'parent_id',
                    type: 'number',
                    value: forum.parent_id ? String(forum.parent_id) : '',
                },
            ]}
        />
    );
}

ForumsView.layout = {
    breadcrumbs: [
        {
            title: 'Forums',
            href: forums(),
        },
    ],
};
