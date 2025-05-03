import { z } from "zod";
import { resignationReasonFormSchema } from "@/schemas/form-resignation-reason-schema";

interface IResignationReason {
    external_id: string;
    name: string;
}

interface IResignationReasonData {
    data: IResignationReason[];
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

interface IResignationReasonProps {
    resignationReasons: IResignationReasonData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
    };
}

interface IResignationReasonFormDialogProps {
    data?: any;
    external_id?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<typeof resignationReasonFormSchema>,
        external_id?: string
    ) => void;
}

export type { IResignationReason, IResignationReasonData, IResignationReasonFormDialogProps, IResignationReasonProps };
