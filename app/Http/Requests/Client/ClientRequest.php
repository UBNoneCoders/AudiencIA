<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\CrudRequest;
use App\Models\Client;

class ClientRequest extends CrudRequest
{
    protected $type = Client::class;

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'gender' => ['sometimes', 'required', 'string', 'in:masculino,feminino,outro'],
            'whatsapp' => ['sometimes', 'required', 'string', 'max:20'],
        ];
    }

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'in:masculino,feminino,outro'],
            'whatsapp' => ['required', 'string', 'max:20'],
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
