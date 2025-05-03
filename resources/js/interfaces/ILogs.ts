interface IAuditLog {
    id: number;
    user_id: number;
    user_name: string;
    auditable_type: string;
    auditable_id: number;
    event: string;
    old_values: Record<string, any>;
    new_values: Record<string, any>;
    ip_address: string | null;
    created_at: string;
}

export type { IAuditLog };
