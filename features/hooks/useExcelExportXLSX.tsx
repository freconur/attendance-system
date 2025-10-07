import { useState, useCallback } from 'react'
import { RecordReporteDiario, ValuesTHead } from '@/features/types/types'

// Tipos para el hook
interface ExcelExportOptions {
  fileName?: string
  sheetName?: string
  includeSummary?: boolean
  includeDateRange?: boolean
  dateRange?: {
    startDate: string
    endDate: string
  }
}

interface ExcelExportResult {
  success: boolean
  message: string
  fileName?: string
}

interface UseExcelExportReturn {
  exportToExcel: (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options?: ExcelExportOptions
  ) => Promise<ExcelExportResult>
  isExporting: boolean
  error: string | null
}

/**
 * Custom hook para exportar datos de asistencias a Excel usando XLSX
 * Esta versión es más robusta y compatible con diferentes versiones de Excel
 * 
 * @returns {UseExcelExportReturn} Objeto con funciones y estados para exportar a Excel
 */
export const useExcelExportXLSX = (): UseExcelExportReturn => {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Convierte los datos de asistencia a formato de hoja de cálculo
   */
  const transformDataForExcel = useCallback((
    data: RecordReporteDiario[],
    headers: ValuesTHead[]
  ) => {
    // Crear encabezados de la tabla
    const excelHeaders = [
      '#',
      'DNI',
      'Apellidos y Nombres',
      ...headers.map(header => `Día ${header.id}`)
    ]

    // Transformar datos de estudiantes
    const excelRows = data.map((record, index) => {
      const row = [
        index + 1,
        record.estudiante?.dni || '',
        `${record.estudiante?.lastname || ''} ${record.estudiante?.firstname || ''} ${record.estudiante?.name || ''}`.trim()
      ]

      // Agregar datos de asistencia para cada día
      headers.forEach(dayHeader => {
        const asistenciaDelDia = record.asistencia?.find(asist => asist.id === dayHeader.id)
        
        if (asistenciaDelDia) {
          if (asistenciaDelDia.falta) {
            row.push('FALTA')
          } else if (asistenciaDelDia.arrivalTime) {
            row.push('PRESENTE')
          } else {
            row.push('TARDANZA')
          }
        } else {
          row.push('FALTA')
        }
      })

      return row
    })

    return {
      headers: excelHeaders,
      rows: excelRows
    }
  }, [])

  /**
   * Genera un resumen de asistencias
   */
  const generateSummary = useCallback((data: RecordReporteDiario[], headers: ValuesTHead[]) => {
    const summary = {
      totalEstudiantes: data.length,
      totalDias: headers.length,
      resumenPorEstudiante: data.map(record => {
        const totalDias = headers.length
        const presentes = record.asistencia?.filter(asist => asist.arrivalTime).length || 0
        const faltas = record.asistencia?.filter(asist => asist.falta).length || 0
        const tardanzas = record.asistencia?.filter(asist => !asist.falta && !asist.arrivalTime).length || 0
        
        return {
          estudiante: `${record.estudiante?.lastname || ''} ${record.estudiante?.firstname || ''}`.trim(),
          dni: record.estudiante?.dni || '',
          presentes,
          faltas,
          tardanzas,
          porcentajeAsistencia: totalDias > 0 ? Math.round((presentes / totalDias) * 100) : 0
        }
      })
    }

    return summary
  }, [])

  /**
   * Función principal para exportar a Excel usando XLSX
   */
  const exportToExcel = useCallback(async (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options: ExcelExportOptions = {}
  ): Promise<ExcelExportResult> => {
    try {
      setIsExporting(true)
      setError(null)

      // Validaciones
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos para exportar')
      }

      if (!headers || !Array.isArray(headers) || headers.length === 0) {
        throw new Error('No hay encabezados para exportar')
      }

      // Configurar opciones por defecto
      const defaultOptions: ExcelExportOptions = {
        fileName: `Reporte_Asistencias_${new Date().toISOString().split('T')[0]}`,
        sheetName: 'Asistencias',
        includeSummary: true,
        includeDateRange: false,
        ...options
      }

      // Importar XLSX dinámicamente
      const XLSX = await import('xlsx')

      // Transformar datos
      const { headers: excelHeaders, rows: excelRows } = transformDataForExcel(data, headers)

      // Crear workbook
      const workbook = XLSX.utils.book_new()

      // Crear hoja principal con datos de asistencias
      const worksheetData = [excelHeaders, ...excelRows]
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

      // Aplicar estilos básicos (ancho de columnas)
      const colWidths = [
        { wch: 5 },   // #
        { wch: 12 },  // DNI
        { wch: 25 },  // Apellidos y Nombres
        ...headers.map(() => ({ wch: 10 })) // Días
      ]
      worksheet['!cols'] = colWidths

      // Agregar hoja al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, defaultOptions.sheetName)

      // Agregar hoja de resumen si está habilitada
      if (defaultOptions.includeSummary) {
        const summary = generateSummary(data, headers)
        
        const summaryHeaders = [
          'Estudiante',
          'DNI',
          'Presentes',
          'Faltas',
          'Tardanzas',
          '% Asistencia'
        ]
        
        const summaryRows = summary.resumenPorEstudiante.map(est => [
          est.estudiante,
          est.dni,
          est.presentes,
          est.faltas,
          est.tardanzas,
          est.porcentajeAsistencia
        ])

        const summaryData = [summaryHeaders, ...summaryRows]
        const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData)
        
        // Aplicar ancho de columnas al resumen
        summaryWorksheet['!cols'] = [
          { wch: 25 }, // Estudiante
          { wch: 12 }, // DNI
          { wch: 10 }, // Presentes
          { wch: 10 }, // Faltas
          { wch: 10 }, // Tardanzas
          { wch: 12 }  // % Asistencia
        ]

        XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Resumen')
      }

      // Generar archivo Excel
      const excelBuffer = XLSX.write(workbook, { 
        bookType: 'xlsx', 
        type: 'array' 
      })

      // Crear blob y descargar
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      // Crear enlace de descarga
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.href = url
      link.download = `${defaultOptions.fileName}.xlsx`
      link.style.display = 'none'
      
      // Agregar al DOM, hacer clic y remover
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Limpiar URL
      URL.revokeObjectURL(url)

      return {
        success: true,
        message: 'Archivo Excel exportado exitosamente',
        fileName: `${defaultOptions.fileName}.xlsx`
      }

    } catch (error: any) {
      console.error('Error al exportar a Excel:', error)
      setError(error.message || 'Error al exportar el archivo')
      
      return {
        success: false,
        message: error.message || 'Error al exportar el archivo'
      }
    } finally {
      setIsExporting(false)
    }
  }, [transformDataForExcel, generateSummary])

  return {
    exportToExcel,
    isExporting,
    error
  }
}
