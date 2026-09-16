import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { games } from '@/routes';
import { useEffect, useState } from 'react';
import TableBuilder from '@/components/table-builder';

interface File {
    id: number;
    object_type: string;
    attachment_type: string;
    attachment_path: string;
    user_id: number;
    created_at: string;
}

export default function Files({ auth, files, bucketUrl }: { auth: { user: { id: string | number } }, files: File[], bucketUrl: string }) {

    // Fetch All Files for User from API
    const filesData = files;
    console.log(filesData);

    return (
        <>
            <Head title="Files" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Files</h1>
                    {/* <button
                        className="mt-0 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs float-right"
                        onClick={() => window.location.href = '/games/add'}
                    >
                        Add Game
                    </button> */}
                </div>
                {filesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="w-full h-64" />
                        <p className="text-gray-500">No files found. Add some to a record.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filesData.map((file) => (
                            <div key={file.id} className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-xl font-bold text-center py-3"><a href={`${bucketUrl ?? ''}${file.attachment_path}`}>{file.attachment_path.substring(0, 25)}...</a></h2>
                                <p>Type: {file.attachment_type.replace('_', ' ').replace('-', ' ').charAt(0).toUpperCase() + file.attachment_type.replace('_', ' ').replace('-', ' ').slice(1)}</p>
                                <p>Object Type: {file.object_type.replace('_', ' ').replace('-', ' ').charAt(0).toUpperCase() + file.object_type.replace('_', ' ').replace('-', ' ').slice(1)}</p>
                                <p>Created At: {new Date(file.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="grid md:grid-cols-3 gap-2 mt-2 py-3">
                                    <button
                                        onClick={() => window.location.href = `${bucketUrl ?? ''}${file.attachment_path}`}
                                    >
                                        View
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
