import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AuthenticatedLayout from "@/layouts/authenticated-layout"
import { Head } from "@inertiajs/react"

const InfoLabel = ({
  label,
  value,
}: {
  label: string
  value: string | number | boolean | null | undefined
}) => (
  <div>
    <p className="text-sm font-semibold">{label}</p>
    {value !== null && value !== undefined ? (
      <p className="text-muted-foreground text-sm">{String(value)}</p>
    ) : (
      <span className="text-yellow-500 text-sm">Não Informado</span>
    )}
  </div>
)

const HearingIndex = ({ hearing }: { hearing: any }) => {
  console.log(hearing)

  return (
    <AuthenticatedLayout header="Audiência">
      <Head title="Audiência" />
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Audiência</CardTitle>
          <CardDescription>
            Informações completas da audiência vinculada ao processo
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InfoLabel label="Tipo" value={hearing.type} />
          <InfoLabel
            label="Data e Hora"
            value={new Date(hearing.date).toLocaleString()}
          />
          <InfoLabel label="Link" value={hearing.link} />
          <InfoLabel label="Status" value={hearing.status} />
          <InfoLabel label="Descrição" value={hearing.description} />
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  )
}

export default HearingIndex
