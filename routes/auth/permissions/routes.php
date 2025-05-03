<?php

use App\Http\Controllers\Permission\PermissionController;
use Illuminate\Support\Facades\Route;

Route::prefix('permissions')->group(function () {
    Route::get("/", [PermissionController::class, 'index'])->middleware('permission:permissions_list')->name('permissions.index');
    Route::post("/", [PermissionController::class, 'store'])->middleware('permission:permissions_create')->name('permissions.store');
    Route::put("/{id}", [PermissionController::class, 'update'])->middleware('permission:permissions_edit')->name('permissions.update');
    Route::delete("/{id}", [PermissionController::class, 'destroy'])->middleware('permission:permissions_delete')->name('permissions.destroy');
});
