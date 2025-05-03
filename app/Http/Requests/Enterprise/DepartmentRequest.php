<?php

namespace App\Http\Requests\Enterprise;

use App\Http\Requests\CrudRequest;
use App\Models\Department;

class DepartmentRequest extends CrudRequest
{
    protected $type = Department::class;

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
            ],
            'description' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'responsible' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'monthly_budget' => [
                'nullable',
                'numeric',
            ],
            'location' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'telephone' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'fax' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'ramal' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'email' => [
                'sometimes',
                'nullable',
                'email',
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
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'responsible' => [
                'nullable',
                'string',
            ],
            'monthly_budget' => [
                'nullable',
                'numeric',
            ],
            'location' => [
                'nullable',
                'string',
            ],
            'telephone' => [
                'nullable',
                'string',
            ],
            'fax' => [
                'nullable',
                'string',
            ],
            'ramal' => [
                'nullable',
                'string',
            ],
            'email' => [
                'nullable',
                'email',
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
