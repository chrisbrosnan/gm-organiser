import { get } from "@/actions/App/Http/Controllers/LocationController";

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
        preselected_values?: unknown[];
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
                                    <span>
                                        {field.preselected_values?.some(
                                            (value) =>
                                                String(value) === option.value,
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
                                        {getInputName(field) === 'games[]' ? (
                                            <a
                                                href={`/games/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit game</em>
                                            </a>
                                        ) : getInputName(field) === 'locations[]' ? (
                                            <a
                                                href={`/locations/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit location</em>
                                            </a>
                                        ) : getInputName(field) === 'scenes[]' ? (
                                            <a
                                                href={`/scenes/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit scene</em>
                                            </a>
                                        ) : getInputName(field) === 'quests[]' ? (
                                            <a
                                                href={`/quests/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit quest</em>
                                            </a>
                                        ) : getInputName(field) === 'items[]' ? (
                                            <a
                                                href={`/items/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit item</em>
                                            </a>
                                        ) : getInputName(field) === 'npcs[]' ? (
                                            <a
                                                href={`/characters/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit NPC</em>
                                            </a>
                                        ) : getInputName(field) === 'enemies[]' ? (
                                            <a
                                                href={`/characters/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit enemy</em>
                                            </a>
                                        ) : getInputName(field) === 'pcs[]' ? (
                                            <a
                                                href={`/characters/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit PC</em>
                                            </a>
                                        ) : getInputName(field) === 'spells[]' ? (
                                            <a
                                                href={`/spells/${option.value}`}
                                                className="text-blue-500 underline"
                                            >
                                                <em> Edit spell</em>
                                            </a>
                                        ) : null}
                                    </span>
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
