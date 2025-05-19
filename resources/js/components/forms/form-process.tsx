import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputMask from "react-input-mask"
import { NumericFormat } from "react-number-format"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

import { processFormSchema } from "@/schemas/form-process-schema"
import { Textarea } from "../ui/textarea"

export const ProcessFormDialog = ({
  data,
  id,
  isOpen,
  setIsOpen,
  onSubmit,
  clients,
}: any) => {
  const isEditing = !!id

  const form = useForm<z.infer<ReturnType<typeof processFormSchema>>>({
    resolver: zodResolver(processFormSchema(isEditing)),
    defaultValues: {
      client_id: data?.client_id ? String(data.client_id) : "",
      author_name: data?.author_name || "",
      opposing_party_name: data?.opposing_party_name || "",
      process_number: data?.process_number ? String(data?.process_number) : "",
      case_reason: data?.case_reason || "",
      case_value: data?.case_value || "",
      description: data?.description || "",
    },
  })

  const handleSubmit = (
    values: z.infer<ReturnType<typeof processFormSchema>>
  ) => {
    onSubmit(values, id)
    setIsOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (!isOpen) form.reset()
  }, [isOpen])

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        client_id: data.client_id ? String(data.client_id) : "",
        process_number: data?.process_number
          ? String(data?.process_number)
          : "",
      })
    }
  }, [data])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Processo" : "Novo Processo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações do processo."
              : "Cadastre um novo processo jurídico."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4 py-4">
          {/* Cliente */}
          <div className="grid gap-2">
            <Label htmlFor="client_id">Cliente</Label>
            <Select
              value={form.watch("client_id")}
              onValueChange={(value) => form.setValue("client_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {clients.map((client: { label: string; value: string }) => (
                    <SelectItem key={client.value} value={String(client.value)}>
                      {client.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {form.formState.errors.client_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.client_id.message}
              </p>
            )}
          </div>

          {/* Autor e Parte Contrária */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="author_name">Autor</Label>
              <Input
                {...form.register("author_name")}
                placeholder="Nome do autor"
              />
              {form.formState.errors.author_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.author_name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="opposing_party_name">Parte contrária</Label>
              <Input
                {...form.register("opposing_party_name")}
                placeholder="Nome da parte contrária"
              />
              {form.formState.errors.opposing_party_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.opposing_party_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Número do processo e Motivo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="process_number">Número do processo</Label>
              <Controller
                control={form.control}
                name="process_number"
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="9999999-99.9999.9.99.9999"
                    maskChar={null}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value || ""}>
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder="0000000-00.0000.0.00.0000"
                      />
                    )}
                  </InputMask>
                )}
              />
              {form.formState.errors.process_number && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.process_number.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="case_reason">Motivo</Label>
              <Input
                {...form.register("case_reason")}
                placeholder="Ex: Atraso de pagamento"
              />
              {form.formState.errors.case_reason && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.case_reason.message}
                </p>
              )}
            </div>
          </div>

          {/* Valor */}
          <div className="grid gap-2">
            <Label htmlFor="case_value">Valor</Label>
            <NumericFormat
              value={form.watch("case_value")}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              customInput={Input}
              placeholder="R$ 10.000,00"
              onValueChange={(values) =>
                form.setValue("case_value", values.value)
              }
            />
            {form.formState.errors.case_value && (
              <p className="text-sm text-red-500">
                {form.formState.errors.case_value.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              {...form.register("description")}
              placeholder="Detalhes do processo..."
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
