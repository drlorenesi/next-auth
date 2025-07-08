"use client";

import { PieChart, Pie } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PieChartComponentProps {
  data: Array<{
    canal: string;
    ventas_siva: number;
    nc_descuento_siva: number;
    nc_devolucion_siva: number;
  }>;
}

export function SalesPieChart({ data }: PieChartComponentProps) {
  // Transform the data for the pie chart with better color assignment
  const chartData = data
    .sort((a, b) => b.ventas_siva - a.ventas_siva) // Sort by sales amount
    .map((item, index) => ({
      canal: item.canal,
      ventas: item.ventas_siva,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));

  // Calculate total sales for percentage display
  const totalSales = chartData.reduce((sum, item) => sum + item.ventas, 0);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartConfig = {
    ventas: {
      label: "Ventas",
    },
    "MAYOREO CAPITAL": {
      label: "Mayoreo Capital",
      color: "hsl(var(--chart-1))",
    },
    "RUTEO CAPITAL": {
      label: "Ruteo Capital",
      color: "hsl(var(--chart-2))",
    },
    "MAYOREO ORIENTE": {
      label: "Mayoreo Oriente",
      color: "hsl(var(--chart-3))",
    },
    "MAYOREO OCCIDENTE": {
      label: "Mayoreo Occidente",
      color: "hsl(var(--chart-4))",
    },
    "CANAL MODERNO": {
      label: "Canal Moderno",
      color: "hsl(var(--chart-5))",
    },
    EXPORTACION: {
      label: "Exportación",
      color: "hsl(var(--chart-6))",
    },
    INDUSTRIAL: {
      label: "Industrial",
      color: "hsl(var(--chart-7))",
    },
    TIENDA: {
      label: "Tienda",
      color: "hsl(var(--chart-8))",
    },
    "RUTEO OCCIDENTE": {
      label: "Ruteo Occidente",
      color: "hsl(var(--chart-9))",
    },
    "RUTEO ORIENTE": {
      label: "Ruteo Oriente",
      color: "hsl(var(--chart-10))",
    },
    "VENTA DIRECTA": {
      label: "Venta Directa",
      color: "hsl(var(--chart-11))",
    },
    MERCADEO: {
      label: "Mercadeo",
      color: "hsl(var(--chart-12))",
    },
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Distribución de Ventas por Canal
        </CardTitle>
        <CardDescription>
          Ventas sin IVA - Total: {formatCurrency(totalSales)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[500px] w-full"
        >
          <div className="flex items-center justify-center">
            <PieChart width={600} height={400}>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const percentage = (
                      (data.ventas / totalSales) *
                      100
                    ).toFixed(1);
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {data.canal}
                            </span>
                            <span className="font-bold text-foreground">
                              {formatCurrency(data.ventas)}
                            </span>
                            <span className="text-[0.70rem] text-muted-foreground">
                              {percentage}% del total
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={chartData}
                dataKey="ventas"
                nameKey="canal"
                cx="50%"
                cy="50%"
                outerRadius={120}
                strokeWidth={2}
                stroke="hsl(var(--background))"
                style={{ cursor: "pointer" }}
              />
            </PieChart>
            <div className="ml-8 flex flex-col gap-2 max-w-xs">
              {chartData.map((item, index) => (
                <div
                  key={item.canal}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: `hsl(var(--chart-${index + 1}))`,
                    }}
                  />
                  <span className="truncate">{item.canal}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
