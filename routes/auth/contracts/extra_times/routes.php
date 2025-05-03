<?php

use App\Http\Controllers\Contract\ExtraTimeController;
use Illuminate\Support\Facades\Route;

Route::prefix('/{contract_uuid}/extra_times')->group(function () {
    Route::get("/", [ExtraTimeController::class, 'index'])->middleware('permission:extra_times_list')->name('extra_times.index');
    Route::post("/", [ExtraTimeController::class, 'store'])->middleware('permission:extra_times_create')->name('extra_times.store');
    Route::put("/{uuid}", [ExtraTimeController::class, 'update'])->middleware('permission:extra_times_edit')->name('extra_times.update');
    Route::delete("/{uuid}", [ExtraTimeController::class, 'destroy'])->middleware('permission:extra_times_delete')->name('extra_times.destroy');
});
