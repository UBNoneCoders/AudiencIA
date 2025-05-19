<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::get("/", [UserController::class, 'index'])->name('users.index');
    Route::post('/', [UserController::class, 'store'])->name('users.store');
    Route::put('/{uuid}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/{uuid}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::put('/{uuid}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
    Route::put('/active/{uuid}', [UserController::class, 'active'])->name('users.active');

    Route::get('/{uuid}', [UserController::class, 'show'])->name('users.show');
});
