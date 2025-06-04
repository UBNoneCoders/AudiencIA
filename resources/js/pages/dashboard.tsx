import { ChartBarDefault } from "@/components/charts/hearings-chat"
import StatisticCard from "@/components/statistic-card"
import AuthenticatedLayout from "@/layouts/authenticated-layout"
import { Head } from "@inertiajs/react"
import { Handshake, Scale, Webcam } from "lucide-react"

export default function Dashboard({
  clients,
  hearings,
  processes,
  hearings_this_week,
  hearings_next_week,
}: any) {
  console.log(clients, hearings, processes)
  return (
    <AuthenticatedLayout header="Dashboard">
      <Head title="Dashboard" />

      <div className="flex flex-1 flex-col gap-4 h-full">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <StatisticCard
            title="Clientes Cadastrados"
            value={clients}
            icon={Handshake}
          />

          <StatisticCard
            title="Processos Cadastrados"
            value={processes}
            icon={Scale}
          />

          <StatisticCard
            title="Audiências Cadastradas"
            value={hearings}
            icon={Webcam}
          />
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex-1">
            <ChartBarDefault data={hearings_this_week} />
          </div>
          <div className="flex-1">
            <ChartBarDefault
              data={hearings_next_week}
              description="Próxima semana"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
