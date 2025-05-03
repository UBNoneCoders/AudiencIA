<?php

namespace App\Http\Controllers\Collaborator;

use App\Enums\CivilStatusType;
use App\Enums\EducationLevelType;
use App\Enums\EthnicityType;
use App\Http\Requests\Collaborator\CollaboratorRequest;
use App\Http\Controllers\AuthController;
use App\Models\Benefit;
use App\Models\Collaborator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollaboratorController extends AuthController
{
    protected $model = Collaborator::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $collaborators = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('collaborator/index', [
            'collaborators' => $collaborators,
            'queryParams' => ['search' => $search]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show(string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);
        $address = $collaborator->address;
        $document = $collaborator->document;
        $contact = $collaborator->contact;

        return Inertia::render('collaborator/[uuid]/index', [
            'collaborator' => $collaborator,
            'address' => $address,
            'document' => $document,
            'contact' => $contact,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('collaborator/[uuid]/create', [
            'civilStatus' => CivilStatusType::options(),
            'educationLevel' => EducationLevelType::options(),
            'ethnicity' => EthnicityType::options(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CollaboratorRequest $request)
    {
        $data = $request->validated();

        $collaborator = $this->model::create($data['collaborator']);
        $collaborator->address()->create($data['address']);
        $collaborator->document()->create($data['document']);
        $collaborator->contact()->create($data['contact']);

        session()->flash('success', 'Colaborador(a) criado com sucesso');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);
        $address = $collaborator->address;
        $document = $collaborator->document;
        $contact = $collaborator->contact;

        return Inertia::render('collaborator/[uuid]/edit', [
            'collaborator' => $collaborator,
            'address' => $address,
            'document' => $document,
            'contact' => $contact,
            'civilStatus' => CivilStatusType::options(),
            'educationLevel' => EducationLevelType::options(),
            'ethnicity' => EthnicityType::options(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CollaboratorRequest $request, string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);
        $data = $request->validated();

        $collaborator->update($data['collaborator']);
        $collaborator->address()->update($data['address']);
        $collaborator->document()->update($data['document']);
        $collaborator->contact()->update($data['contact']);

        session()->flash('success', 'Colaborador(a) atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);

        $collaborator->delete();

        session()->flash('success', 'Colaborador(a) deletado com sucesso');
    }

    public function indexBenefits(string $uuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);
        $benefits = $collaborator->benefits;

        return Inertia::render('collaborator/[uuid]/benefits/index', [
            'collaborator' => $collaborator,
            'benefits' => $benefits,
        ]);
    }

    public function attachBenefits(Request $request, string $uuid)
    {
        $data = $this->validateRequest($request, [
            'benefits_uuid' => ['required', 'array'],
            'benefits_uuid.*' => ['required', 'exists:benefits,external_id']
        ]);

        $collaborator = $this->findByUuid(new $this->model, $uuid);

        $benefits = Benefit::whereIn('external_id', $data['benefits_uuid'])->get();
        $benefits->each(function ($benefit) use ($collaborator) {
            $collaborator->benefits()->attach($benefit->id);
        });

        session()->flash('success', 'Benefícios adicionados com sucesso');
    }

    public function detachBenefits(string $uuid, string $benefitUuid)
    {
        $collaborator = $this->findByUuid(new $this->model, $uuid);
        $benefit = Benefit::where('external_id', $benefitUuid)->firstOrFail();

        $collaborator->benefits()->detach($benefit->id);

        session()->flash('success', 'Benefício removido com sucesso');
    }

}
