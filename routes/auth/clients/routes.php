<?php


use App\Http\Controllers\Client\ClientsController;
use Illuminate\Support\Facades\Route;

Route::prefix('clients')->group(function () {
    Route::get("/", [ClientsController::class, 'index'])->name('clients.index');
    Route::post("/", [ClientsController::class, 'store'])->name('clients.store');
    Route::put("/{uuid}", [ClientsController::class, 'update'])->name('clients.update');
    Route::delete("/{uuid}", [ClientsController::class, 'destroy'])->name('clients.destroy');
});
