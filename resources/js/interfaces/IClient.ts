import { z } from "zod";
import { clientFormSchema } from "@/schemas/form-client-schema";

interface IClient {
    external_id: string;
    name: string;
    gender: string;
    whatsapp: number;
}

interface IClientData {
    data: IClient[];
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

interface IClientProps {
    benefits: IClientData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
    };
}

interface IClientFormDialogProps {
    data?: any;
    id?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<ReturnType<typeof clientFormSchema>>,
        external_id?: string
    ) => void;
}

export type { IClient, IClientData, IClientProps, IClientFormDialogProps };
