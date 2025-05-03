import { z } from "zod";
import { enterpriseFormSchema } from "@/schemas/form-enterprise-schema";

interface IEnterprise {
    external_id: string;
    name: string;
}

interface IEnterpriseData {
    data: IEnterprise[];
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

interface IEnterpriseProps {
    enterprises: IEnterpriseData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
    };
}

interface IEnterpriseFormDialogProps {
    data?: any;
    external_id?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<typeof enterpriseFormSchema>,
        external_id?: string
    ) => void;
}

export type { IEnterprise, IEnterpriseData, IEnterpriseFormDialogProps, IEnterpriseProps };
