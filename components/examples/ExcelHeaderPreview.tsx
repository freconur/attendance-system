import React from 'react'
import { ValuesTHead } from '@/features/types/types'

interface ExcelHeaderPreviewProps {
  headers: ValuesTHead[]
  className?: string
}

/**
 * Componente para mostrar cómo se verán los encabezados en Excel
 */
const ExcelHeaderPreview: React.FC<ExcelHeaderPreviewProps> = ({
  headers,
  className = ''
}) => {
  const excelHeaders = [
    '#',
    'DNI',
    'Apellidos y Nombres',
    ...headers.map(header => `${header.dia} (${header.id})`)
  ]

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        📊 Vista Previa de Encabezados Excel
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-50">
              {excelHeaders.map((header, index) => (
                <th 
                  key={index} 
                  className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-sm text-gray-500">1</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-gray-500">12345678</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-gray-500">García Juan</td>
              {headers.map((header, index) => (
                <td key={index} className="border border-gray-300 px-3 py-2 text-center text-sm">
                  <span className="inline-block w-6 h-6 rounded bg-green-100 text-green-800 text-xs font-bold">
                    P
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">📝 Formato de Encabezados:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Nombre del día</strong> + <strong>(Fecha)</strong></li>
          <li>• Ejemplo: "Lunes (15)", "Martes (16)", etc.</li>
          <li>• Más descriptivo y fácil de entender</li>
        </ul>
      </div>

      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
        <h4 className="text-sm font-medium text-green-800 mb-2">✅ Beneficios:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Identificación rápida del día de la semana</li>
          <li>• Fecha numérica para referencia exacta</li>
          <li>• Mejor experiencia de usuario en Excel</li>
        </ul>
      </div>
    </div>
  )
}

export default ExcelHeaderPreview
