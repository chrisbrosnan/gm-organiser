import { ResourceIndexPage } from '@/components/resource-pages';
import { custom_fields } from '@/routes';

interface CustomField {
    id: number;
    field: string;
    value: string;
    type: string;
    object_type: string;
    created_at: string;
}

export default function CustomFields({
    custom_fields: customFieldList,
}: {
    custom_fields: CustomField[];
}) {
    return (
        <ResourceIndexPage
            title="Custom Fields"
            addLabel="Add Custom Field"
            addPath="/custom-fields/add"
            emptyMessage="No custom fields found. Create a new custom field to get started."
            cards={customFieldList.map((customField) => ({
                id: customField.id,
                title: customField.field,
                description: `Default value: ${customField.value}`,
                meta: [
                    `Type: ${customField.type}`,
                    `Object Type: ${customField.object_type}`,
                    `Created At: ${new Date(customField.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/custom-fields/${customField.id}`,
            }))}
        />
    );
}

CustomFields.layout = {
    breadcrumbs: [
        {
            title: 'Custom Fields',
            href: custom_fields(),
        },
    ],
};
