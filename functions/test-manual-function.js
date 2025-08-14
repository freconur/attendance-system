/**
 * Archivo para probar manualmente la función crearAsistenciaDiaria
 * 
 * Uso: node test-manual-function.js
 */

const admin = require('firebase-admin');

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Obtener instancia de Firestore
const db = admin.firestore();

/**
 * Obtiene la fecha actual en formato español
 */
function getCurrentDate() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  
  // Array con los nombres de los meses en español
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  return {
    year: year,        // Año en número (ej: 2025)
    month: monthNames[month], // Mes en letras (ej: "Agosto")
    date: date         // Fecha en número (ej: 12)
  };
}

/**
 * Obtiene todas las instituciones de la base de datos
 */
async function obtenerInstituciones() {
  console.log('🔍 Buscando instituciones...');
  const institucionesRef = db.collection('intituciones');
  const snapshot = await institucionesRef.get();
  
  const instituciones = [];
  snapshot.forEach(doc => {
    instituciones.push(doc.id);
  });
  
  console.log(`✅ Encontradas ${instituciones.length} instituciones:`, instituciones);
  return instituciones;
}

/**
 * Obtiene todos los estudiantes de una institución específica
 */
async function obtenerEstudiantesDeInstitucion(institucion) {
  const estudiantesRef = db.collection(`intituciones/${institucion}/students`);
  const snapshot = await estudiantesRef.get();
  
  const estudiantes = [];
  snapshot.forEach(doc => {
    estudiantes.push(doc.id);
  });
  
  return estudiantes;
}

/**
 * Crea un documento de asistencia para un estudiante específico
 */
async function crearDocumentoAsistencia(institucion, estudiante) {
  const fechaActual = getCurrentDate();
  
  // Construir la ruta de la colección de asistencia
  const rutaAsistencia = construirRutaAsistencia(institucion, estudiante, fechaActual);
  
  console.log(`🔍 Creando documento en ruta: ${rutaAsistencia}`);
  
  const asistenciaRef = db.collection(rutaAsistencia);
  
  // Crear el documento con la data de falta usando la fecha como ID
  await asistenciaRef.doc(`${fechaActual.date}`).set({
    falta: true,
    fechaCreacion: new Date(),
    institucion: institucion,
    estudiante: estudiante
  });
  
  console.log(`✅ Documento creado para estudiante ${estudiante} en institución ${institucion}`);
}

/**
 * Construye la ruta de la colección de asistencia para un estudiante
 */
function construirRutaAsistencia(institucion, estudiante, fecha) {
  return `intituciones/${institucion}/attendance-student/${estudiante}/${fecha.year}/${fecha.month}/${fecha.month}`;
}

/**
 * Procesa una institución específica: obtiene sus estudiantes y crea documentos de asistencia
 */
async function procesarInstitucion(institucion, documentosCreados, errores) {
  const estudiantesInstitucion = await obtenerEstudiantesDeInstitucion(institucion);
  
  console.log(`📚 Procesando ${estudiantesInstitucion.length} estudiantes de la institución ${institucion}`);

  // Crear documentos de asistencia para cada estudiante de esta institución
  await Promise.all(
    estudiantesInstitucion.map(async (estudiante) => {
      try {
        await crearDocumentoAsistencia(institucion, estudiante);
        documentosCreados.count++;
      } catch (error) {
        const errorMsg = `Error al crear documento de asistencia para ${estudiante} en institución ${institucion}: ${error instanceof Error ? error.message : String(error)}`;
        errores.push(errorMsg);
        console.error(`❌ ${errorMsg}`, error);
      }
    })
  );
}

/**
 * Obtiene todos los estudiantes de una lista de instituciones y crea documentos de asistencia
 */
async function obtenerEstudiantesDeInstituciones(instituciones) {
  let documentosCreados = { count: 0 };
  const errores = [];
  
  console.log(`🚀 Iniciando procesamiento de ${instituciones.length} instituciones`);
  
  // Procesar todas las instituciones en paralelo
  await Promise.all(
    instituciones.map(async (institucion) => {
      try {
        await procesarInstitucion(institucion, documentosCreados, errores);
      } catch (error) {
        const errorMsg = `Error al procesar institución ${institucion}: ${error instanceof Error ? error.message : String(error)}`;
        errores.push(errorMsg);
        console.error(`❌ ${errorMsg}`, error);
      }
    })
  );

  console.log(`📊 Resumen final: ${documentosCreados.count} documentos creados, ${errores.length} errores`);
  
  if (errores.length > 0) {
    console.log('⚠️ Errores encontrados:');
    errores.forEach(error => console.log(`  - ${error}`));
  }
  
  return { documentosCreados: documentosCreados.count, errores };
}

/**
 * Función principal para ejecutar la prueba
 */
async function ejecutarPrueba() {
  console.log('🚀 Iniciando prueba manual de la función crearAsistenciaDiaria');
  console.log('⏰ Fecha actual:', getCurrentDate());
  console.log('---');
  
  try {
    // Obtener todas las instituciones
    const instituciones = await obtenerInstituciones();
    
    if (instituciones.length === 0) {
      console.log('⚠️ No se encontraron instituciones. Verifica que la base de datos tenga datos.');
      return;
    }
    
    // Obtener todos los estudiantes de todas las instituciones y crear documentos de asistencia
    const resultado = await obtenerEstudiantesDeInstituciones(instituciones);
    
    console.log('---');
    console.log('🎉 Prueba completada exitosamente!');
    console.log(`📊 Total de documentos creados: ${resultado.documentosCreados}`);
    console.log(`❌ Total de errores: ${resultado.errores.length}`);
    
  } catch (error) {
    console.error('💥 Error fatal durante la ejecución:', error);
    process.exit(1);
  }
}

// Ejecutar la prueba si el archivo se ejecuta directamente
if (require.main === module) {
  ejecutarPrueba()
    .then(() => {
      console.log('✅ Script completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error en el script:', error);
      process.exit(1);
    });
}

module.exports = {
  ejecutarPrueba,
  obtenerInstituciones,
  obtenerEstudiantesDeInstituciones,
  procesarInstitucion,
  crearDocumentoAsistencia,
  getCurrentDate
}; 