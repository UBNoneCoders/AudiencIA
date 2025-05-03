<?php

namespace App\Http\Controllers\Vacation;

use App\Models\Vacation;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Vacation\VacationRequest;

class VacationController extends AuthController
{
    protected $model = Vacation::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);

        $vacations = $this->model::query()
            ->orderBy('start_date', 'asc')
            ->paginate($perPage);

        return Inertia::render('vacation/index', [
            'vacations' => $vacations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('vacation/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VacationRequest $request)
    {
        $data = $request->validated();

        $collaborator = $this->findByUuid(new $this->model, $data['collaborator_external_id']);
        $collaborator->vacations()->create($data);

        session()->flash('success', 'Férias criada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid)
    {
        $vacation = $this->findByUuid(new $this->model, $uuid);
        $collaborator = $vacation->collaborator();

        return Inertia::render('vacation/[uuid]/index', [
            'collaborator' => $collaborator,
            'vacation' => $vacation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $uuid)
    {
        $vacation = $this->findByUuid(new $this->model, $uuid);
        $collaborator = $vacation->collaborator();

        return Inertia::render('vacation/[uuid]/edit', [
            'collaborator' => $collaborator,
            'vacation' => $vacation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VacationRequest $request, string $uuid)
    {
        $data = $request->validated();

        $collaborator = $this->findByUuid(new $this->model, $data['collaborator_external_id']);

        $vacation = $collaborator->vacations()->where('external_id', $uuid)->firstOrFail();
        $vacation->update($data);

        session()->flash('success', 'Férias atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $vacation = $this->findByUuid(new $this->model, $uuid);

        $vacation->delete();

        session()->flash('success', 'Férias deletada com sucesso');
    }
}
