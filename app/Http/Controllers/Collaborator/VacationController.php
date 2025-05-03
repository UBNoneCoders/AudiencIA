<?php

namespace App\Http\Controllers\Collaborator;

use App\Models\Vacation;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Collaborator\VacationRequest;

class VacationController extends AuthController
{
    protected $model = Vacation::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $collaborator_uuid)
    {
        $perPage = request()->get('per_page', 10);

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        $vacations = $this->model::query()
            ->where('collaborator_id', $collaborator->id)
            ->orderBy('start_date', 'asc')
            ->paginate($perPage);

        return Inertia::render('collaborator/[uuid]/vacation/index', [
            'vacations' => $vacations,
            'collaborator' => $collaborator,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $collaborator_uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        return Inertia::render('collaborator/[uuid]/vacation/create', [
            'collaborator' => $collaborator
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $collaborator_uuid, VacationRequest $request)
    {
        $data = $request->validated();

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $collaborator->vacations()->create($data);

        session()->flash('success', 'Férias criada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $vacation = $collaborator->vacations()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/vacation/[uuid]/index', [
            'collaborator' => $collaborator,
            'vacation' => $vacation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $vacation = $collaborator->vacations()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/vacation/[uuid]/edit', [
            'collaborator' => $collaborator,
            'vacation' => $vacation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $collaborator_uuid, VacationRequest $request, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $vacation = $collaborator->vacations()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $vacation->update($data);

        session()->flash('success', 'Férias atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $vacation = $collaborator->vacations()->where('external_id', $uuid)->firstOrFail();

        $vacation->delete();

        session()->flash('success', 'Férias deletada com sucesso');
    }
}
