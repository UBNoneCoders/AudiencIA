import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import React from "react"

interface StatisticCardProps {
  title: string
  value: number
  icon: LucideIcon
}
export default function StatisticCard({
  title,
  value,
  icon,
}: StatisticCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon &&
          React.createElement(icon, {
            className: "w-4 h-4 text-gray-500 dark:text-gray-400",
          })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
