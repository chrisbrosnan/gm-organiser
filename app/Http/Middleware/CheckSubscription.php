<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Response as InertiaResponse;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response | InertiaResponse
    {
        $user = $request->user();
        $subscription = DB::table('subscriptions')
            ->where('user_id', $user->id)
            ->first();
        $endsAt = $subscription ? $subscription->ends_at : null;
        $isSubscribed = $endsAt && now()->lessThan($endsAt);
        Log::info('User subscription status', ['user_id' => $user->id, 'is_subscribed' => $isSubscribed]);

        if (!$isSubscribed) {
            return inertia('subscription-offer');
        }

        return $next($request);
    }
}
