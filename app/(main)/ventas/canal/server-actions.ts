"use server";

import { type FormData } from "./form-schema";

interface VentasData {
  canal: string;
  "Total Ventas sIVA": number;
  "Total NC Valor sIVA": number;
}

// Simular datos de base de datos
const ventasDatabase: VentasData[] = [
  {
    canal: "MAYOREO CAPITAL",
    "Total Ventas sIVA": 3777901.59,
    "Total NC Valor sIVA": 96137.91,
  },
  {
    canal: "RUTEO CAPITAL",
    "Total Ventas sIVA": 2214433.31,
    "Total NC Valor sIVA": 1000.71,
  },
  {
    canal: "RUTEO ORIENTE",
    "Total Ventas sIVA": 52816.6,
    "Total NC Valor sIVA": 0,
  },
  {
    canal: "MAYOREO OCCIDENTE",
    "Total Ventas sIVA": 1858862.52,
    "Total NC Valor sIVA": 4022.81,
  },
  {
    canal: "RUTEO OCCIDENTE",
    "Total Ventas sIVA": 74510.82,
    "Total NC Valor sIVA": 0,
  },
  {
    canal: "CANAL MODERNO",
    "Total Ventas sIVA": 1230790.44,
    "Total NC Valor sIVA": 36360.05,
  },
  {
    canal: "INDUSTRIAL",
    "Total Ventas sIVA": 265474.53,
    "Total NC Valor sIVA": 5357.14,
  },
  {
    canal: "EXPORTACION",
    "Total Ventas sIVA": 1050464.37,
    "Total NC Valor sIVA": 0,
  },
  {
    canal: "VENTA DIRECTA",
    "Total Ventas sIVA": 26559.39,
    "Total NC Valor sIVA": 11216.52,
  },
  {
    canal: "TIENDA",
    "Total Ventas sIVA": 195220.14,
    "Total NC Valor sIVA": 0,
  },
  {
    canal: "MERCADEO",
    "Total Ventas sIVA": 10455.18,
    "Total NC Valor sIVA": 0,
  },
  {
    canal: "MAYOREO ORIENTE",
    "Total Ventas sIVA": 2134348.15,
    "Total NC Valor sIVA": 12976.42,
  },
];

export async function getSalesData({ fechaInicio, fechaFin }: FormData) {
  // Simular delay de consulta a base de datos
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // Simular consulta a base de datos con filtros de fecha
    console.log(`Consultando ventas desde ${fechaInicio} hasta ${fechaFin}`);

    // En una aplicación real, aquí harías la consulta a la base de datos
    // const result = await db.query('SELECT * FROM ventas WHERE fecha BETWEEN ? AND ?', [startDate, endDate])

    // Por ahora, retornamos los datos simulados
    return {
      success: true,
      data: ventasDatabase,
      message: `Datos consultados exitosamente para el período ${fechaInicio} - ${fechaFin}`,
    };
  } catch (error) {
    console.error("Error al consultar datos de ventas:", error);
    return {
      success: false,
      data: [],
      message: "Error al consultar los datos de ventas",
    };
  }
}
