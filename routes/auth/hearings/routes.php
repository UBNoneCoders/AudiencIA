<?php


use App\Http\Controllers\Hearing\HearingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('hearings')->group(function () {
  Route::get("/", [HearingsController::class, 'index'])->name('hearings.index');
  Route::post("/", [HearingsController::class, 'store'])->name('hearings.store');
  Route::put("/{uuid}", [HearingsController::class, 'update'])->name('hearings.update');
  Route::delete("/{uuid}", [HearingsController::class, 'destroy'])->name('hearings.destroy');
});
