import React from 'react'

/**
 * Componente que muestra un ejemplo de cómo se verá el archivo Excel generado
 */
const ExcelOutputExample: React.FC = () => {
  // Datos de ejemplo
  const sampleHeaders = [
    { id: '15', dia: 'Lunes' },
    { id: '16', dia: 'Martes' },
    { id: '17', dia: 'Miércoles' },
    { id: '18', dia: 'Jueves' },
    { id: '19', dia: 'Viernes' }
  ]

  const sampleData = [
    {
      estudiante: { dni: '12345678', lastname: 'García', firstname: 'Juan' },
      asistencia: [
        { id: '15', arrivalTime: true },
        { id: '16', falta: true },
        { id: '17', arrivalTime: false },
        { id: '18', arrivalTime: true },
        { id: '19', falta: true }
      ]
    },
    {
      estudiante: { dni: '87654321', lastname: 'López', firstname: 'María' },
      asistencia: [
        { id: '15', arrivalTime: true },
        { id: '16', arrivalTime: true },
        { id: '17', arrivalTime: true },
        { id: '18', arrivalTime: true },
        { id: '19', arrivalTime: true }
      ]
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📊 Ejemplo de Archivo Excel Generado
      </h2>

      {/* Tabla principal */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Hoja 1: Asistencias
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">#</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">DNI</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Apellidos y Nombres</th>
                {sampleHeaders.map((header, index) => (
                  <th key={index} className="border border-gray-300 px-2 py-2 text-center text-xs font-medium text-gray-700">
                    {header.dia} ({header.id})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">{record.estudiante.dni}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{record.estudiante.lastname} {record.estudiante.firstname}</td>
                  {sampleHeaders.map((dayHeader, dayIndex) => {
                    const asistencia = record.asistencia.find(asist => asist.id === dayHeader.id)
                    return (
                      <td key={dayIndex} className="border border-gray-300 px-2 py-2 text-center">
                        <span className={`inline-block w-6 h-6 rounded text-xs font-bold ${
                          asistencia?.falta 
                            ? 'bg-red-100 text-red-800' 
                            : asistencia?.arrivalTime 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {asistencia?.falta ? 'F' : asistencia?.arrivalTime ? 'P' : 'T'}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hoja de resumen */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Hoja 2: Resumen Estadístico
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Estudiante</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">DNI</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Presentes</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Faltas</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Tardanzas</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">% Asistencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">García Juan</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">12345678</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">2</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">2</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">1</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">40%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">López María</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">87654321</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">5</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">0</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">0</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="text-sm font-medium text-green-800 mb-2">✅ Mejoras Implementadas:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Encabezados con nombre del día + fecha</li>
            <li>• Formato: "Lunes (15)", "Martes (16)"</li>
            <li>• Más fácil de identificar en Excel</li>
            <li>• Mejor experiencia de usuario</li>
          </ul>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Características:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Dos hojas: Asistencias + Resumen</li>
            <li>• Colores diferenciados por estado</li>
            <li>• Estadísticas automáticas</li>
            <li>• Formato Excel nativo (.xlsx)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ExcelOutputExample
