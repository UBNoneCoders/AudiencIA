<?php

namespace App\Http\Controllers\Role;

use App\Enums\ActiveRoleUser;
use App\Http\Controllers\AuthController;
use App\Http\Requests\Role\RoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends AuthController
{
    protected $model = Role::class;

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $roles = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
            ->where('hierarchy_level', $this->authUser->hierarchyLevel() == ActiveRoleUser::SUPORT->hierarchyLevel() ? '>=' : '>', $this->authUser->hierarchyLevel())
            ->orderBy('hierarchy_level', 'asc')
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('role/index', [
            'roles' => $roles,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        $role = $this->model::create([...$data, 'hierarchy_level' => ActiveRoleUser::DEFAULT->hierarchyLevel()]);

        session()->flash('success', 'Perfil criado com sucesso');
        return redirect()->route('roles.show', $role->id);
    }

    public function update(RoleRequest $request, $id)
    {
        $role = $this->model::findOrFail($id);
        $this->authorize('update', $role);

        $data = $request->validated();
        $role->update($data);

        session()->flash('success', 'Perfil atualizado com sucesso');
    }

    public function destroy($id)
    {
        $role = $this->model::findOrFail($id);
        $this->authorize('delete', $role);

        $role->delete();

        session()->flash('success', 'Perfil deletado com sucesso');
    }

    public function show($id)
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $role = $this->model::findOrFail($id);
        $this->authorize('view', $role);

        $permissions = $role
            ->permissions()
            ->when($search, fn($query) => $query->where('title', 'like', "%$search%"))
            ->paginate($perPage);

        $permissions_select = $this->authUser->getAllPermissions()->filter(fn($permission) => !$role->hasPermissionTo($permission))
            ->map(fn($permission) => ['value' => (string) $permission->id, 'label' => $permission->title])
            ->values();

        return Inertia::render('role/[id]/index', [
            'permissions' => $permissions,
            'queryParams' => ['search' => $search],
            'role' => $role,
            'permissions_select' => $permissions_select,
        ]);
    }

    public function attachPermissions(Request $request, $id)
    {
        $data = $this->validateRequest($request, [
            'permissions_id' => ['required', 'array'],
            'permissions_id.*' => ['required', 'exists:permissions,id']
        ]);

        $role = $this->model::findOrFail($id);
        $this->authorize('update', $role);

        $permissions = Permission::findOrFail($data['permissions_id']);
        $role->givePermissionTo($permissions);

        session()->flash('success', 'Permissões atribuídas com sucesso');
    }

    public function detachPermission($id, $permission_id)
    {
        $role = $this->model::findOrFail($id);
        $this->authorize('update', $role);

        $permission = Permission::findOrFail($permission_id);
        $role->revokePermissionTo($permission);

        session()->flash('success', 'Permissão removida com sucesso');
    }
}
