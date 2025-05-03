<?php

namespace App\Http\Controllers\User;

use App\Enums\ActiveRoleUser;
use App\Http\Controllers\AuthController;
use App\Http\Requests\User\UserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OwenIt\Auditing\Models\Audit;
use Str;

class UserController extends AuthController
{
    protected $model = User::class;

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $users = $this->model::query()
            ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->when($search, fn($query) => $query->where('users.name', 'like', "%$search%")->orWhere('users.email', 'like', "%$search%"))
            ->whereHas('roles', function ($query) {
                $query->where('hierarchy_level', $this->authUser->hierarchyLevel() == ActiveRoleUser::SUPORT->hierarchyLevel() ? '>=' : '>', $this->authUser->hierarchyLevel());
            })
            ->orderBy('roles.hierarchy_level', 'asc')
            ->orderBy('users.name', 'asc')
            ->select('users.*')
            ->paginate($perPage);

        return Inertia::render('user/index', [
            'users' => $users,
            'rolesForCreateOptions' => $this->getRolesForCreateOptions(),
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $role = Role::findOrFail($data['role_id']);
        $this->authorize('store', [User::class, $role]);

        $data['password'] = bcrypt($data['password']);
        $user = $this->model::create($data);
        $user->assignRole($role);

        session()->flash('success', 'Usuário criado com sucesso');
    }

    public function update(UserRequest $request, string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $this->authorize('update', $user);
        $data = $request->validated();
        $oldRole = $user->roles->first();

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        if (isset($data['active'])) {
            $data['active'] = (bool) $data['active'] ? 1 : 0;
        }

        $user->update($data);

        $roleChanged = false;

        if (isset($data['role_id'])) {
            $newRole = Role::findOrFail($data['role_id']);
            if (!$oldRole || $oldRole->id !== $newRole->id) {
                $user->syncRoles($newRole);
                $roleChanged = true;
            }
        }

        if ($roleChanged) {
            Audit::create([
                'user_type' => get_class(auth()->user()),
                'user_id' => auth()->id(),
                'event' => 'updated',
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'old_values' => ['role' => $oldRole ? $oldRole->name : null],
                'new_values' => ['role' => $newRole->name],
                'url' => request()->fullUrl(),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        session()->flash('success', 'Usuário atualizado com sucesso');
    }


    public function destroy(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $this->authorize('delete', $user);

        $user->delete();

        session()->flash('success', 'Usuário deletado com sucesso');
    }

    public function resetPassword(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $this->authorize('update', $user);

        $newPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 10);
        $user->update(['password' => bcrypt($newPassword)]);

        session()->flash('success', "Senha redefinida com sucesso.");

        return redirect()->route('users.index')->with('newPassword', $newPassword);
    }


    public function show(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $this->authorize('view', $user);

        // Mostrar para Pedro!
        // dd($user->id, Audit::pluck('user_id'));

        $logs = Audit::where('user_id', $user->id - 1)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'user_id' => $log->user_id,
                    'user_name' => $log->user->name,
                    'auditable_type' => class_basename($log->auditable_type),
                    'auditable_id' => $log->auditable_id,
                    'event' => $log->event,
                    'old_values' => $log->old_values,
                    'new_values' => $log->new_values,
                    'ip_address' => $log->ip_address,
                    'created_at' => $log->created_at->format('d/m/Y H:i:s'),
                ];
            });

        return Inertia::render('user/[uuid]/index', [
            'user' => $user,
            'rolesForCreateOptions' => $this->getRolesForCreateOptions(),
            'logs' => $logs,
        ]);
    }

    public function active(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $this->authorize('update', $user);

        if ($user->id == $this->authUser->id) {
            session()->flash('error', 'Você não pode desativar sua própria conta');
            return redirect()->back();
        }

        $user->update(['active' => !$user->active]);

        session()->flash('success', 'Usuário atualizado com sucesso');
    }

    private function getRolesForCreateOptions()
    {
        return Role::query()
            ->where('hierarchy_level', $this->authUser->hierarchyLevel() == ActiveRoleUser::SUPORT->hierarchyLevel() ? '>=' : '>', $this->authUser->hierarchyLevel())
            ->orderBy('hierarchy_level', 'asc')
            ->get(['id as value', 'name as label']);
    }
}
