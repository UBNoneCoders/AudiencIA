<?php

use App\Http\Controllers\Collaborator\PenalityController;
use Illuminate\Support\Facades\Route;

Route::prefix('/{collaboration_uuid}/penalities')->group(function () {
    Route::get('/', [PenalityController::class, 'index'])->middleware('permission:penalities_list')->name('penalities.index');
    Route::get('/create', [PenalityController::class, 'create'])->middleware('permission:penalities_create')->name('penalities.create');
    Route::post('/', [PenalityController::class, 'store'])->middleware('permission:penalities_create')->name('penalities.store');
    Route::get('/{uuid}', [PenalityController::class, 'show'])->middleware('permission:penalities_list')->name('penalities.show');
    Route::get('/{uuid}/edit', [PenalityController::class, 'edit'])->middleware('permission:penalities_edit')->name('penalities.edit');
    Route::put('/{uuid}', [PenalityController::class, 'update'])->middleware('permission:penalities_edit')->name('penalities.update');
    Route::delete('/{uuid}', [PenalityController::class, 'destroy'])->middleware('permission:penalities_delete')->name('penalities.destroy');
});
