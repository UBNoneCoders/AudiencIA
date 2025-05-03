<?php

namespace App\Http\Requests\Permission;

use App\Http\Requests\CrudRequest;
use Spatie\Permission\Models\Permission;

class PermissionRequest extends CrudRequest
{
    protected $type = Permission::class;

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
                'unique:permissions,name,' . $this->id
            ],
            'title' => [
                'required',
                'string',
                'unique:permissions,title,' . $this->id
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
            'is_for_table' => [
                'required',
                'boolean'
            ],
            'name' => [
                'required_if:is_for_table,0',
                'unique:permissions,name'
            ],
            'title' => [
                'required_if:is_for_table,0',
                'unique:permissions,title',
                'string'
            ],
            'table_name' => [
                'required_if:is_for_table,1',
                'string'
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
