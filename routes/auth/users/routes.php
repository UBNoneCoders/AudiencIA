<?php

use App\Http\Controllers\User\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::get("/", [UserController::class, 'index'])->middleware(CheckRole::class)->name('users.index');
    Route::post('/', [UserController::class, 'store'])->middleware(CheckRole::class)->name('users.store');
    Route::put('/{uuid}', [UserController::class, 'update'])->middleware(CheckRole::class)->name('users.update');
    Route::delete('/{uuid}', [UserController::class, 'destroy'])->middleware(CheckRole::class)->name('users.destroy');

    Route::put('/{uuid}/reset-password', [UserController::class, 'resetPassword'])->middleware(CheckRole::class)->name('users.reset-password');
    Route::put('/active/{uuid}', [UserController::class, 'active'])->middleware(CheckRole::class)->name('users.active');

    Route::get('/{uuid}', [UserController::class, 'show'])->middleware(CheckRole::class)->name('users.show');
});
