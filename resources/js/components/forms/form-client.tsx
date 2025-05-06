import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import Checkbox from "@/components/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { clientFormSchema } from "@/schemas/form-client-schema"
import InputMask from "react-input-mask"
import { IClientFormDialogProps } from "@/interfaces/IClient"

export const ClientFormDialog: React.FC<IClientFormDialogProps> = ({
  data,
  id,
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const isEditing = !!id

  const form = useForm<z.infer<ReturnType<typeof clientFormSchema>>>({
    resolver: zodResolver(clientFormSchema(isEditing)),
    defaultValues: {
      name: data?.name || "",
      gender: data?.gender || "masculino",
      whatsapp: data?.whatsapp || "",
    },
  })

  const handleSubmit = (
    values: z.infer<ReturnType<typeof clientFormSchema>>
  ) => {
    onSubmit(values, id)
    setIsOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen])

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        gender: data.gender || "masculino",
        whatsapp: data.whatsapp || "",
      })
    }
  }, [data])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Cliente" : "Adicionar Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Altere os dados do cliente."
              : "Adicione um novo cliente ao sistema."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Nome */}
            <div className="grid grid-cols-1 items-start gap-3">
              <Label
                htmlFor="name"
                className={
                  form.formState.errors.name ? "text-destructive" : undefined
                }>
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Digite o nome do cliente"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Gênero */}
            <div className="grid grid-cols-1 items-start gap-3">
              <Label
                htmlFor="gender"
                className={
                  form.formState.errors.gender ? "text-destructive" : undefined
                }>
                Gênero
              </Label>
              <Select
                value={form.watch("gender")}
                onValueChange={(value: "masculino" | "feminino" | "outro") =>
                  form.setValue("gender", value)
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o gênero..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gênero</SelectLabel>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {form.formState.errors.gender && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="grid grid-cols-1 items-start gap-3">
              <Label
                htmlFor="whatsapp"
                className={
                  form.formState.errors.whatsapp
                    ? "text-destructive"
                    : undefined
                }>
                WhatsApp
              </Label>
              <InputMask
                mask="(99) 99999-9999"
                value={form.watch("whatsapp")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  form.setValue("whatsapp", e.target.value)
                }>
                {(
                  inputProps: React.InputHTMLAttributes<HTMLInputElement>
                ): React.ReactElement => (
                  <Input
                    id="whatsapp"
                    placeholder="(99) 99999-9999"
                    {...inputProps}
                  />
                )}
              </InputMask>
              {form.formState.errors.whatsapp && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.whatsapp.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
