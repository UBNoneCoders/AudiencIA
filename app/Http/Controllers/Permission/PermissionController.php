<?php

namespace App\Http\Controllers\Permission;

use App\Enums\ActiveRoleUser;
use App\Enums\OptionPermissions;
use App\Enums\TableNames;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Permission\PermissionRequest;
use DB;
use Inertia\Inertia;

class PermissionController extends AuthController
{
    protected $model = \App\Models\Permission::class;

    protected $modelRole = \App\Models\Role::class;

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $permissions = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%")->orWhere('title', 'like', "%$search%"))
            ->paginate($perPage);

        $tables = collect(DB::select('SHOW TABLES'))
            ->map(fn($table) => reset($table))
            ->toArray();

        return Inertia::render('permission/index', [
            'permissions' => $permissions,
            'tables' => $tables,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(PermissionRequest $request)
    {
        $data = $request->validated();

        if (!$data['is_for_table']) {
            $permission = $this->model::create([
                'name' => $data['name'],
                'title' => $data['title'],
            ]);

            $this->modelRole::where('name', ActiveRoleUser::SUPORT)->first()->givePermissionTo($permission);
        } else if ($data['is_for_table']) {
            // $columns = Schema::getColumnListing($data['table_name']);
            $options = collect(OptionPermissions::optionsForTables())->map(fn($perm) => $perm->value); // Pega os valores do enum

            $permissions = [];
            foreach ($options as $option) {
                $permissions[] = $this->model::firstOrCreate([
                    'name' => $data['table_name'] . '_' . $option,
                    'title' =>  OptionPermissions::translate($option) . ' ' . TableNames::translate($data['table_name']),
                ]);
            }
            $this->modelRole::where('name', ActiveRoleUser::SUPORT)->first()->givePermissionTo($permissions);
        }

        session()->flash('success', 'Permissão criada com sucesso');
    }

    public function update(PermissionRequest $request, $id)
    {
        $permission = $this->model::findOrFail($id);
        $permission->update($request->validated());

        session()->flash('success', 'Permissão atualizada com sucesso');
    }

    public function destroy($id)
    {
        $permission = $this->model::findOrFail($id);
        $permission->delete();
        $this->modelRole::where('name', ActiveRoleUser::SUPORT)->first()->revokePermissionTo($permission);

        session()->flash('success', 'Permissão deletada com sucesso');
    }
}
