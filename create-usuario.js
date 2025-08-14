const admin = require('firebase-admin');
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
admin.initializeApp({
  projectId: 'attendance-system-d1f40',
});

async function createAdminUser() {
  try {
    // 2. CREACIÓN DEL USUARIO
    


    const userRecord = await admin.auth().createUser({
        uid: '47163626',
        email: '47163626@divinomaestro.com',
        password: '123456',
        displayName: 'admin',
        emailVerified: true, // Ideal para desarrollo, evita la necesidad de verificación por email
        disabled: false,
       /*  uid: '01844584',
        email: '01844584@eva.com',
        password: '123456',
        displayName: 'admin',
        emailVerified: true, // Ideal para desarrollo, evita la necesidad de verificación por email
        disabled: false, */
      });
    console.log(`✅ Usuario creado: ${userRecord.email} (UID: ${userRecord.uid})`);

    // --- 3. ASIGNACIÓN DE CUSTOM CLAIMS ---
    // Aquí es donde defines los roles y permisos personalizados.
    // En este caso, lo estamos configurando directamente para 'admin'.
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true, // Un claim booleano que indica que es admin
      role: 'admin', // Un claim de cadena para el rol específico
    });
  } catch (error) {
    console.error('❌ Error al crear usuario o asignar claims:', error.message);
    if (error.code === 'auth/email-already-exists') {
      console.error('Este correo electrónico ya está en uso en el emulador.');
    } else if (error.code === 'auth/weak-password') {
      console.error('La contraseña es demasiado débil (debe tener al menos 6 caracteres).');
    }
  }
  process.exit(0);
}
createAdminUser(); 