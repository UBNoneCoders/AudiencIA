<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\AuthController;
use App\Http\Requests\Client\ClientRequest;
use App\Models\Client;
use Inertia\Inertia;

class ClientsController extends AuthController
{
    protected $model = Client::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $clients = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('clients/index', [
            'clients' => $clients,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(ClientRequest $request)
    {
        $data = $request->validated();

        $this->model::create($data);

        session()->flash('success', 'Cliente criado com sucesso');
    }

    public function update(ClientRequest $request, string $id)
    {
        $client = $this->model::findOrFail($id);

        $data = $request->validated();

        $client->update($data);

        session()->flash('success', 'Cliente atualizado com sucesso');
    }

    public function destroy(string $id)
    {
        $client = $this->model::findOrFail($id);

        $client->delete();

        session()->flash('success', 'Cliente deletado com sucesso');
    }
}
