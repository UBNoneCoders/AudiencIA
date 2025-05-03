<?php

use App\Http\Controllers\Benefit\BenefitController;
use Illuminate\Support\Facades\Route;

Route::prefix('benefits')->group(function () {
    Route::get("/", [BenefitController::class, 'index'])->middleware('permission:benefits_list')->name('benefits.index');
    Route::post("/", [BenefitController::class, 'store'])->middleware('permission:benefits_create')->name('benefits.store');
    Route::put("/{uuid}", [BenefitController::class, 'update'])->middleware('permission:benefits_edit')->name('benefits.update');
    Route::delete("/{uuid}", [BenefitController::class, 'destroy'])->middleware('permission:benefits_delete')->name('benefits.destroy');
});
