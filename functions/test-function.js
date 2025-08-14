
const fetch = require('node-fetch');

async function testFunction() {
  try {
    console.log('🔄 Probando función...');
    console.log('⏰ Iniciando prueba:', new Date().toISOString());
    
    const response = await fetch('http://127.0.0.1:5001/attendance-system-d1f40/us-central1/miFuncionTest');
    
    console.log('📡 Status de respuesta:', response.status);
    console.log('📋 Headers de respuesta:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('⏰ Timestamp:', data.timestamp);
    console.log('📊 Datos recibidos:', data);
    
    if (data.errores && data.errores.length > 0) {
      console.log('\n⚠️ Errores encontrados:');
      data.errores.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    console.log('\n🎯 Resumen de la operación:');
    console.log(`   - Instituciones procesadas: ${data.total}`);
    console.log(`   - Documentos de asistencia creados: ${data.documentosCreados}`);
    console.log(`   - Errores: ${data.errores?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
  }
}

testFunction();