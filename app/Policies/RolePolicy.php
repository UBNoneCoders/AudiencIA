<?php

namespace App\Policies;

use App\Enums\ActiveRoleUser;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Log;

class RolePolicy
{
    /**
     * Verifica se o usuário é o dono do sistema (hierarchy_level 0).
     */
    public function isSystemOwner(User $user): bool
    {
        return $user->hierarchyLevel() == ActiveRoleUser::SUPORT->hierarchyLevel();
    }

    public function view(User $user, Role $role): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $role->hierarchy_level
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    public function store(User $user, Role $role): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $role->hierarchy_level
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    /**
     * Determina se o usuário pode atualizar uma Role específica.
     */
    public function update(User $user, Role $role): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $role->hierarchy_level
            ? Response::allow()
            : Response::denyWithStatus(403);
    }

    /**
     * Determina se o usuário pode deletar uma Role específica.
     */
    public function delete(User $user, Role $role): Response
    {
        if ($this->isSystemOwner($user)) {
            return Response::allow();
        }

        return $user->hierarchyLevel() < $role->hierarchy_level
            ? Response::allow()
            : Response::denyWithStatus(403);
    }
}
