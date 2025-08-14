// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqINOCOEvPs-vKVTYFtd2WWo1TNcgNBlg",
  authDomain: "attendance-system-d1f40.firebaseapp.com",
  projectId: "attendance-system-d1f40",
  storageBucket: "attendance-system-d1f40.appspot.com",
  messagingSenderId: "72631560139",
  appId: "1:72631560139:web:d739470e7b6423e1dd784e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Instancia de Firestore
const functions = getFunctions(app); // Instancia de Cloud Functions
const auth = getAuth(app)
// CONFIGURAR TIMEOUT PERSONALIZADO PARA CLOUD FUNCTIONS
// Esto debe coincidir con el timeout de la Cloud Function (540 segundos)
// Agregamos 30 segundos extra como margen de seguridad
const FUNCTIONS_TIMEOUT = 570000; // 570 segundos = 9.5 minutos

// Variable para controlar que los emuladores solo se conecten una vez
let emulatorsConnected = false;

// --- CONFIGURACIÓN PARA CONECTAR A LOS EMULADORES (¡SOLO EN DESARROLLO!) ---
// Es CRÍTICO que esta parte del código solo se ejecute cuando estés desarrollando localmente.
// Una forma común es verificar el entorno (process.env.NODE_ENV) o el hostname.

// Verificar si estamos en el navegador y en desarrollo
const isClient = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = isClient && window.location.hostname === 'localhost';

/* if ((isDevelopment || isLocalhost) && !emulatorsConnected && isClient) {
  console.log('--- CONECTANDO LA APLICACIÓN A LOS EMULADORES DE FIREBASE ---');

  try {
    // Conecta Firestore al emulador
    // El puerto por defecto para Firestore es 8080 (no está en tu salida, pero es el estándar)
    connectFirestoreEmulator(db, 'localhost', 8080);

    // Conecta Cloud Functions al emulador
    // Tu salida indica 'Functions | 127.0.0.1:5001', así que usamos 5001
    connectFunctionsEmulator(functions, 'localhost', 5001);

    // Conecta Authentication al emulador (si lo usas)
    // El puerto por defecto para Auth es 9099 (no está en tu salida, pero es el estándar)
    connectAuthEmulator(auth, 'http://localhost:9099');

    emulatorsConnected = true;
    console.log('Emuladores conectados exitosamente');
    
    // Puedes ver la UI del emulador en http://127.0.0.1:4000/
  } catch (error) {
    console.warn('Los emuladores ya están conectados o hay un error:', error);
  }
} */
// -------------------------------------------------------------------------

// Exporta las instancias de Firebase para usarlas en tu aplicación






export { db, functions, auth, FUNCTIONS_TIMEOUT };