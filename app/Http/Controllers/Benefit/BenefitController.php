<?php

namespace App\Http\Controllers\Benefit;

use App\Models\Benefit;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Benefit\BenefitRequest;

class BenefitController extends AuthController
{
    protected $model = Benefit::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $benefits = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('benefit/index', [
            'benefits' => $benefits,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BenefitRequest $request)
    {
        $data = $request->validated();
        
        $this->model::create($data);

        session()->flash('success', 'Beneficio criado com sucesso');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BenefitRequest $request, string $uuid)
    {
        $benefit = $this->findByUuid(new $this->model, $uuid);

        $data = $request->validated();
        $benefit->update($data);

        session()->flash('success', 'Beneficio atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $benefit = $this->findByUuid(new $this->model, $uuid);

        $benefit->delete();

        session()->flash('success', 'Beneficio deletado com sucesso');
    }
}
