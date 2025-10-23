/**
 * Formatea una fecha en formato YYYY-MM-DD respetando la zona horaria local
 * @param fecha Objeto Date a formatear
 * @returns Cadena en formato YYYY-MM-DD
 */
export function formatearFechaLocal(fecha: Date): string {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Obtiene el primer día del mes actual en formato YYYY-MM-DD
 * @returns Cadena con el primer día del mes actual en formato YYYY-MM-DD
 */
export function getPrimerDiaMes(): string {
  const hoy = new Date();
  const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  return formatearFechaLocal(primerDia);
}

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD respetando la zona horaria local
 * @returns Cadena con la fecha actual en formato YYYY-MM-DD
 */
export function getFechaHoy(): string {
  const hoy = new Date();
  return formatearFechaLocal(hoy);
}

/**
 * Obtiene el primer día del año en formato YYYY-MM-DD
 * @param año Año para el cual obtener el primer día (opcional, por defecto es el año actual)
 * @returns Cadena con el primer día del año en formato YYYY-MM-DD
 */
export function getPrimerDiaAño(año?: number): string {
  const añoActual = año || new Date().getFullYear();
  const primerDia = new Date(añoActual, 0, 1); // 0 = enero, 1 = primer día
  return formatearFechaLocal(primerDia);
}

/**
 * Obtiene el último día del año en formato YYYY-MM-DD
 * @param año Año para el cual obtener el último día (opcional, por defecto es el año actual)
 * @returns Cadena con el último día del año en formato YYYY-MM-DD
 */
export function getUltimoDiaAño(año?: number): string {
  const añoActual = año || new Date().getFullYear();
  const ultimoDia = new Date(añoActual, 11, 31); // 11 = diciembre, 31 = último día
  return formatearFechaLocal(ultimoDia);
}

/**
 * Calcula la diferencia en días entre dos fechas
 * @param fechaInicio Fecha de inicio en formato YYYY-MM-DD
 * @param fechaFin Fecha de fin en formato YYYY-MM-DD
 * @returns Número de días entre las dos fechas
 */
export function calcularDiasEntreFechas(
  fechaInicio: string,
  fechaFin: string
): number {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  // Ajustar las fechas para ignorar las horas
  inicio.setHours(0, 0, 0, 0);
  fin.setHours(0, 0, 0, 0);

  // Calcular la diferencia en milisegundos y convertir a días
  const diferenciaMilisegundos = fin.getTime() - inicio.getTime();
  return Math.round(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
}
