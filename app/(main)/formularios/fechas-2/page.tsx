import SalesForm from "./sales-form";
import SalesDetail from "./sales-detail";
import SalesChart from "./sales-chart";

export default async function DataFetching() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Fechas
      </h2>
      {/* Primera fila: Formulario y Gráfica */}
      <div className="flex gap-4">
        <SalesForm />
        <div className="flex-1">
          <SalesChart />
        </div>
      </div>
      {/* Segunda fila: Tabla de datos */}
      <SalesDetail />
    </div>
  );
}
