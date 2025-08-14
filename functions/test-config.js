/**
 * Configuración para las pruebas manuales de Firebase Functions
 */

// Configuración de Firebase (ajusta según tu proyecto)
const firebaseConfig = {
  // Si tienes un archivo de configuración local, puedes importarlo aquí
  // projectId: 'tu-proyecto-id',
  // databaseURL: 'https://tu-proyecto.firebaseio.com',
};

// Configuración para las pruebas
const testConfig = {
  // Habilitar logs detallados
  verbose: true,
  
  // Limitar el número de instituciones a procesar (0 = todas)
  maxInstituciones: 0,
  
  // Limitar el número de estudiantes por institución (0 = todos)
  maxEstudiantesPorInstitucion: 0,
  
  // Simular solo (no crear documentos reales)
  modoSimulacion: false,
  
  // Fecha específica para las pruebas (null = fecha actual)
  fechaPrueba: null,
  
  // Colecciones a usar
  colecciones: {
    instituciones: 'intituciones',
    estudiantes: 'students',
    asistencia: 'attendance-student'
  }
};

// Configuración de logging
const loggingConfig = {
  nivel: 'info', // 'debug', 'info', 'warn', 'error'
  mostrarEmojis: true,
  mostrarTimestamps: true
};

module.exports = {
  firebaseConfig,
  testConfig,
  loggingConfig
}; 