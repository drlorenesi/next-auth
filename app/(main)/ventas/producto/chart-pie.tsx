"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { SalesData } from "./page";

type ChartProps = {
  data: SalesData;
};

export function Chart({ data }: ChartProps) {
  // Transform the sales data for the chart
  const chartData = data.map((item, index) => ({
    canal: item.Canal,
    ventas: item["Ventas sIVA"],
    fill: `var(--chart-${index + 1})`,
  }));

  // Generate chart config dynamically based on the number of channels
  const chartConfig = chartData.reduce(
    (config, item, index) => {
      const key = item.canal.toLowerCase().replace(/\s+/g, "_");
      config[key] = {
        label: item.canal,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    },
    {
      ventas: {
        label: "Ventas sIVA",
      },
    } as ChartConfig
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Ventas por Canal</CardTitle>
        <CardDescription>
          Distribución de Ventas s/IVA por Canal
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          // className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          className="mx-auto aspect-square max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] [&_.recharts-pie-label-text]:fill-foreground dark:[&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="ventas" label nameKey="canal" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
