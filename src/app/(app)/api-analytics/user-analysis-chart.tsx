"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface UserAnalysisData {
  category: string
  newUsers: number
  returningUsers: number
}

interface UserAnalysisChartProps {
  data: UserAnalysisData[]
}

export default function UserAnalysisChart({ data }: UserAnalysisChartProps) {
  return (
    <ChartContainer
      config={{
        newUsers: {
          label: "New Users",
          color: "hsl(var(--chart-1))",
        },
        returningUsers: {
          label: "Returning Users",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="newUsers" fill="var(--color-newUsers)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="returningUsers" fill="var(--color-returningUsers)" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}

