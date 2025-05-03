<?php

use App\Http\Controllers\Contract\ContractController;
use Illuminate\Support\Facades\Route;

Route::prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index'])->middleware('permission:contracts_list')->name('contracts.index');
    Route::get('/create', [ContractController::class, 'create'])->middleware('permission:contracts_create')->name('contracts.create');
    Route::post('/', [ContractController::class, 'store'])->middleware('permission:contracts_create')->name('contracts.store');
    Route::get('/{uuid}', [ContractController::class, 'show'])->middleware('permission:contracts_list')->name('contracts.show');
    Route::get('/{uuid}/edit', [ContractController::class, 'edit'])->middleware('permission:contracts_edit')->name('contracts.edit');
    Route::put('/{uuid}', [ContractController::class, 'update'])->middleware('permission:contracts_edit')->name('contracts.update');
    Route::delete('/{uuid}', [ContractController::class, 'destroy'])->middleware('permission:contracts_delete')->name('contracts.destroy');

    require 'extra_times/routes.php';
});
