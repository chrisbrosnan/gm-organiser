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
                },
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
