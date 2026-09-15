<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $subscription = DB::table('subscriptions')
            ->where('user_id', $user->id)
            ->first();
        $endsAt = $subscription ? $subscription->ends_at : null;
        $isSubscribed = $endsAt && now()->lessThan($endsAt);

        if (!$isSubscribed) {
            return inertia('subscription-offer');
        }

        return $next($request);
    }
}
