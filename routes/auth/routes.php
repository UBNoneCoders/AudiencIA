<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;


Route::prefix('/')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    require 'benefits/routes.php';
    require 'clients/routes.php';
    require 'collaborators/routes.php';
    require 'contracts/routes.php';
    require 'enterprises/routes.php';
    require 'permissions/routes.php';
    require 'resignation_reasons/routes.php';
    require 'roles/routes.php';
    require 'users/routes.php';
});
