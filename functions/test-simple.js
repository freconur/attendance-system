const fetch = require('node-fetch');

async function testSimpleFunction() {
  try {
    console.log('🔄 Probando función simple...');
    
    const response = await fetch('http://127.0.0.1:5001/attendance-system-d1f40/us-central1/testSimple');
    
    console.log('📡 Status de respuesta:', response.status);
    console.log('📋 Headers de respuesta:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    
    console.log('✅ Respuesta exitosa:');
    console.log('✅ data completo:', JSON.stringify(data, null, 2));
    console.log('🔑 Propiedades disponibles:', Object.keys(data));
    console.log('📊 Datos de instituciones:', data.instituciones);
    console.log('🔢 Total:', data.total);
    console.log('⏰ Timestamp:', data.timestamp);
    console.log('📝 CCC:', data.ccc);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
  }
}

testSimpleFunction(); 