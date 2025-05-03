<?php

namespace App\Http\Requests\Collaborator;

use App\Http\Requests\CrudRequest;
use App\Models\Vacation;

class VacationRequest extends CrudRequest
{
    protected $type = Vacation::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
    {
        $rules = [
            'start_date' => [
                'sometimes',
                'required',
                'date',
            ],
            'end_date' => [
                'sometimes',
                'required',
                'date',
            ],
            'days' => [
                'sometimes',
                'required',
                'integer',
            ],
            'deadline' => [
                'sometimes',
                'required',
                'date',
            ],
            'days_allowance' => [
                'sometimes',
                'nullable',
                'integer',
            ],
            'value_allowance' => [
                'sometimes',
                'nullable',
                'numeric',
            ],
            'days_used' => [
                'sometimes',
                'nullable',
                'numeric',
            ],
            'observations' => [
                'sometimes',
                'nullable',
                'string',
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
            'start_date' => [
                'required',
                'date',
            ],
            'end_date' => [
                'required',
                'date',
            ],
            'days' => [
                'required',
                'integer',
            ],
            'deadline' => [
                'required',
                'date',
            ],
            'days_allowance' => [
                'nullable',
                'integer',
            ],
            'value_allowance' => [
                'nullable',
                'numeric',
            ],
            'days_used' => [
                'nullable',
                'numeric',
            ],
            'observations' => [
                'nullable',
                'string',
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
