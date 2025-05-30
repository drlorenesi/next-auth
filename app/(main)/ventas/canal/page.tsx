import SalesForm from "./sales-form";
import SalesDetail from "./sales-detail";
import SalesChart from "./sales-chart";

export default async function DataFetching() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Ventas por Canal
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Consulta información de ventas por rango de fechas
        </p>
      </div>
      {/* Form and Chart - Side by side on large screens, stacked on small screens */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <SalesForm />
        </div>
        <div className="w-full lg:flex-1 min-w-0">
          <SalesChart />
        </div>
      </div>
      {/* Segunda fila: Tabla de datos */}
      <SalesDetail />
    </div>
  );
}
