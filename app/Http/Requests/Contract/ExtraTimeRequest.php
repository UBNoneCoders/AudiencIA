<?php

namespace App\Http\Requests\Contract;

use App\Enums\ExtraTimeType;
use App\Http\Requests\CrudRequest;
use App\Models\ExtraTime;
use Illuminate\Validation\Rule;

class ExtraTimeRequest extends CrudRequest
{
    protected $type = ExtraTime::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
    {
        $rules = [
            'type' => [
                'sometimes',
                'required',
                Rule::in(ExtraTimeType::values()),
            ],
            'start_datetime' => [
                'sometimes',
                'required',
                'date',
            ],
            'end_datetime' => [
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
            'type' => [
                'required',
                Rule::in(ExtraTimeType::values()),
            ],
            'start_datetime' => [
                'required',
                'date',
            ],
            'end_datetime' => [
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

// type
// start_datetime
// end_datetime
