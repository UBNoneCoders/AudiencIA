<?php

namespace App\Http\Controllers\Contract;

use App\Enums\ExtraTimeType;
use App\Models\ExtraTime;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Contract\ExtraTimeRequest;

class ExtraTimeController extends AuthController
{
    protected $model = ExtraTime::class;

    /**
     * Display a listing of the resource.
     */
    public function index(string $contract_uuid)
    {
        $perPage = request()->get('per_page', 10);

        $contract = $this->findByUuid(new $this->model, $contract_uuid);

        $extra_times = $this->model::query()
            ->where('contract_id', $contract->id)
            ->orderBy('start_datetime', 'desc')
            ->paginate($perPage);

        return Inertia::render('contract/[uuid]/extra_time/index', [
            'extra_times' => $extra_times,
            'contract' => $contract,
            'extraTime' => ExtraTimeType::options(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $contract_uuid, ExtraTimeRequest $request)
    {
        $data = $request->validated();

        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $contract->extra_times()->create($data);

        session()->flash('success', 'Horas extra criada com sucesso');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $contract_uuid, ExtraTimeRequest $request, string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $extra_time = $contract->extra_times()->where('external_id', $uuid)->firstOrFail();

        $data = $request->validated();
        $extra_time->update($data);

        session()->flash('success', 'Horas extra atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $contract_uuid, string $uuid)
    {
        $contract = $this->findByUuid(new $this->model, $contract_uuid);
        $extra_time = $contract->extra_times()->where('external_id', $uuid)->firstOrFail();

        $extra_time->delete();

        session()->flash('success', 'Horas extra deletada com sucesso');
    }
}
