import { ResourceIndexPage } from '@/components/resource-pages';
import { forums } from '@/routes';

interface Forum {
    id: number;
    title: string;
    content: string;
    parent_id?: number | null;
    created_at: string;
}

export default function Forums({ forums: forumList }: { forums: Forum[] }) {
    return (
        <ResourceIndexPage
            title="Forums"
            addLabel="Add Forum Post"
            addPath="/forums/add"
            emptyMessage="No forum posts found. Create a new post to get started."
            cards={forumList.map((forum) => ({
                id: forum.id,
                title: forum.title,
                description: forum.content,
                meta: [
                    forum.parent_id
                        ? `Replying to post #${forum.parent_id}`
                        : 'Top-level forum post.',
                    `Created At: ${new Date(forum.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/forums/${forum.id}`,
            }))}
        />
    );
}

Forums.layout = {
    breadcrumbs: [
        {
            title: 'Forums',
            href: forums(),
        },
    ],
};
