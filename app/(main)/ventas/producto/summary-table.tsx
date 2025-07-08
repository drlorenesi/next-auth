"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryTableProps {
  data: Array<{
    canal: string;
    ventas_siva: number;
    nc_descuento_siva: number;
    nc_devolucion_siva: number;
  }>;
}

export function SummaryTable({ data }: SummaryTableProps) {
  // Sort data by sales amount for consistent ordering
  const sortedData = data.sort((a, b) => b.ventas_siva - a.ventas_siva);

  // Calculate total sales for percentage display
  const totalSales = sortedData.reduce(
    (sum, item) => sum + item.ventas_siva,
    0
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    const percentage = (value / totalSales) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen por Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Canal</th>
                <th className="text-right p-2 font-medium">Ventas sin IVA</th>
                <th className="text-right p-2 font-medium">Porcentaje</th>
                <th className="text-right p-2 font-medium">Descuentos</th>
                <th className="text-right p-2 font-medium">Devoluciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item.canal} className="border-b hover:bg-muted/50">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: `var(--chart-${index + 1})`,
                        }}
                      />
                      {item.canal}
                    </div>
                  </td>
                  <td className="text-right p-2 font-mono">
                    {formatCurrency(item.ventas_siva)}
                  </td>
                  <td className="text-right p-2">
                    {formatPercentage(item.ventas_siva)}
                  </td>
                  <td className="text-right p-2 font-mono">
                    {formatCurrency(item.nc_descuento_siva)}
                  </td>
                  <td className="text-right p-2 font-mono">
                    {formatCurrency(item.nc_devolucion_siva)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
