<?php

namespace App\Http\Controllers\ResignationReason;

use App\Http\Requests\ResignationReason\ResignationReasonRequest;
use App\Http\Controllers\AuthController;
use App\Models\ResignationReason;
use Inertia\Inertia;

class ResignationReasonController extends AuthController
{
    protected $model = ResignationReason::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $resignation_reasons = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('resignation_reason/index', [
            'resignationReasons' => $resignation_reasons,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ResignationReasonRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Motivo de demissão criado com sucesso');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ResignationReasonRequest $request, string $uuid)
    {
        $resignation_reason = $this->findByUuid(new $this->model, $uuid);

        $data = $request->validated();
        $resignation_reason->update($data);

        session()->flash('success', 'Motivo de demissão atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $resignation_reason = $this->findByUuid(new $this->model, $uuid);

        $resignation_reason->delete();

        session()->flash('success', 'Motivo de demissão deletado com sucesso');
    }
}
