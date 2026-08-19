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
                    label: 'Default Value',
                    name: 'value',
                    type: 'text',
                    value: custom_field.value,
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'text',
                    value: custom_field.type,
                },
                {
                    label: 'Object Type',
                    name: 'object_type',
                    type: 'text',
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
