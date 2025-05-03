<?php

use App\Http\Controllers\Collaborator\CollaboratorController;
use Illuminate\Support\Facades\Route;

Route::prefix('collaborators')->group(function () {
    Route::get('/', [CollaboratorController::class, 'index'])->middleware('permission:collaborators_list')->name('collaborators.index');
    Route::get('/create', [CollaboratorController::class, 'create'])->middleware('permission:collaborators_create')->name('collaborators.create');
    Route::post('/', [CollaboratorController::class, 'store'])->middleware('permission:collaborators_create')->name('collaborators.store');
    Route::get('/{uuid}', [CollaboratorController::class, 'show'])->middleware('permission:collaborators_list')->name('collaborators.show');
    Route::get('/{uuid}/edit', [CollaboratorController::class, 'edit'])->middleware('permission:collaborators_edit')->name('collaborators.edit');
    Route::put('/{uuid}', [CollaboratorController::class, 'update'])->middleware('permission:collaborators_edit')->name('collaborators.update');
    Route::delete('/{uuid}', [CollaboratorController::class, 'destroy'])->middleware('permission:collaborators_delete')->name('collaborators.destroy');

    Route::get('/{uuid}/benefits', [CollaboratorController::class, 'benefits'])->middleware('permission:collaborators_list')->name('collaborators.benefits.index');
    Route::post('/{uuid}/benefits', [CollaboratorController::class, 'attachBenefits'])->middleware('permission:collaborators_edit')->name('collaborators.benefits.attachBenefits');
    Route::delete('/{uuid}/benefits/{benefit_uuid}', [CollaboratorController::class, 'detachBenefit'])->middleware('permission:collaborators_edit')->name('collaborators.benefits.detachBenefit');

    require 'vacations/routes.php';
    require 'penalities/routes.php';
    require 'medicine_securities/routes.php';
});
