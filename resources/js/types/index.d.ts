export interface User {
    id: number;
    external_id: string;
    name: string;
    email: string;
    email_verified_at?: string;
    permissions: string[];
    roles: string[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
