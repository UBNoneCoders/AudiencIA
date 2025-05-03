<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Collaborator\VacationController;

Route::prefix('/{collaboration_uuid}/vacations')->group(function () {
    Route::get('/', [VacationController::class, 'index'])->middleware('permission:vacations_list')->name('vacations.index');
    Route::get('/create', [VacationController::class, 'create'])->middleware('permission:vacations_create')->name('vacations.create');
    Route::post('/', [VacationController::class, 'store'])->middleware('permission:vacations_create')->name('vacations.store');
    Route::get('/{uuid}', [VacationController::class, 'show'])->middleware('permission:vacations_list')->name('vacations.show');
    Route::get('/{uuid}/edit', [VacationController::class, 'edit'])->middleware('permission:vacations_edit')->name('vacations.edit');
    Route::put('/{uuid}', [VacationController::class, 'update'])->middleware('permission:vacations_edit')->name('vacations.update');
    Route::delete('/{uuid}', [VacationController::class, 'destroy'])->middleware('permission:vacations_delete')->name('vacations.destroy');
});
