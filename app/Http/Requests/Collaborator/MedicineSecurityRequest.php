<?php

namespace App\Http\Requests\Collaborator;

use App\Http\Requests\CrudRequest;
use App\Models\MedicineSecurity;

class MedicineSecurityRequest extends CrudRequest
{
    protected $type = MedicineSecurity::class;

    /**
     * Rules when editing resource.
     *
     * @return array
     */
    protected function editRules()
    {
        $rules = [
            'exam_date' => [
                'sometimes',
                'required',
                'date',
            ],
            'exam_type' => [
                'sometimes',
                'required',
                'string',
            ],
            'description' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'doctor_name' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'doctor_crm' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'cid_10' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'medical_assessment' => [
                'sometimes',
                'nullable',
                'string',
            ],
            'finished' => [
                'sometimes',
                'nullable',
                'boolean',
            ],
            'able' => [
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
            'exam_date' => [
                'required',
                'date',
            ],
            'exam_type' => [
                'required',
                'string',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'doctor_name' => [
                'nullable',
                'string',
            ],
            'doctor_crm' => [
                'nullable',
                'string',
            ],
            'cid_10' => [
                'nullable',
                'string',
            ],
            'medical_assessment' => [
                'nullable',
                'string',
            ],
            'finished' => [
                'nullable',
                'boolean',
            ],
            'able' => [
                'nullable',
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

// $table->date('exam_date');
// $table->string('exam_type');
// $table->text('description');
// $table->string('doctor_name');
// $table->string('doctor_crm');
// $table->string('cid_10');
// $table->text('medical_assessment');
// $table->boolean('finished');
// $table->boolean('able');
