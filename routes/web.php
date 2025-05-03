<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});


require __DIR__.'/auth/routes.php';
require __DIR__.'/auth.php';
