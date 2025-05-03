<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::get("/", [UserController::class, 'index'])->middleware('permission:users_list')->name('users.index');
    Route::post('/', [UserController::class, 'store'])->middleware('permission:users_create')->name('users.store');
    Route::put('/{uuid}', [UserController::class, 'update'])->middleware('permission:users_edit')->name('users.update');
    Route::delete('/{uuid}', [UserController::class, 'destroy'])->middleware('permission:users_delete')->name('users.destroy');

    Route::put('/{uuid}/reset-password', [UserController::class, 'resetPassword'])->middleware('permission:users_edit')->name('users.reset-password');
    Route::put('/active/{uuid}', [UserController::class, 'active'])->middleware('permission:users_edit')->name('users.active');

    Route::get('/{uuid}', [UserController::class, 'show'])->middleware('permission:users_list')->name('users.show');
});
