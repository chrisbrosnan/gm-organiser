import { ResourceFormPage } from '@/components/resource-pages';
import { custom_fields } from '@/routes';

export default function CustomFieldsAdd() {
    return (
        <ResourceFormPage
            title="Add Custom Field"
            action="/custom-fields"
            fields={[
                { label: 'Field', name: 'field', type: 'text' },
                { label: 'Default Value', name: 'value', type: 'text' },
                { label: 'Type', name: 'type', type: 'text', value: 'text' },
                { label: 'Object Type', name: 'object_type', type: 'text' },
            ]}
        />
    );
}

CustomFieldsAdd.layout = {
    breadcrumbs: [
        {
            title: 'Custom Fields',
            href: custom_fields(),
        },
        {
            title: 'Add Custom Field',
            href: '',
        },
    ],
};
