<?php

namespace App\Http\Controllers\Contract;

use App\Models\Resignation;
use App\Models\ResignationReason;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Contract\ResignationRequest;

class ResignationController extends AuthController
{
    protected $model = Resignation::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $contract_uuid)
    {
        $perPage = request()->get('per_page', 10);

        $contract = $this->findByUuid(new $this->model, $contract_uuid);

        $resignations = $this->model::query()
            ->where('contract_id', $contract->id)
            ->orderBy('date', 'desc')
            ->paginate($perPage);

        $resignationReasons = $this->options(new ResignationReason(), null, 'name', 'external_id');

        return Inertia::render('contract/[uuid]/resignation/index', [
            'resignations' => $resignations,
            'contract' => $contract,
            'resignationReasons' => $resignationReasons
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $contract_uuid, ResignationRequest $request)
    {
        $data = $request->validated();

        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $contract->resignations()->create($data);

        session()->flash('success', 'Horas extra criada com sucesso');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $contract_uuid, ResignationRequest $request, string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $resignation = $contract->resignations()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $resignation->update($data);

        session()->flash('success', 'Horas extra atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $contract_uuid, string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $resignation = $contract->resignations()->where('external_id', $uuid)->firstOrFail();

        $resignation->delete();

        session()->flash('success', 'Horas extra deletada com sucesso');
    }
}
