#!/usr/bin/env node

/**
 * Script simple para ejecutar la prueba de la función crearAsistenciaDiaria
 * 
 * Uso: node run-test.js
 */

const { ejecutarPrueba } = require('./test-manual-function');

console.log('🚀 Ejecutando prueba manual de la función...');
console.log('📅 Fecha:', new Date().toLocaleString('es-ES'));
console.log('---');

ejecutarPrueba()
  .then(() => {
    console.log('✅ Prueba completada exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error en la prueba:', error);
    process.exit(1);
  }); 