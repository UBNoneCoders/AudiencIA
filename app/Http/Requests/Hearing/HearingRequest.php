<?php

namespace App\Http\Requests\Hearing;

use App\Http\Requests\CrudRequest;
use App\Models\Hearing;

class HearingRequest extends CrudRequest
{
    protected $type = Hearing::class;

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            'process_id' => ['required', 'exists:processes,id'],
            'type' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'link' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
        ];
    }

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            'process_id' => ['sometimes', 'required', 'exists:processes,id'],
            'type' => ['sometimes', 'required', 'string', 'max:255'],
            'date' => ['sometimes', 'required', 'date'],
            'link' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }

    /**
     * Regras comuns para create/edit (base).
     */
    public function baseRules(): array
    {
        return [];
    }
}
