<?php

namespace App\Http\Requests\Contract;

use App\Http\Requests\CrudRequest;
use App\Models\Resignation;

class ResignationRequest extends CrudRequest
{
    protected $type = Resignation::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
    {
        $rules = [
            'date' => [
                'sometimes',
                'required',
                'date',
            ],
            'resignation_reason_external_id' => [
                'sometimes',
                'required',
                'exists:resignation_reasons, external_id',
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
            'date' => [
                'required',
                'date',
            ],
            'resignation_reason_external_id' => [
                'required',
                'exists:resignation_reasons, external_id',
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
