import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

// Verificar se o usuário possui a permissão
export const useHasPermission = (permission?: string) => {
    const { auth } = usePage<PageProps>().props;

    if (!permission) return true;
    return auth.user.permissions.includes(permission);
};

// Verificar se o usuário possui pelo menos uma das permissões especificadas.
export const useHasAnyPermission = (permissions: string[]) => {
    const { auth } = usePage<PageProps>().props;

    return permissions.some((permission) => auth.user.permissions.includes(permission));
};

// Verificar se o usuário possui todas as permissões especificadas.
export const useHasAllPermissions = (permissions: string[]) => {
    const { auth } = usePage<PageProps>().props;

    return permissions.every((permission) => auth.user.permissions.includes(permission));
}


// Verificar se o usuário possui a função
export const useHasRole = (role?: string) => {
    const { auth } = usePage<PageProps>().props;

    if (!role) return true;
    return auth.user.roles.includes(role);
};
