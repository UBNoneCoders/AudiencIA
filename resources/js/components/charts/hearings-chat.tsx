"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type HearingData = {
  label: string
  count: number
}

type ChartBarProps = {
  data: HearingData[]
  title?: string
  description?: string
}

const DAYS_OF_WEEK = ["Seg", "Ter", "Qua", "Qui", "Sex"]

const chartConfig = {
  desktop: {
    label: "Audiências",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ChartBarDefault({
  data,
  title = "Audiências por dia da semana",
  description = "Esta semana",
}: ChartBarProps) {
  const chartData = DAYS_OF_WEEK.map((day) => {
    const found = data?.find(
      (item) => item.label.toLocaleLowerCase() === day.toLocaleLowerCase()
    )
    return {
      day,
      count: found ? found.count : 0,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
