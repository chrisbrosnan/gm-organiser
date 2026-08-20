import { ResourceFormPage } from '@/components/resource-pages';
import { custom_fields } from '@/routes';

interface CustomField {
    id: number;
    field: string;
    value: string;
    type: string;
    object_type: string;
}

export default function CustomFieldsView({
    custom_field,
}: {
    custom_field: CustomField;
}) {
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
