import { z } from "zod";
import { benefitFormSchema } from "@/schemas/form-benefit-schema";

interface IBenefit {
    external_id: string;
    name: string;
    value: number;
    punishment_loss: boolean;
}

interface IBenefitData {
    data: IBenefit[];
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

interface IBenefitProps {
    benefits: IBenefitData;
    queryParams: {
        search?: string;
        [key: string]: any;
    };
    flash: {
        sucess?: string;
        error?: string;
    };
}

interface IBenefitFormDialogProps {
    data?: any;
    external_id?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (
        values: z.infer<ReturnType<typeof benefitFormSchema>>,
        external_id?: string
    ) => void;
}

export type { IBenefit, IBenefitData, IBenefitFormDialogProps, IBenefitProps };
