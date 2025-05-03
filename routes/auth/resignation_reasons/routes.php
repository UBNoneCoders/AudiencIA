<?php

use App\Http\Controllers\ResignationReason\ResignationReasonController;
use Illuminate\Support\Facades\Route;

Route::prefix('resignation_reasons')->group(function () {
    Route::get("/", [ResignationReasonController::class, 'index'])->middleware('permission:resignation_reasons_list')->name('resignation_reasons.index');
    Route::post("/", [ResignationReasonController::class, 'store'])->middleware('permission:resignation_reasons_create')->name('resignation_reasons.store');
    Route::put("/{uuid}", [ResignationReasonController::class, 'update'])->middleware('permission:resignation_reasons_edit')->name('resignation_reasons.update');
    Route::delete("/{uuid}", [ResignationReasonController::class, 'destroy'])->middleware('permission:resignation_reasons_delete')->name('resignation_reasons.destroy');
});
