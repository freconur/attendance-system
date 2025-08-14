/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
/* import {onRequest} from "firebase-functions/https"; */
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {onSchedule} from "firebase-functions/v2/scheduler";
/* import {onRequest} from "firebase-functions/v2/https"; */
/* import { getCurrentDate } from "../dates"; */

// Inicializar Firebase Admin
initializeApp();

// Obtener instancia de Firestore
const db = getFirestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Array con los nombres de los meses en español
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];

  return {
    year: year, // Año en número (ej: 2025)
    month: monthNames[month], // Mes en letras (ej: "Agosto")
    date: date, // Fecha en número (ej: 12)
  };
}

/* exports.miTareaDiaria = onSchedule("0 18 * * *", () => {
  logger.info("Ejecutando tarea diaria a las 6 PM!");

  // Aquí va la lógica que quieres ejecutar
  // por ejemplo, limpiar una base de datos, enviar notificaciones, etc.

  return null;
}); */
export const miFuncion = onSchedule({
  schedule: "20 20 * * *",
  timeZone: "America/Lima",
  retryCount: 3,
  maxInstances: 1,
  memory: "512MiB",
  timeoutSeconds: 540,
  region: "southamerica-east1",
}, async (event: any) => {
  logger.info("Mi función ejecutada automáticamente a las 6 PM!", {structuredData: true});

  try {
    // Obtener todas las instituciones
    const instituciones = await obtenerInstituciones();
    console.log("🏫 Instituciones encontradas:", instituciones);

    // Obtener todos los estudiantes de todas las instituciones y crear documentos de asistencia
    await obtenerEstudiantesDeInstituciones(instituciones);

    // Crear el objeto de respuesta para logging
    const responseData = {
      message: "Función ejecutada correctamente",
      timestamp: new Date().toISOString(),
      instituciones: instituciones,
      total: instituciones.length,
      documentosCreados: 0, // This will be updated by obtenerEstudiantesDeInstituciones
      errores: [], // This will be updated by obtenerEstudiantesDeInstituciones
      totalEstudiantes: 0, // This will be updated by obtenerEstudiantesDeInstituciones
    };

    console.log("📤 Función completada:", JSON.stringify(responseData, null, 2));
    console.log("📊 Resumen:", {
      instituciones: instituciones.length,
      documentosCreados: 0,
      errores: 0,
    });

    logger.info("Función programada ejecutada exitosamente", responseData);
  } catch (error: unknown) {
    /* const errorMessage = error instanceof Error ? error.message : 'Error desconocido'; */
    logger.error("Error al ejecutar función programada:", error);

    // Para funciones programadas, solo logueamos el error
    // No hay response object para enviar errores HTTP
  }
});

// Función HTTP para pruebas manuales
/* export const miFuncionTest = onRequest(async (request, response) => {
  logger.info("Función de prueba ejecutada manualmente", {structuredData: true});

  try {
    // Obtener todas las instituciones
    const instituciones = await obtenerInstituciones();
    console.log('🏫 Instituciones encontradas:', instituciones);

    // Obtener todos los estudiantes de todas las instituciones y crear documentos de asistencia
    await obtenerEstudiantesDeInstituciones(instituciones);

    // Crear el objeto de respuesta para logging
    const responseData = {
      message: "Función ejecutada correctamente",
      timestamp: new Date().toISOString(),
      instituciones: instituciones,
      total: instituciones.length,
      documentosCreados: 0, // This will be updated by obtenerEstudiantesDeInstituciones
      errores: [], // This will be updated by obtenerEstudiantesDeInstituciones
      totalEstudiantes: 0 // This will be updated by obtenerEstudiantesDeInstituciones
    };

    console.log('📤 Función completada:', JSON.stringify(responseData, null, 2));
    console.log('📊 Resumen:', {
      instituciones: instituciones.length,
      documentosCreados: 0,
      errores: 0
    });

    logger.info("Función de prueba ejecutada exitosamente", responseData);

    // Enviar respuesta HTTP
    response.status(200).json(responseData);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    logger.error("Error al ejecutar función de prueba:", error);

    // Enviar error HTTP
    response.status(500).json({
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}); */


/**
 * Obtiene todas las instituciones de la base de datos
 */
async function obtenerInstituciones(): Promise<string[]> {
  const institucionesRef = db.collection("intituciones");
  const snapshot = await institucionesRef.get();

  const instituciones: string[] = [];
  snapshot.forEach((doc) => {
    instituciones.push(doc.id);
  });

  return instituciones;
}

/**
 * Obtiene todos los estudiantes de una lista de instituciones
 */
async function obtenerEstudiantesDeInstituciones(instituciones: string[]) {
  let documentosCreados = 0;
  const errores: string[] = [];

  // Procesar todas las instituciones en paralelo
  await Promise.all(
    instituciones.map(async (institucion) => {
      try {
        const estudiantesInstitucion = await obtenerEstudiantesDeInstitucion(institucion);

        console.log(`📚 Procesando ${estudiantesInstitucion.length} estudiantes de la institución ${institucion}`);

        // Crear documentos de asistencia para cada estudiante de esta institución
        await Promise.all(estudiantesInstitucion.map(async (estudiante) => {
          // Corregir la ruta - usar estructura más lógica
          /* const rutaAsistencia = `intituciones/${institucion}/attendance-student/${estudiante}/2025/agosto/agosto/`; */
          const rutaAsistencia = `intituciones/${institucion}/attendance-student/${estudiante}/${getCurrentDate().year}/${getCurrentDate().month}/${getCurrentDate().month}`;
          console.log(`🔍 Creando documento en ruta: ${rutaAsistencia}`);

          const asistenciaRef = db.collection(rutaAsistencia);

          try {
            // Usar timestamp como ID único del documento
            const docId = Date.now().toString();

            // Crear el documento con la data de falta
            await asistenciaRef.doc("14").set({
              falta: true,
              fecha: new Date().toISOString(),
              timestamp: Date.now(),
              estado: "ausente",
              estudianteId: estudiante,
              institucion: institucion,
              fechaCreacion: new Date().toISOString(),
            });

            documentosCreados++;
            console.log(`✅ Documento de asistencia creado para estudiante ${estudiante} en institución ${institucion} con ID: ${docId}`);
          } catch (error) {
            const errorMsg = `Error al crear documento de asistencia para ${estudiante} en institución ${institucion}: ${error instanceof Error ? error.message : String(error)}`;
            errores.push(errorMsg);
            console.error(`❌ ${errorMsg}`, error);
          }
        }));
      } catch (error) {
        const errorMsg = `Error al procesar institución ${institucion}: ${error instanceof Error ? error.message : String(error)}`;
        errores.push(errorMsg);
        console.error(`❌ ${errorMsg}`, error);
      }
    })
  );

  console.log(`📊 Resumen final: ${documentosCreados} documentos creados, ${errores.length} errores`);
}

/**
 * Obtiene todos los estudiantes de una institución específica
 */
async function obtenerEstudiantesDeInstitucion(institucion: string): Promise<string[]> {
  const estudiantesRef = db.collection(`intituciones/${institucion}/students`);
  const snapshot = await estudiantesRef.get();

  const estudiantes: string[] = [];
  snapshot.forEach((doc) => {
    estudiantes.push(doc.id);
  });

  return estudiantes;
}


