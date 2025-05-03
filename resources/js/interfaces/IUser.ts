import { z } from "zod";
import { IRoleForCreateOptions } from "./ISelect";
import { userFormSchema } from "@/schemas/form-user-schema";
import { IAuditLog } from "./ILogs";

interface IUser {
    external_id: string;
    name: string;
    email: string;
    role_user: string;
    status: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

interface IUserData {
    data: IUser[];
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

interface IUserProps {
    users: IUserData;
    rolesForCreateOptions: IRoleForCreateOptions[];
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
        newPassword?: string;
    };
}

interface IUserShowProps {
    user: IUser;
    rolesForCreateOptions: IRoleForCreateOptions[];
    logs: IAuditLog[];
}

interface IUserFormDialogProps {
    data?: any;
    external_id?: string;
    isOpen: boolean;
    rolesForCreateOptions?: IRoleForCreateOptions[];
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<ReturnType<typeof userFormSchema>>,
        external_id?: string
    ) => void;
}

export type { IUser, IUserData, IUserProps, IUserShowProps, IUserFormDialogProps };
