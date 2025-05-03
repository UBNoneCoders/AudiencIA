<?php

use App\Http\Middleware\EnsureUserIsActive;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            EnsureUserIsActive::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);


    })
    ->withExceptions(function (Exceptions $exceptions) {
        // $exceptions->render(function (\Spatie\Permission\Exceptions\UnauthorizedException $e, $request) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'User does not have the right permissions.',
        //         'errors' => [
        //             'permission' => 'You do not have the required permissions to access this resource.'
        //         ]
        //     ], 403);
        // });
    })->create();
