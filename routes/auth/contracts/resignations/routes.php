<?php

use App\Http\Controllers\Contract\ResignationController;
use Illuminate\Support\Facades\Route;

Route::prefix('/{contract_uuid}/resignations')->group(function () {
    Route::get("/", [ResignationController::class, 'index'])->middleware('permission:resignations_list')->name('resignations.index');
    Route::post("/", [ResignationController::class, 'store'])->middleware('permission:resignations_create')->name('resignations.store');
    Route::put("/{uuid}", [ResignationController::class, 'update'])->middleware('permission:resignations_edit')->name('resignations.update');
    Route::delete("/{uuid}", [ResignationController::class, 'destroy'])->middleware('permission:resignations_delete')->name('resignations.destroy');
});
