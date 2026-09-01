import { ResourceFormPage } from '@/components/resource-pages';
import { forums } from '@/routes';

export default function ForumsAdd() {
    return (
        <ResourceFormPage
            title="Add Forum Post"
            action="/forums"
            fields={[
                { label: 'Title', name: 'title', type: 'text' },
                { label: 'Content', name: 'content', type: 'textarea' },
                { label: 'Parent ID', name: 'parent_id', type: 'number' },
            ]}
            thumbnailPath={null}
        />
    );
}

ForumsAdd.layout = {
    breadcrumbs: [
        {
            title: 'Forums',
            href: forums(),
        },
        {
            title: 'Add Forum Post',
            href: '',
        },
    ],
};
