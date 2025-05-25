<?php

namespace App\Http\Controllers\Hearing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Hearing\HearingRequest;
use App\Models\Hearing;
use App\Models\Process;
use Inertia\Inertia;

class HearingsController extends Controller
{
    protected $model = Hearing::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $hearings = $this->model::query()
            ->when(
                $search,
                fn($query) =>
                $query->whereHas(
                    'process',
                    fn($q) =>
                    $q->where('process_number', 'like', "%$search%")
                        ->orWhere('author_name', 'like', "%$search%")
                )
            )
            ->with('process')
            ->orderBy('process_id', 'asc')
            ->paginate($perPage);

        $processes = Process::select('id', 'process_number')
            ->orderBy('process_number')
            ->get()
            ->map(fn($process) => [
                'label' => $process->process_number,
                'value' => $process->id,
            ]);

        return Inertia::render('hearings/index', [
            'hearings' => $hearings,
            'processes' => $processes,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(HearingRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Audiência criada com sucesso');
    }

    public function update(HearingRequest $request, string $id)
    {
        $client = $this->model::findOrFail($id);

        $data = $request->validated();

        $client->update($data);

        session()->flash('success', 'Audiência atualizada com sucesso');
    }

    public function destroy(string $id)
    {
        $client = $this->model::findOrFail($id);

        $client->delete();

        session()->flash('success', 'Audiência deletada com sucesso');
    }
}
