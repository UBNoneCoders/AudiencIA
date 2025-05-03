<?php

namespace App\Http\Requests\Benefit;

use App\Http\Requests\CrudRequest;
use App\Models\Benefit;

class BenefitRequest extends CrudRequest
{
    protected $type = Benefit::class;

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'value' => ['sometimes', 'required', 'numeric'],
            'punishment_loss' => ['sometimes', 'required', 'boolean'],
        ];
    }

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'value' => ['required', 'numeric'],
            'punishment_loss' => ['required', 'boolean'],
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
