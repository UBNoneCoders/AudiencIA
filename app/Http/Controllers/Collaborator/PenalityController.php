<?php

namespace App\Http\Controllers\Collaborator;

use App\Models\Penality;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Collaborator\PenalityRequest;

class PenalityController extends AuthController
{
    protected $model = Penality::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $collaborator_uuid)
    {
        $perPage = request()->get('per_page', 10);

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        $Penalities = $this->model::query()
            ->where('collaborator_id', $collaborator->id)
            ->orderBy('date_occurrence', 'desc')
            ->paginate($perPage);

        return Inertia::render('collaborator/[uuid]/penality/index', [
            'penalitys' => $Penalities,
            'collaborator' => $collaborator,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $collaborator_uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        return Inertia::render('collaborator/[uuid]/penality/create', [
            'collaborator' => $collaborator
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $collaborator_uuid, PenalityRequest $request)
    {
        $data = $request->validated();

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $collaborator->Penality()->create($data);

        session()->flash('success', 'Penalidade criada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $penality = $collaborator->penality()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/penality/[uuid]/index', [
            'collaborator' => $collaborator,
            'penality' => $penality,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $penality = $collaborator->penalitys()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/penality/[uuid]/edit', [
            'collaborator' => $collaborator,
            'penality' => $penality,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $collaborator_uuid, PenalityRequest $request, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $penality = $collaborator->penalitys()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $penality->update($data);

        session()->flash('success', 'Penalidade atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $penality = $collaborator->penalitys()->where('external_id', $uuid)->firstOrFail();

        $penality->delete();

        session()->flash('success', 'Penalidade deletada com sucesso');
    }
}
