import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { hearingFormSchema } from "@/schemas/form-hearing-schema"

export const HearingFormDialog = ({
  data,
  id,
  isOpen,
  setIsOpen,
  onSubmit,
  processes,
}: any) => {
  const isEditing = !!id

  const form = useForm<z.infer<ReturnType<typeof hearingFormSchema>>>({
    resolver: zodResolver(hearingFormSchema(isEditing)),
    defaultValues: {
      process_id: data?.process_id ? String(data.process_id) : "",
      type: data?.type || "",
      date: data?.date || "",
      link: data?.link || "",
      status: data?.status || "",
      description: data?.description || "",
    },
  })

  const handleSubmit = (
    values: z.infer<ReturnType<typeof hearingFormSchema>>
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
        process_id: data.process_id ? String(data.process_id) : "",
      })
    }
  }, [data])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Audiência" : "Nova Audiência"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações da audiência."
              : "Cadastre uma nova audiência para um processo jurídico."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4 py-4">
          {/* Processo */}
          <div className="grid gap-2">
            <Label htmlFor="process_id">Processo</Label>
            <Select
              value={form.watch("process_id")}
              onValueChange={(value) => form.setValue("process_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o processo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {processes.map(
                    (process: { label: string; value: string }) => (
                      <SelectItem
                        key={process.value}
                        value={String(process.value)}>
                        {process.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {form.formState.errors.process_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.process_id.message}
              </p>
            )}
          </div>

          {/* Tipo e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Input
                {...form.register("type")}
                placeholder="Ex: Audiência inicial"
              />
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data e Hora</Label>
              <Input type="datetime-local" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>
          </div>

          {/* Link */}
          <div className="grid gap-2">
            <Label htmlFor="link">Link (opcional)</Label>
            <Input {...form.register("link")} placeholder="https://..." />
            {form.formState.errors.link && (
              <p className="text-sm text-red-500">
                {form.formState.errors.link.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue(
                  "status",
                  value as "Aberta" | "Concluída" | "Cancelada" | "Adiada"
                )
              }>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["Aberta", "Concluída", "Cancelada", "Adiada"].map(
                    (status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <p className="text-sm text-red-500">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              {...form.register("description")}
              placeholder="Detalhes da audiência..."
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
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
