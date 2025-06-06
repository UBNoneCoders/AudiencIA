<?php

namespace App\Http\Requests\Process;

use App\Http\Requests\CrudRequest;
use App\Models\Process;

class ProcessRequest extends CrudRequest
{
    protected $type = Process::class;

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            'client_id' => ['sometimes', 'required', 'exists:clients,id'],
            'author_name' => ['sometimes', 'required', 'string', 'max:255'],
            'opposing_party_name' => ['sometimes', 'required', 'string', 'max:255'],
            'process_number' => ['sometimes', 'required', 'string', 'max:50'],
            'case_reason' => ['sometimes', 'required', 'string', 'max:255'],
            'case_value' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            'client_id' => ['required', 'exists:clients,id'],
            'author_name' => ['required', 'string', 'max:255'],
            'opposing_party_name' => ['required', 'string', 'max:255'],
            'process_number' => ['required', 'string', 'max:50'],
            'case_reason' => ['required', 'string', 'max:255'],
            'case_value' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
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
