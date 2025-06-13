'use client';

import { useState } from 'react';
import SalesForm from "./date-form";

export default function DataFetching() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (success: boolean, errorMessage?: string) => {
    if (success) {
      setFormSubmitted(true);
      setError(null);
    } else {
      setError(errorMessage || 'An error occurred while processing your request');
      setFormSubmitted(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Ventas por Categoría
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Consulta información de ventas por rango de fechas
        </p>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span className="font-medium">Error!</span> {error}
          </div>
        )}
      </div>
      {/* Form and Chart - Side by side on large screens, stacked on small screens */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <SalesForm onFormSubmit={handleFormSubmit} />
        </div>
        {formSubmitted && (
          <div className="w-full lg:flex-1 min-w-0">
            <p>Chart will be rendered here</p>
          </div>
        )}
      </div>
      {/* Segunda fila: Tabla de datos */}
      {formSubmitted && <p>Detail will be rendered here</p>}
    </div>
  );
}
