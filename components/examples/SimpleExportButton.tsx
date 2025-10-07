import React, { useState } from 'react'
import { useAttendanceExcelExport } from '@/features/hooks/useAttendanceExcelExport'
import { RecordReporteDiario, ValuesTHead } from '@/features/types/types'
import { RiFileExcel2Line, RiLoader4Line } from 'react-icons/ri'

interface SimpleExportButtonProps {
  data: RecordReporteDiario[]
  headers: ValuesTHead[]
  className?: string
}

/**
 * Componente simple con solo un botón de exportación
 * Versión minimalista para integrar fácilmente
 */
const SimpleExportButton: React.FC<SimpleExportButtonProps> = ({
  data,
  headers,
  className = ''
}) => {
  const [isExporting, setIsExporting] = useState(false)
  const { exportAttendanceToExcel } = useAttendanceExcelExport()

  const handleQuickExport = async () => {
    setIsExporting(true)
    try {
      await exportAttendanceToExcel(data, headers, {
        fileName: `Reporte_Asistencias_${new Date().toISOString().split('T')[0]}`,
        includeSummary: true,
        method: 'xlsx'
      })
    } catch (error) {
      console.error('Error al exportar:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleQuickExport}
      disabled={isExporting || data.length === 0}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
        isExporting || data.length === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      } ${className}`}
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
  )
}

export default SimpleExportButton
