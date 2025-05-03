<?php

namespace App\Http\Controllers\Enterprise;

use App\Http\Requests\Enterprise\EnterpriseRequest;
use App\Http\Controllers\AuthController;
use App\Models\Enterprise;
use Inertia\Inertia;

class EnterpriseController extends AuthController
{
    protected $model = Enterprise::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $enterprises = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('enterprise/index', [
            'enterprises' => $enterprises,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EnterpriseRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Empresa criada com sucesso');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EnterpriseRequest $request, string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $uuid);

        $data = $request->validated();
        $enterprise->update($data);

        session()->flash('success', 'Empresa atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $enterprise = $this->findByUuid(new $this->model, $uuid);

        $enterprise->delete();

        session()->flash('success', 'Empresa deletada com sucesso');
    }
}
