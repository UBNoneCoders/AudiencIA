<?php

namespace App\Http\Requests\Contract;

use App\Http\Requests\CrudRequest;
use App\Models\Contract;
use Illuminate\Validation\Rule;

class ContractRequest extends CrudRequest
{
    protected $type = Contract::class;

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            'role' => ['sometimes', 'required', 'string', 'max:255'],
            'type' => ['sometimes', 'required', 'string', 'max:255'],
            'shift' => ['sometimes', 'required', 'string', 'max:255'],
            'currency' => ['sometimes', 'required', 'string', 'size:3'],
            'salary' => ['sometimes', 'required', 'numeric', 'min:0'],
            'trial_period' => ['sometimes', 'required', 'integer', 'min:0'],
            'termination_value' => ['sometimes', 'required', 'numeric', 'min:0'],
            'registration' => ['sometimes', 'required', 'string', 'max:255'],
            'direct_superior' => ['sometimes', 'required', 'string', 'max:255'],
            'hierarchical_degree' => ['sometimes', 'required', 'string', 'max:255'],
            'date' => ['sometimes', 'required', 'date'],
            'annual_leave' => ['sometimes', 'required', 'integer', 'min:0'],
            'overtime' => ['sometimes', 'required', 'integer', 'min:0'],
            'duration' => ['sometimes', 'required', 'integer', 'min:0'],
            'department_id' => ['sometimes', 'required', 'exists:departments,id'],
            'collaborator_id' => ['sometimes', 'required', 'exists:collaborators,id'],
        ];
    }

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            'role' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'shift' => ['required', 'string', 'max:255'],
            'currency' => ['required', 'string', 'size:3'],
            'salary' => ['required', 'numeric', 'min:0'],
            'trial_period' => ['required', 'integer', 'min:0'],
            'termination_value' => ['required', 'numeric', 'min:0'],
            'registration' => ['required', 'string', 'max:255'],
            'direct_superior' => ['required', 'string', 'max:255'],
            'hierarchical_degree' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'annual_leave' => ['required', 'integer', 'min:0'],
            'overtime' => ['required', 'integer', 'min:0'],
            'duration' => ['required', 'integer', 'min:0'],
            'department_id' => ['required', 'exists:departments,id'],
            'collaborator_id' => ['required', 'exists:collaborators,id'],
        ];
    }

    /**
     * Regras comuns a create/edit.
     */
    public function baseRules(): array
    {
        return [];
    }
}
