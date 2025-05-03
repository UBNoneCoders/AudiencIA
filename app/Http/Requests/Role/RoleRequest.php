<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\CrudRequest;
use Spatie\Permission\Models\Role;

class RoleRequest extends CrudRequest
{
    protected $type = Role::class;

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
                'unique:roles,name,' . $this->id
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
                'required_if:is_for_table,0',
                'unique:roles,name'
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
