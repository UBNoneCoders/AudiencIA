<?php

namespace App\Http\Controllers\Enterprise;

use App\Models\Department;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Enterprise\DepartmentRequest;

class DepartmentController extends AuthController
{
    protected $model = Department::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $enterprise_uuid)
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);

        $departments = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->where('enterprise_id', $enterprise->id)
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('enterprise/[uuid]/index', [
            'departments' => $departments,
            'enterprise' => $enterprise,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $enterprise_uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);

        return Inertia::render('enterprise/[uuid]/department/create', [
            'enterprise' => $enterprise
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $enterprise_uuid, DepartmentRequest $request)
    {
        $data = $request->validated();

        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);
        $enterprise->departments()->create($data);

        session()->flash('success', 'Departamento criada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $enterprise_uuid, string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);
        $department = $enterprise->departments()->where('external_id', $uuid)->firstOrFail();

        return Inertia::render('enterprise/[uuid]/department/[uuid]/index', [
            'enterprise' => $enterprise,
            'department' => $department,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $enterprise_uuid, string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);
        $department = $enterprise->departments()->where('external_id', operator: $uuid)->firstOrFail();

        return Inertia::render('enterprise/[uuid]/department/[uuid]/edit', [
            'enterprise' => $enterprise,
            'department' => $department,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $enterprise_uuid, DepartmentRequest $request, string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);
        $department = $enterprise->departments()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $department->update($data);

        session()->flash('success', 'Departamento atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $enterprise_uuid, string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $enterprise_uuid);
        $department = $enterprise->departments()->where('external_id', $uuid)->firstOrFail();

        $department->delete();

        session()->flash('success', 'Departamento deletado com sucesso');
    }
}
