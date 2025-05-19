<?php

namespace App\Http\Requests\User;

use App\Http\Requests\CrudRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\User;

class UserRequest extends CrudRequest
{
    protected $type = User::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
    {
        $rules = [
            'name' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
            'email' => [
                'sometimes',
                'nullable',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . $this->uuid . ',external_id',
            ],
            'password' => [
                'sometimes',
                'nullable',
                'string',
                'min:15',
                'confirmed',
            ],
            'role' => [
                'sometimes',
                'nullable',
                'integer',
            ],
            'active' => [
                'sometimes',
                'nullable',
                'boolean',
            ],
        ];

        return $rules;
    }

    /**
     * Rules when creating resource.
     *
     * @return array
     */
    protected function createRules()
    {
        $rules = [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
            'role' => [
                'required',
                'integer',
            ],
            'active' => [
                'required',
                'boolean',
            ],
        ];

        return $rules;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function baseRules()
    {
        return [];
    }
}
