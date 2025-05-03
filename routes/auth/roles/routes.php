<?php

use App\Http\Controllers\Role\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('roles')->group(function () {
    Route::get("/", [RoleController::class, 'index'])->middleware('permission:roles_list')->name('roles.index');
    Route::post('/', [RoleController::class, 'store'])->middleware('permission:roles_create')->name('roles.store');
    Route::put('/{id}', [RoleController::class, 'update'])->middleware('permission:roles_edit')->name('roles.update');
    Route::delete('/{id}', [RoleController::class, 'destroy'])->middleware('permission:roles_delete')->name('roles.destroy');

    Route::get('/{id}', [RoleController::class, 'show'])->middleware('permission:roles_list')->name('roles.show');
    Route::post('/{id}/permissions', [RoleController::class, 'attachPermissions'])->middleware('permission:roles_edit')->name('roles.attachPermissions');
    Route::delete('/{id}/permissions/{permission_id}', [RoleController::class, 'detachPermission'])->middleware('permission:roles_edit')->name('roles.detachPermission');
});
