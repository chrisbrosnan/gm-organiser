import { ResourceFormPage } from '@/components/resource-pages';
import { custom_fields } from '@/routes';

interface CustomField {
    id: number;
    field: string;
    value: string;
    type: string;
    object_type: string;
    user_id?: string | number;
}

export default function CustomFieldsView({
    auth,
    custom_field,
}: {
    auth: { user: { id: string | number } };
    custom_field: CustomField;
}) {
    if (auth?.user.id !== custom_field?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this custom field.</p>
            </div>
        );
    }

    return (
        <ResourceFormPage
            title={`Edit Custom Field: ${custom_field.field}`}
            action={`/custom-fields/${custom_field.id}`}
            fields={[
                {
                    label: 'Field',
                    name: 'field',
                    type: 'text',
                    value: custom_field.field,
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'Text', value: 'text' },
                        { label: 'Number', value: 'number' },
                        { label: 'Date', value: 'date' },
                        { label: 'True/False', value: 'boolean' },
                    ],
                    value: custom_field.type,
                },
                {
                    label: 'Object Type',
                    name: 'object_type',
                    type: 'select',
                    options: [
                        { label: 'Game', value: 'game' },
                        { label: 'Location', value: 'location' },
                        { label: 'Scene', value: 'scene' },
                        { label: 'Character', value: 'character' },
                        { label: 'Item', value: 'item' },
                        { label: 'Spells', value: 'spell' },
                        { label: 'Quest', value: 'quest' },
                    ],
                    value: custom_field.object_type,
                },
            ]}
        />
    );
}

CustomFieldsView.layout = {
    breadcrumbs: [
        {
            title: 'Custom Fields',
            href: custom_fields(),
        },
    ],
};
