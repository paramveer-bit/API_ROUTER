"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ResponseTimeData {
  endpoint: string
  responseTime: number
}

interface ResponseTimeChartProps {
  data: ResponseTimeData[]
}

export default function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  return (
    <ChartContainer
      config={{
        responseTime: {
          label: "Response Time (ms)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 20,
          left: 100,
          bottom: 20,
        }}
      >
        <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
        <XAxis type="number" tickLine={false} axisLine={false} />
        <YAxis dataKey="endpoint" type="category" tickLine={false} axisLine={false} width={80} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="responseTime" fill="var(--color-responseTime)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}

