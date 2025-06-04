import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

const HearingIndex = ({
  process,
  hearings,
}: {
  process: any
  hearings: any[]
}) => {
  return (
    <AuthenticatedLayout header="Processo">
      <Head title="Processo" />

      {/* Card detalhes do processo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalhes do Processo</CardTitle>
          <CardDescription>
            Informações completas do processo jurídico.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InfoLabel
            label="Número do Processo"
            value={process.process_number}
          />
          <InfoLabel label="Nome do Autor" value={process.author_name} />
          <InfoLabel
            label="Nome da Parte Contrária"
            value={process.opposing_party_name}
          />
          <InfoLabel label="Motivo da Ação" value={process.case_reason} />
          <InfoLabel
            label="Valor da Causa"
            value={`R$ ${parseFloat(process.case_value).toFixed(2)}`}
          />
          <InfoLabel label="Descrição" value={process.description} />
        </CardContent>
      </Card>

      {/* Card com a tabela das audiências */}
      <Card>
        <CardHeader>
          <CardTitle>Audiências</CardTitle>
          <CardDescription>
            Lista das audiências vinculadas a este processo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {hearings.length > 0 ? (
            <Table>
              <TableCaption>Lista de audiências do processo</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hearings.map((hearing) => (
                  <TableRow key={hearing.id}>
                    <TableCell>{hearing.type}</TableCell>
                    <TableCell>{hearing.status}</TableCell>
                    <TableCell>
                      {hearing.link ? (
                        <a
                          href={hearing.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline">
                          Acessar Audiência
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right italic">
                    Total de audiências: {hearings.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <p className="text-muted-foreground">
              Nenhuma audiência encontrada.
            </p>
          )}
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  )
}

export default HearingIndex
