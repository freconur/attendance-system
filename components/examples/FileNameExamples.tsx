import React from 'react'
import { convertGrade } from '@/utils/validateGrade'
import { numberToNameMonth } from '@/dates/date'

/**
 * Componente que muestra ejemplos de nombres de archivo generados dinámicamente
 */
const FileNameExamples: React.FC = () => {
  const generateFileName = (grade?: string, selectedMonth?: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Usar el mes seleccionado por el usuario, o el mes actual si no hay selección
    const month = selectedMonth !== undefined ? numberToNameMonth(selectedMonth) : numberToNameMonth(currentDate.getMonth());
    const gradeName = grade ? `_${convertGrade(grade)}` : '';
    
    return `reporte_asistencia${gradeName}_${year}_${month}`;
  };

  const examples = [
    { grade: '1', description: 'Primer grado' },
    { grade: '2', description: 'Segundo grado' },
    { grade: '3', description: 'Tercer grado' },
    { grade: '4', description: 'Cuarto grado' },
    { grade: '5', description: 'Quinto grado' },
    { grade: '6', description: 'Sexto grado' },
    { grade: '7', description: 'Primero secundaria' },
    { grade: '8', description: 'Segundo secundaria' },
    { grade: '9', description: 'Tercero secundaria' },
    { grade: '10', description: 'Cuarto secundaria' },
    { grade: '11', description: 'Quinto secundaria' },
    { grade: undefined, description: 'Sin grado específico' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📁 Ejemplos de Nombres de Archivo Generados
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Formato: reporte_asistencia_[grado]_[año]_[mes_nombre]
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Ejemplo actual:</strong> {generateFileName('5')}.xlsx
          </p>
          <p className="text-xs text-gray-500">
            Generado automáticamente basado en el grado seleccionado y el mes seleccionado
          </p>
        </div>
        
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">📅 Ejemplos por Mes:</h4>
          <div className="space-y-1 text-sm text-blue-700">
            <div><strong>Enero:</strong> {generateFileName('5', 0)}.xlsx</div>
            <div><strong>Febrero:</strong> {generateFileName('5', 1)}.xlsx</div>
            <div><strong>Marzo:</strong> {generateFileName('5', 2)}.xlsx</div>
            <div><strong>Diciembre:</strong> {generateFileName('5', 11)}.xlsx</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((example, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">
              {example.description}
            </h4>
            <div className="bg-blue-50 p-3 rounded-md">
              <code className="text-sm text-blue-800">
                {generateFileName(example.grade)}.xlsx
              </code>
            </div>
            {example.grade && (
              <p className="text-xs text-gray-500 mt-2">
                Grado: {example.grade} → {convertGrade(example.grade)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <h4 className="text-sm font-medium text-green-800 mb-2">✅ Características del Sistema:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Dinámico:</strong> Se actualiza según el mes seleccionado por el usuario</li>
          <li>• <strong>Contextual:</strong> Incluye el grado seleccionado en el nombre</li>
          <li>• <strong>Consistente:</strong> Formato uniforme para todos los archivos</li>
          <li>• <strong>Descriptivo:</strong> Fácil de identificar el contenido del archivo</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Información Incluida:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>reporte_asistencia:</strong> Identifica el tipo de documento</li>
          <li>• <strong>[grado]:</strong> Grado específico (ej: _5to, _1ro)</li>
          <li>• <strong>[año]:</strong> Año actual (ej: 2025)</li>
          <li>• <strong>[mes_nombre]:</strong> Mes actual en español (ej: enero, febrero)</li>
        </ul>
      </div>
    </div>
  )
}

export default FileNameExamples
