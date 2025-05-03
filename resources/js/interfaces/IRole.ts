import { z } from "zod";
import { roleFormSchema } from "@/schemas/form-role-schema";
import { roleIdFormSchema } from "@/schemas/form-role-id-schema";
import { IPermissionData } from "./IPermission";

interface IRole {
    id: number;
    name: string;
}

interface IRoleData {
    data: IRole[];
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    from: number;
    per_page: number;
    total: number;
    current_page: number;
    last_page: number;
}

interface IRoleProps {
    roles: IRoleData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
}

interface IRoleFormDialogProps {
    data?: any;
    id?: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (values: z.infer<typeof roleFormSchema>, id?: number) => void;
}

interface IRoleIdProps {
    permissions: IPermissionData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    role: IRole;
    permissions_select: ISelectData[];
}

interface ISelectData {
    value: string;
    label: string;
}

interface IRoleIdFormDialogProps {
    data?: any;
    id?: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (values: z.infer<typeof roleIdFormSchema>, role: IRole) => void;
    role: IRole;
    permissions_select: ISelectData[];
}

export type {
    IRole,
    IRoleData,
    IRoleProps,
    IRoleFormDialogProps,
    IRoleIdProps,
    ISelectData,
    IRoleIdFormDialogProps,
};
