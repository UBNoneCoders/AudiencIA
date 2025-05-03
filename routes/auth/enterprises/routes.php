<?php

use App\Http\Controllers\Enterprise\DepartmentController;
use App\Http\Controllers\Enterprise\EnterpriseController;
use Illuminate\Support\Facades\Route;

Route::prefix('enterprises')->group(function () {
    Route::get("/", [EnterpriseController::class, 'index'])->middleware('permission:enterprises_list')->name('enterprises.index');
    Route::post("/", [EnterpriseController::class, 'store'])->middleware('permission:enterprises_create')->name('enterprises.store');
    Route::put("/{uuid}", [EnterpriseController::class, 'update'])->middleware('permission:enterprises_edit')->name('enterprises.update');
    Route::delete("/{uuid}", [EnterpriseController::class, 'destroy'])->middleware('permission:enterprises_delete')->name('enterprises.destroy');

    Route::get('/{uuid}', [DepartmentController::class, 'index'])->middleware('permission:enterprises_list')->name('enterprises.show');

    require 'department/routes.php';
});
