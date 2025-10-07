import React, { useState } from 'react'
import { useExcelExport } from '@/features/hooks/useExcelExport'
import { useExcelExportXLSX } from '@/features/hooks/useExcelExportXLSX'
import { RecordReporteDiario, ValuesTHead } from '@/features/types/types'
import { RiFileExcel2Line, RiLoader4Line, RiErrorWarningLine } from 'react-icons/ri'

interface ExcelExportExampleProps {
  data: RecordReporteDiario[]
  headers: ValuesTHead[]
  className?: string
}

/**
 * Componente de ejemplo que muestra cómo usar el hook useExcelExport
 */
const ExcelExportExample: React.FC<ExcelExportExampleProps> = ({
  data,
  headers,
  className = ''
}) => {
  const [exportMethod, setExportMethod] = useState<'html' | 'xlsx'>('xlsx')
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState({
    fileName: `Reporte_Asistencias_${new Date().toISOString().split('T')[0]}`,
    includeSummary: true,
    includeDateRange: false,
    startDate: '',
    endDate: ''
  })

  // Hooks para exportación
  const htmlExport = useExcelExport()
  const xlsxExport = useExcelExportXLSX()

  const currentExport = exportMethod === 'html' ? htmlExport : xlsxExport

  const handleExport = async () => {
    const exportOptions = {
      fileName: options.fileName,
      includeSummary: options.includeSummary,
      includeDateRange: options.includeDateRange,
      dateRange: options.includeDateRange ? {
        startDate: options.startDate,
        endDate: options.endDate
      } : undefined
    }

    const result = await currentExport.exportToExcel(data, headers, exportOptions)
    
    if (result.success) {
      console.log('Exportación exitosa:', result.message)
    } else {
      console.error('Error en exportación:', result.message)
    }
  }

  const handleOptionChange = (key: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <RiFileExcel2Line className="mr-2 text-green-600" />
          Exportar a Excel
        </h3>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Método:</label>
          <select
            value={exportMethod}
            onChange={(e) => setExportMethod(e.target.value as 'html' | 'xlsx')}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="xlsx">XLSX (Recomendado)</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>

      {/* Opciones de exportación */}
      <div className="mb-4">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showOptions ? 'Ocultar opciones' : 'Mostrar opciones'}
        </button>

        {showOptions && (
          <div className="mt-2 p-3 bg-gray-50 rounded space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del archivo:
              </label>
              <input
                type="text"
                value={options.fileName}
                onChange={(e) => handleOptionChange('fileName', e.target.value)}
                className="w-full px-3 py-1 border rounded text-sm"
                placeholder="Nombre del archivo"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.includeSummary}
                  onChange={(e) => handleOptionChange('includeSummary', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Incluir resumen</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.includeDateRange}
                  onChange={(e) => handleOptionChange('includeDateRange', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Incluir rango de fechas</span>
              </label>
            </div>

            {options.includeDateRange && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha inicio:
                  </label>
                  <input
                    type="date"
                    value={options.startDate}
                    onChange={(e) => handleOptionChange('startDate', e.target.value)}
                    className="w-full px-3 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha fin:
                  </label>
                  <input
                    type="date"
                    value={options.endDate}
                    onChange={(e) => handleOptionChange('endDate', e.target.value)}
                    className="w-full px-3 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Información de la exportación */}
      <div className="mb-4 text-sm text-gray-600">
        <p><strong>Estudiantes:</strong> {data.length}</p>
        <p><strong>Días:</strong> {headers.length}</p>
        <p><strong>Método:</strong> {exportMethod === 'xlsx' ? 'XLSX (Excel moderno)' : 'HTML (Excel clásico)'}</p>
      </div>

      {/* Botón de exportación */}
      <button
        onClick={handleExport}
        disabled={currentExport.isExporting || data.length === 0}
        className={`w-full flex items-center justify-center px-4 py-2 rounded font-medium transition-colors ${
          currentExport.isExporting || data.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {currentExport.isExporting ? (
          <>
            <RiLoader4Line className="animate-spin mr-2" />
            Exportando...
          </>
        ) : (
          <>
            <RiFileExcel2Line className="mr-2" />
            Exportar a Excel
          </>
        )}
      </button>

      {/* Mostrar error si existe */}
      {currentExport.error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded flex items-center">
          <RiErrorWarningLine className="text-red-500 mr-2" />
          <span className="text-red-700 text-sm">{currentExport.error}</span>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Nota:</strong> El método XLSX es más compatible y genera archivos más pequeños.</p>
        <p>El método HTML es más simple pero puede tener limitaciones de compatibilidad.</p>
      </div>
    </div>
  )
}

export default ExcelExportExample
