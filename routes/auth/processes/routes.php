<?php


use App\Http\Controllers\Process\ProcessesController;
use Illuminate\Support\Facades\Route;

Route::prefix('processes')->group(function () {
    Route::get("/", [ProcessesController::class, 'index'])->name('processes.index');
    Route::post("/", [ProcessesController::class, 'store'])->name('processes.store');
    Route::put("/{uuid}", [ProcessesController::class, 'update'])->name('processes.update');
    Route::delete("/{uuid}", [ProcessesController::class, 'destroy'])->name('processes.destroy');
});
