<?php

namespace App\Http\Controllers\Process;

use App\Http\Controllers\AuthController;
use App\Http\Requests\Process\ProcessRequest;
use App\Models\Process;
use App\Models\Client;
use Inertia\Inertia;

class ProcessesController extends AuthController
{
    protected $model = Process::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $processes = $this->model::query()
            ->when($search, fn($query) => $query->where('author_name', 'like', "%$search%"))
            ->orderBy('author_name', 'asc')
            ->paginate($perPage);

        $clients = Client::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($client) {
                return [
                    'label' => $client->name,
                    'value' => $client->id
                ];
            });

        return Inertia::render('processes/index', [
            'processes' => $processes,
            'clients' => $clients,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(ProcessRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Processo criado com sucesso');
    }

    public function update(ProcessRequest $request, string $id)
    {
        $client = $this->model::findOrFail($id);

        $data = $request->validated();

        $client->update($data);

        session()->flash('success', 'Processo atualizado com sucesso');
    }

    public function destroy(string $id)
    {
        $client = $this->model::findOrFail($id);

        $client->delete();

        session()->flash('success', 'Processo deletado com sucesso');
    }
}
