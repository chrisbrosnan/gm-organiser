import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { useEffect, useState } from 'react';

interface Game {
    system_name: string;
    id: number;
    name: string;
    system_id: number;
    type: string;
    created_at: string;
}

export default function SubscriptionOffer({ auth }: { auth: { user: { id: string | number; name?: string } } }) {

    return (
        <>
            <Head title="Subscription" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="p-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h3 className="mb-2">Hello, {auth.user.name ? auth.user.name.substring(0, auth.user.name.indexOf(' ')) + "!" : 'User'}</h3>
                        <p>It looks like you don't have an active subscription. To access the full features of the GM Organiser, please consider subscribing.</p>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}
