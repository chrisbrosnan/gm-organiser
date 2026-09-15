import { Head } from '@inertiajs/react';

import FormBuilder from '@/components/form-builder';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export interface ResourceField {
    label: string;
    name: string;
    type: string;
    value?: string;
    options?: Array<{ label: string; value: string }>;
    html_content?: string;
    preselected_values?: unknown[];
    multiple?: boolean;
}

export interface ResourceCard {
    id: number | string;
    title: string;
    description?: string | null;
    meta?: string[];
    editPath: string;
}

export function ResourceIndexPage({
    title,
    addLabel,
    addPath,
    emptyMessage,
    cards,
}: {
    title: string;
    addLabel: string;
    addPath: string;
    emptyMessage: string;
    cards: ResourceCard[];
}) {
    return (
        <>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="float-left text-2xl font-bold">{title}</h1>
                    <button
                        className="float-right mt-0 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={() => {
                            window.location.href = addPath;
                        }}
                        type="button"
                    >
                        {addLabel}
                    </button>
                </div>
                {cards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="h-64 w-full" />
                        <p className="text-gray-500">{emptyMessage}</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="rounded-md border border-gray-300 p-4"
                            >
                                <h2 className="text-xl font-bold">
                                    {card.title}
                                </h2>
                                {card.description ? (
                                    <p>{card.description}</p>
                                ) : null}
                                {card.meta?.map((line) => (
                                    <p key={`${card.id}-${line}`}>{line}</p>
                                ))}
                                <div className="mt-2 flex gap-2">
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs"
                                        onClick={() => {
                                            window.location.href =
                                                card.editPath;
                                        }}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export function ResourceFormPage({
    title,
    action,
    fields,
    thumbnailPath,
}: {
    title: string;
    action: string;
    fields: ResourceField[];
    thumbnailPath?: string | null;
}) {
    const csrfToken =
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') ?? '';

    return (
        <>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                {thumbnailPath && thumbnailPath !== null && (
                    <img
                        src={`/${thumbnailPath}`}
                        alt={`${title} thumbnail`}
                        className="h-64 w-64 rounded-lg object-cover"
                    />
                )}
                <FormBuilder
                    action={action}
                    method="POST"
                    fields={[
                        {
                            label: '',
                            name: '_token',
                            type: 'hidden',
                            value: csrfToken,
                        },
                        ...fields,
                        { label: '', name: 'submit', type: 'submit' },
                        { label: '', name: 'clear', type: 'reset' },
                    ]}
                />
            </div>
        </>
    );
}
