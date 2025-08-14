# Pruebas Manuales de Firebase Functions

Este directorio contiene archivos para probar manualmente la función `crearAsistenciaDiaria` sin necesidad de esperar a que se ejecute automáticamente.

## Archivos Creados

### 1. `test-manual-function.js`
Archivo principal que contiene toda la lógica de la función convertida a JavaScript para poder ejecutarla manualmente.

**Características:**
- Replica exactamente la funcionalidad de la función programada
- Incluye logging detallado con emojis para mejor visualización
- Manejo de errores robusto
- Procesamiento en paralelo de instituciones y estudiantes

### 2. `test-config.js`
Archivo de configuración para personalizar las pruebas.

**Opciones configurables:**
- Modo simulación (no crear documentos reales)
- Límites de instituciones y estudiantes a procesar
- Configuración de logging
- Configuración de Firebase

### 3. `run-test.js`
Script simple para ejecutar la prueba de manera rápida.

## Cómo Usar

### Prerrequisitos
1. Asegúrate de tener Firebase configurado en tu proyecto
2. Verifica que tienes acceso a la base de datos
3. Las dependencias deben estar instaladas (`npm install`)

### Ejecutar la Prueba

#### Opción 1: Script Simple
```bash
cd functions
node run-test.js
```

#### Opción 2: Archivo Principal
```bash
cd functions
node test-manual-function.js
```

#### Opción 3: Desde el Directorio Raíz
```bash
node functions/test-manual-function.js
```

### Configurar Variables de Entorno (Opcional)

Si necesitas configurar Firebase para un proyecto específico, puedes:

1. Crear un archivo `.env` en el directorio `functions/`
2. O configurar las variables de entorno del sistema
3. O modificar `test-config.js` con tu configuración

## Estructura de la Base de Datos Esperada

La función espera la siguiente estructura:

```
intituciones/
  {institucion-id}/
    students/
      {estudiante-id}/
        // Datos del estudiante
    attendance-student/
      {estudiante-id}/
        {año}/
          {mes}/
            {mes}/
              {fecha}.json  // Documento de asistencia
```

## Logs y Salida

La función proporciona logs detallados con:

- 🔍 Búsqueda de instituciones
- 📚 Procesamiento de estudiantes
- ✅ Documentos creados exitosamente
- ❌ Errores encontrados
- 📊 Resumen final

## Modo Simulación

Para probar sin crear documentos reales, modifica `test-config.js`:

```javascript
const testConfig = {
  modoSimulacion: true,  // Cambiar a true
  // ... otras configuraciones
};
```

## Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que Firebase Admin esté configurado correctamente
- Asegúrate de tener las credenciales necesarias

### Error: "Collection not found"
- Verifica que la colección `intituciones` exista
- Confirma que tienes permisos de lectura/escritura

### Error: "Permission denied"
- Verifica las reglas de seguridad de Firestore
- Confirma que tu cuenta tenga los permisos necesarios

## Personalización

Puedes modificar `test-manual-function.js` para:

- Cambiar la lógica de creación de documentos
- Agregar validaciones adicionales
- Modificar el formato de los datos
- Agregar más logging o métricas

## Notas Importantes

⚠️ **ADVERTENCIA**: Esta función crea documentos reales en tu base de datos. Úsala solo en entornos de desarrollo o cuando estés seguro de que quieres crear los documentos.

🔄 **RECOMENDACIÓN**: Ejecuta primero en modo simulación para verificar que todo funcione correctamente.

📝 **LOGGING**: Todos los logs se muestran en la consola. Para producción, considera usar un sistema de logging más robusto. 