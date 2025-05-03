<?php

use App\Http\Controllers\Enterprise\DepartmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('/{enterprise_uuid}/departments')->group(function () {
    Route::get('/create', [DepartmentController::class, 'create'])->middleware('permission:departments_create')->name('departments.create');
    Route::post('/', [DepartmentController::class, 'store'])->middleware('permission:departments_create')->name('departments.store');
    Route::get('/{uuid}', [DepartmentController::class, 'show'])->middleware('permission:departments_list')->name('departments.show');
    Route::get('/{uuid}/edit', [DepartmentController::class, 'edit'])->middleware('permission:departments_edit')->name('departments.edit');
    Route::put('/{uuid}', [DepartmentController::class, 'update'])->middleware('permission:departments_edit')->name('departments.update');
    Route::delete('/{uuid}', [DepartmentController::class, 'destroy'])->middleware('permission:departments_delete')->name('departments.destroy');
});
