/**
 * Función que retorna la fecha actual con formato personalizado
 * @returns Objeto con año (número), mes (texto) y fecha (número)
 */
export function getCurrentDate() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  
  // Array con los nombres de los meses en español
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  return {
    year: year,        // Año en número (ej: 2025)
    month: monthNames[month], // Mes en letras (ej: "Agosto")
    date: date         // Fecha en número (ej: 12)
  };
}

/**
 * Función que retorna la fecha actual en formato de string
 * @returns String con formato "12 de Agosto de 2025"
 */
export function getCurrentDateFormatted() {
  const { year, month, date } = getCurrentDate();
  return `${date} de ${month} de ${year}`;
}

/**
 * Función que retorna solo el año actual
 * @returns Año actual en número
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Función que retorna solo el mes actual en letras
 * @returns Mes actual en letras
 */
export function getCurrentMonth() {
  const month = new Date().getMonth();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return monthNames[month];
}
