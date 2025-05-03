<?php

namespace App\Http\Requests\Collaborator;

use App\Http\Requests\CrudRequest;
use App\Models\Penality;

class PenalityRequest extends CrudRequest
{
    protected $type = Penality::class;

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
                'required',
                'string',
            ],
            'description' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'date_occurrence' => [
                'sometimes',
                'required',
                'date',
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
            'date_occurrence' => [
                'required',
                'date',
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

// name
// description
// date_occurrence
