<?php

namespace App\Http\Controllers\Contract;

use App\Http\Requests\Contract\ContractRequest;
use App\Http\Controllers\AuthController;
use App\Models\Collaborator;
use App\Models\Contract;
use App\Models\Department;
use Inertia\Inertia;

class ContractController extends AuthController
{
    protected $model = Contract::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $contracts = $this->model::query()
            // ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('contract/index', [
            'contracts' => $contracts,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show(string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $uuid);

        return Inertia::render('contract/[uuid]/index', [
            'contract' => $contract,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $collaborators = $this->options(new Collaborator, null, 'name', 'external_id');
        $departments = $this->options(
            new Department(),
            function ($q) {
                $q->selectRaw("
                    CONCAT(enterprises.name, ' - ', departments.name) AS name_ref,
                    departments.external_id AS external_id_ref
                ")
                    ->join('enterprises', 'enterprises.id', '=', 'departments.enterprise_id')
                    ->orderBy('enterprises.name')
                    ->orderBy('departments.name');
            },
            'name_ref',
            'external_id_ref'
        );

        return Inertia::render('contract/[uuid]/create', [
            'collaborators' => $collaborators,
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContractRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Contrato criado com sucesso');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $uuid);
        $collaborators = $this->options(new Collaborator, null, 'name', 'external_id');
        $departments = $this->options(
            new Department(),
            function ($q) {
                $q->selectRaw("
                    CONCAT(enterprises.name, ' - ', departments.name) AS name_ref,
                    departments.external_id AS external_id_ref
                ")
                    ->join('enterprises', 'enterprises.id', '=', 'departments.enterprise_id')
                    ->orderBy('enterprises.name')
                    ->orderBy('departments.name');
            },
            'name_ref',
            'external_id_ref'
        );

        return Inertia::render('contract/[uuid]/edit', [
            'contract' => $contract,
            'collaborators' => $collaborators,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContractRequest $request, string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $uuid);
        $data = $request->validated();

        $contract->update($data);

        session()->flash('success', 'Contrato atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $uuid);

        $contract->delete();

        session()->flash('success', 'Contrato deletado com sucesso');
    }
}
