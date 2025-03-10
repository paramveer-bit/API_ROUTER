"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StatusCodeData {
  statusCode: string
  count: number
}

interface StatusCodesChartProps {
  data: StatusCodeData[]
}

export default function StatusCodesChart({ data }: StatusCodesChartProps) {
  const COLORS = {
    "2xx": "hsl(var(--success))",
    "3xx": "hsl(var(--warning))",
    "4xx": "hsl(var(--destructive))",
    "5xx": "hsl(var(--destructive) / 0.8)",
  }

  return (
    <ChartContainer
      config={{
        count: {
          label: "Count",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <PieChart
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          dataKey="count"
          nameKey="statusCode"
          label={({ statusCode, percent }) => `${statusCode}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.statusCode as keyof typeof COLORS] || "#8884d8"} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

