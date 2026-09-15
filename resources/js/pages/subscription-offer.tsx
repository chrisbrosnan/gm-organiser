import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { useEffect, useState } from 'react';

export default function SubscriptionOffer({ auth }: { auth: { user: { id: string | number; name?: string } } }) {
    return (
        <>
            <Head title="Subscription Offer" />
            <div className="subscription-offer">
                <h1>Exclusive Subscription Offer</h1>
                <p>Unlock all features by subscribing to our premium plan.</p>
                <PlaceholderPattern />
            </div>
        </>
    );
}

SubscriptionOffer.layout = "guest";
