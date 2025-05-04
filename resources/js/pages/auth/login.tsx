import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Checkbox from "@/components/checkbox";
import conectaLogo from "@/assets/images/banner.jpg";
import { cn } from "@/lib/utils";
import loginFormSchema from "@/schemas/form-login-schema";

export default function Login() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        router.post("/login", values, {
            onError: (errors) => {
                if (errors.email) {
                    form.setError("email", {
                        type: "manual",
                        message: errors.email,
                    });
                }
                if (errors.password) {
                    form.setError("password", {
                        type: "manual",
                        message: errors.password,
                    });
                }
            },
        });
    }

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-5xl">
                    <div className={cn("flex flex-col gap-6")}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="p-8 md:p-14"
                                    >
                                        <div className="flex flex-col gap-5">
                                            <div className="flex flex-col mb-3">
                                                <h1 className="text-2xl font-bold">
                                                    Bem-Vindo(a) ao Audiênc
                                                    <span className="text-[hsl(42,87%,55%)]">IA</span>! 👋
                                                </h1>
                                                <p className="w-full text-muted-foreground">
                                                    A forma mais eficiente de gerenciar processos e audiências com seus clientes usando IA.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="usuario@exemplo.com"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Senha
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="password"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="remember"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id="remember"
                                                                checked={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                            <FormLabel
                                                                htmlFor="remember"
                                                                className="text-sm text-gray-600 dark:text-gray-300"
                                                            >
                                                                Lembrar de mim
                                                            </FormLabel>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={
                                                    form.formState.isSubmitting
                                                }
                                            >
                                                Entrar
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src={conectaLogo}
                                        alt="Image"
                                        className="grayscale-[0.4] absolute inset-0 h-full w-full object-cover dark:grayscale-0"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
