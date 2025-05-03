<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && !Auth::user()->active) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            session()->flash('error', 'Sua conta foi desativada. Entre em contato com o suporte.');
            return redirect()->route('login')->withErrors([
                'email' => 'Sua conta foi desativada.',
            ]);
        }

        return $next($request);
    }
}
