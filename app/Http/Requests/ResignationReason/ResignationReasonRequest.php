<?php

namespace App\Http\Requests\ResignationReason;

use App\Http\Requests\CrudRequest;
use App\Models\ResignationReason;

class ResignationReasonRequest extends CrudRequest
{
    protected $type = ResignationReason::class;

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
