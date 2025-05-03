<?php

namespace App\Policies;

use App\Enums\ActiveRoleUser;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    public function isSystemOwner(User $user): bool
    {
        return $user->hierarchyLevel() == ActiveRoleUser::SUPORT->hierarchyLevel();
    }

    public function isYourself(User $user, User $model): bool
    {
        return $user->id == $model->id;
    }

    public function view(User $user, User $model): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $model->hierarchyLevel()
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    public function store(User $user, Role $role): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $role->hierarchyLevel()
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    public function update(User $user, User $model): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $model->hierarchyLevel()
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    public function delete(User $user, User $model): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $model->hierarchyLevel()
            ? Response::allow()
            : Response::denyWithStatus(403);
    }
}
