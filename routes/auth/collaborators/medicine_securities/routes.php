<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Collaborator\MedicineSecurityController;


Route::prefix('/{collaboration_uuid}/medicine_securities')->group(function () {
    Route::get('/', [MedicineSecurityController::class, 'index'])->middleware('permission:medicine_securities_list')->name('medicine_securities.index');
    Route::get('/create', [MedicineSecurityController::class, 'create'])->middleware('permission:medicine_securities_create')->name('medicine_securities.create');
    Route::post('/', [MedicineSecurityController::class, 'store'])->middleware('permission:medicine_securities_create')->name('medicine_securities.store');
    Route::get('/{uuid}', [MedicineSecurityController::class, 'show'])->middleware('permission:medicine_securities_list')->name('medicine_securities.show');
    Route::get('/{uuid}/edit', [MedicineSecurityController::class, 'edit'])->middleware('permission:medicine_securities_edit')->name('medicine_securities.edit');
    Route::put('/{uuid}', [MedicineSecurityController::class, 'update'])->middleware('permission:medicine_securities_edit')->name('medicine_securities.update');
    Route::delete('/{uuid}', [MedicineSecurityController::class, 'destroy'])->middleware('permission:medicine_securities_delete')->name('medicine_securities.destroy');
});
