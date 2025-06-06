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
use Illuminate\Support\Str;

class UserController extends AuthController
{
    protected $model = User::class;

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $search = request()->get('search', '');

        $users = $this->model::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%$search%")
            ->orWhere('email', 'like', "%$search%"))
            ->orderBy('name', 'asc')
            ->paginate($perPage);

        return Inertia::render('user/index', [
            'users' => $users,
            'queryParams' => ['search' => $search]
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();

        $data['external_id'] = Str::uuid();
        $data['password'] = bcrypt($data['password']);
        $this->model::create($data);

        session()->flash('success', 'Usuário criado com sucesso');
    }

    public function update(UserRequest $request, string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        if (isset($data['active'])) {
            $data['active'] = (bool) $data['active'] ? 1 : 0;
        }

        $user->update($data);
        session()->flash('success', 'Usuário atualizado com sucesso');
    }


    public function destroy(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $user->delete();

        session()->flash('success', 'Usuário deletado com sucesso');
    }

    public function resetPassword(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);

        $newPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 10);
        $user->update(['password' => bcrypt($newPassword)]);

        session()->flash('success', "Senha redefinida com sucesso.");

        return redirect()->route('users.index')->with('newPassword', $newPassword);
    }


    public function show(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);

        return Inertia::render('user/[uuid]/index', [
            'user' => $user,
        ]);
    }

    public function active(string $uuid)
    {
        $user = $this->findByUuid(new $this->model, $uuid);
        $user->update(['active' => !$user->active]);

        session()->flash('success', 'Usuário atualizado com sucesso');
    }
}
