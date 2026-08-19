export default function FormBuilder({
    action,
    method,
    enctype = 'multipart/form-data',
    fields,
}: {
    action?: string;
    method?: string;
    enctype?: string;
    fields: Array<{
        label: string;
        name: string;
        type: string;
        value?: string;
        options?: Array<{ label: string; value: string }>;
        html_content?: string;
        preselected_values?: any;
        multiple?: boolean;
    }>;
}) {
    function getInputName(field: { name: string; type: string }) {
        if (field.type !== 'checkbox') {
            return field.name;
        }

        return field.name.endsWith('[]') ? field.name : `${field.name}[]`;
    }

    return (
        <form
            action={action}
            method={method}
            encType={enctype}
            className="flex flex-col gap-4"
        >
            {fields.map((field) => (
                <div
                    key={field.name}
                    className={
                        field.type === 'hidden' &&
                        field.name !== 'custom_fields'
                            ? 'hidden'
                            : ''
                    }
                >
                    {field.type === 'hidden' && field.value !== undefined ? (
                        <input
                            type="hidden"
                            name={field.name}
                            defaultValue={field.value}
                        />
                    ) : null}
                    {field.label !== '' ? (
                        <label htmlFor={field.name}>{field.label}</label>
                    ) : null}
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            className="w-full rounded-md border border-gray-300 p-2 text-gray-700"
                            name={field.name}
                            defaultValue={field.value}
                            rows={6}
                        />
                    ) : field.type !== 'select' &&
                      field.type !== 'checkbox' &&
                      field.type !== 'hidden' ? (
                        <input
                            id={field.name}
                            className="w-full rounded-md border border-gray-300 p-2 text-gray-700"
                            name={field.name}
                            type={field.type}
                            multiple={
                                field.type === 'file' &&
                                field.name !== 'thumbnail'
                                    ? !!field.multiple
                                    : undefined
                            }
                            defaultValue={field.value}
                        />
                    ) : field.type === 'select' ? (
                        <select
                            id={field.name}
                            className="w-full rounded-md border border-gray-300 p-2 text-gray-700"
                            name={field.name}
                            defaultValue={field.value}
                        >
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'checkbox' ? (
                        <div>
                            {field.options?.map((option) => (
                                <label key={option.value} className="block">
                                    {field.preselected_values &&
                                    field.preselected_values.includes(
                                        option.value,
                                    ) ? (
                                        <input
                                            type="checkbox"
                                            name={getInputName(field)}
                                            value={option.value}
                                            className="mr-2"
                                            defaultChecked
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            name={getInputName(field)}
                                            value={option.value}
                                            className="mr-2"
                                        />
                                    )}
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    ) : null}
                    {field.html_content && !field.value ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: field.html_content,
                            }}
                        />
                    ) : null}
                </div>
            ))}
        </form>
    );
}
