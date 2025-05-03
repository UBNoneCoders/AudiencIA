<?php

namespace App\Http\Requests\Enterprise;

use App\Http\Requests\CrudRequest;
use App\Models\Enterprise;

class EnterpriseRequest extends CrudRequest
{
    protected $type = Enterprise::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
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
