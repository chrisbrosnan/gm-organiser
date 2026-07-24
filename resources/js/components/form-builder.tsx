export default function FormBuilder({
    action,
    method,
    enctype = 'multipart/form-data',
    fields
}: {
    action?: string;
    method?: string;
    enctype?: string;
    fields: Array<{ label: string; name: string; type: string; value?: string; options?: Array<{ label: string; value: string }>; html_content?: string }>;
}) {
    return (
        <form
            action={action}
            method={method}
            encType={enctype}
            className="flex flex-col gap-4">
            {fields.map((field) => (
                console.log('field_name' + field?.name + ' / field value: ' + field?.value),
                <div key={field.name} className={field.type === 'hidden' && field.name !== 'custom_fields' ? 'hidden' : ''}>
                    {field.value && field.type === 'hidden' ? (
                        <input
                            type="hidden"
                            name={field.name}
                            defaultValue={field.value}
                        />
                    ) : null}
                    {field.label !== '' ? (
                        <label htmlFor={field.name}>{field.label}</label>
                    ) : null}
                    {field.type !== 'select' && field.type !== 'checkbox' ? (
                        <input
                            id={field.name}
                            className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            name={field.name}
                            type={field.type}
                            defaultValue={field.value}
                        />
                    ) : field.type === 'select' ? (
                        <select
                            id={field.name}
                            className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            name={field.name}
                        >
                            { field.options?.map(option => (
                                field.value && option.value === field.value ? (
                                    <option key={option.value} selected value={option.value}>
                                        {option.label}
                                    </option>
                                ) : (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            )) }
                        </select>
                    ) : field.type === 'checkbox' && !field.value ? (
                        <div>
                            { field.options?.map(option => (
                                <label key={option.value} className="block">
                                    {field.value && option.value === field.value ? (
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            defaultValue={option.value}
                                            className="mr-2"
                                            defaultChecked
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            defaultValue={option.value}
                                            className="mr-2"
                                        />
                                    )}
                                    {option.label}
                                </label>
                            )) }
                        </div>
                    ) : null}
                    {field.html_content && !field.value ? (
                        <div dangerouslySetInnerHTML={{ __html: field.html_content }} />
                    ) : null}
                </div>
            ))}
        </form>
    );
}
