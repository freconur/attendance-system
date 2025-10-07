import React from 'react'
import { numberToNameMonth } from '@/dates/date'

/**
 * Componente que muestra ejemplos de cómo se ven los nombres de mes
 */
const MonthExamples: React.FC = () => {
  const months = [
    { number: 0, name: 'enero' },
    { number: 1, name: 'febrero' },
    { number: 2, name: 'marzo' },
    { number: 3, name: 'abril' },
    { number: 4, name: 'mayo' },
    { number: 5, name: 'junio' },
    { number: 6, name: 'julio' },
    { number: 7, name: 'agosto' },
    { number: 8, name: 'setiembre' },
    { number: 9, name: 'octubre' },
    { number: 10, name: 'noviembre' },
    { number: 11, name: 'diciembre' }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📅 Ejemplos de Nombres de Mes
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Función numberToNameMonth()
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Ejemplo actual:</strong> {numberToNameMonth(new Date().getMonth())}
          </p>
          <p className="text-xs text-gray-500">
            Convierte el número del mes (0-11) al nombre en español
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((month) => (
          <div key={month.number} className="p-4 border border-gray-200 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {month.number}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {numberToNameMonth(month.number)}
              </div>
              <div className="text-xs text-gray-500">
                Mes {month.number + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <h4 className="text-sm font-medium text-green-800 mb-2">✅ Beneficios:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Nombres en español:</strong> Más fácil de entender</li>
          <li>• <strong>Descriptivo:</strong> "enero" en lugar de "01"</li>
          <li>• <strong>Consistente:</strong> Usa la misma función del sistema</li>
          <li>• <strong>Profesional:</strong> Nombres de archivo más legibles</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Ejemplos de Nombres de Archivo:</h4>
        <div className="space-y-2">
          <div className="text-sm text-blue-700">
            <strong>Enero:</strong> reporte_asistencia_5to_2025_enero.xlsx
          </div>
          <div className="text-sm text-blue-700">
            <strong>Febrero:</strong> reporte_asistencia_3ro_2025_febrero.xlsx
          </div>
          <div className="text-sm text-blue-700">
            <strong>Diciembre:</strong> reporte_asistencia_1ro sec._2025_diciembre.xlsx
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthExamples
