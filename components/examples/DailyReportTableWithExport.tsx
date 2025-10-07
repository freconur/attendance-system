import React, { useState } from 'react'
import { RecordReporteDiario, ValuesTHead } from '@/features/types/types'
import { useAttendanceExcelExport } from '@/features/hooks/useAttendanceExcelExport'
import { RiFileExcel2Line, RiLoader4Line, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri'

interface DailyReportTableWithExportProps {
  reporteByGradeDaily: RecordReporteDiario[]
  valuesTHead: ValuesTHead[]
  className?: string
}

/**
 * Componente que muestra la tabla de asistencias con funcionalidad de exportación a Excel
 */
const DailyReportTableWithExport: React.FC<DailyReportTableWithExportProps> = ({
  reporteByGradeDaily,
  valuesTHead,
  className = ''
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    fileName: `Reporte_Asistencias_${new Date().toISOString().split('T')[0]}`,
    includeSummary: true,
    includeDateRange: false,
    method: 'xlsx' as 'xlsx' | 'html',
    startDate: '',
    endDate: ''
  })
  const [lastExportResult, setLastExportResult] = useState<string | null>(null)

  const { exportAttendanceToExcel, isExporting, error, clearError } = useAttendanceExcelExport()

  const handleExport = async () => {
    const options = {
      fileName: exportOptions.fileName,
      includeSummary: exportOptions.includeSummary,
      includeDateRange: exportOptions.includeDateRange,
      method: exportOptions.method,
      dateRange: exportOptions.includeDateRange ? {
        startDate: exportOptions.startDate,
        endDate: exportOptions.endDate
      } : undefined
    }

    const result = await exportAttendanceToExcel(reporteByGradeDaily, valuesTHead, options)
    
    if (result.success) {
      setLastExportResult(result.message)
      setTimeout(() => setLastExportResult(null), 3000)
    }
  }

  const handleOptionChange = (key: string, value: any) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Header con botón de exportación */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Reporte de Asistencias Diarias
          </h2>
          
          <div className="flex items-center space-x-3">
            {/* Información de datos */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{reporteByGradeDaily.length}</span> estudiantes
              <span className="mx-2">•</span>
              <span className="font-medium">{valuesTHead.length}</span> días
            </div>

            {/* Botón de exportación */}
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isExporting || reporteByGradeDaily.length === 0}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isExporting || reporteByGradeDaily.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isExporting ? (
                <>
                  <RiLoader4Line className="animate-spin mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  <RiFileExcel2Line className="mr-2" />
                  Exportar Excel
                </>
              )}
            </button>
          </div>
        </div>

        {/* Opciones de exportación */}
        {showExportOptions && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Opciones de Exportación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre del archivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del archivo:
                </label>
                <input
                  type="text"
                  value={exportOptions.fileName}
                  onChange={(e) => handleOptionChange('fileName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nombre del archivo"
                />
              </div>

              {/* Método de exportación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método:
                </label>
                <select
                  value={exportOptions.method}
                  onChange={(e) => handleOptionChange('method', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="xlsx">XLSX (Recomendado)</option>
                  <option value="html">HTML (Compatible)</option>
                </select>
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="mt-4 flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportOptions.includeSummary}
                  onChange={(e) => handleOptionChange('includeSummary', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Incluir resumen estadístico</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportOptions.includeDateRange}
                  onChange={(e) => handleOptionChange('includeDateRange', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Incluir rango de fechas</span>
              </label>
            </div>

            {/* Rango de fechas */}
            {exportOptions.includeDateRange && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha inicio:
                  </label>
                  <input
                    type="date"
                    value={exportOptions.startDate}
                    onChange={(e) => handleOptionChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha fin:
                  </label>
                  <input
                    type="date"
                    value={exportOptions.endDate}
                    onChange={(e) => handleOptionChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowExportOptions(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:bg-gray-300"
              >
                {isExporting ? 'Exportando...' : 'Exportar'}
              </button>
            </div>
          </div>
        )}

        {/* Mensajes de estado */}
        {lastExportResult && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
            <RiCheckLine className="text-green-500 mr-2" />
            <span className="text-green-700 text-sm">{lastExportResult}</span>
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <RiErrorWarningLine className="text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Tabla de asistencias (simplificada para el ejemplo) */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">DNI</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estudiante</th>
                {valuesTHead.slice(0, 5).map((day, index) => (
                  <th key={index} className="border border-gray-300 px-2 py-2 text-center text-xs">
                    Día {day.id}
                  </th>
                ))}
                {valuesTHead.length > 5 && (
                  <th className="border border-gray-300 px-2 py-2 text-center text-xs">
                    ...
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {reporteByGradeDaily.slice(0, 5).map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.estudiante?.dni}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.estudiante?.lastname} {record.estudiante?.firstname}
                  </td>
                  {valuesTHead.slice(0, 5).map((dayHeader, dayIndex) => {
                    const asistencia = record.asistencia?.find(asist => asist.id === dayHeader.id)
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
                  {valuesTHead.length > 5 && (
                    <td className="border border-gray-300 px-2 py-2 text-center text-gray-400">
                      ...
                    </td>
                  )}
                </tr>
              ))}
              {reporteByGradeDaily.length > 5 && (
                <tr>
                  <td colSpan={3 + Math.min(valuesTHead.length, 6)} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                    ... y {reporteByGradeDaily.length - 5} estudiantes más
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DailyReportTableWithExport
