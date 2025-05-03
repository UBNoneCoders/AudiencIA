<?php

namespace App\Http\Controllers\Collaborator;

use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Collaborator\MedicineSecurityRequest;

class MedicineSecurityController extends AuthController
{
    protected $model = MedicineSecurity::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $collaborator_uuid)
    {
        $perPage = request()->get('per_page', 10);

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        $medicine_security = $this->model::query()
            ->where('collaborator_id', $collaborator->id)
            ->orderBy('exam_date', 'asc')
            ->paginate($perPage);

        return Inertia::render('collaborator/[uuid]/medicine_security/index', [
            'medicineSecurity' => $medicine_security,
            'collaborator' => $collaborator,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $collaborator_uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);

        return Inertia::render('collaborator/[uuid]/medicine_security/create', [
            'collaborator' => $collaborator
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $collaborator_uuid, MedicineSecurityRequest $request)
    {
        $data = $request->validated();

        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $collaborator->medicineSecurity()->create($data);

        session()->flash('success', 'Medicina/Segurança criada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $medicine_security = $collaborator->medicineSecurity()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/medicine_security/[uuid]/index', [
            'collaborator' => $collaborator,
            'medicine_security' => $medicine_security,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $medicine_security = $collaborator->medicineSecurity()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('collaborator/[uuid]/medicine_security/[uuid]/edit', [
            'collaborator' => $collaborator,
            'medicine_security' => $medicine_security,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $collaborator_uuid, MedicineSecurityRequest $request, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $medicine_security = $collaborator->medicineSecurity()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $medicine_security->update($data);

        session()->flash('success', 'Medicina/Segurança atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $collaborator_uuid, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $collaborator_uuid);
        $medicine_security = $collaborator->medicineSecurity()->where('external_id', $uuid)->firstOrFail();

        $medicine_security->delete();

        session()->flash('success', 'Medicina/Segurança deletada com sucesso');
    }
}
