import { z } from "zod";
import { permissionFormSchema } from "@/schemas/form-permissions-schema";
import { IRoleForCreateOptions } from "./ISelect";

interface IPermission {
    id: number;
    name: string;
    title: string;
}

interface IPermissionData {
    data: IPermission[];
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

interface IPermissionProps {
    permissions: IPermissionData;
    tables: string[];
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
    };
}

interface IPermissionFormDialogProps {
    data?: any;
    id?: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<typeof permissionFormSchema>,
        id?: number
    ) => void;
    tables?: string[];
}

export type {
    IPermission,
    IPermissionData,
    IPermissionFormDialogProps,
    IPermissionProps,
};
