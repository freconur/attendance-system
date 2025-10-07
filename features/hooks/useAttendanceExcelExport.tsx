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
  method?: 'xlsx' | 'html'
}

interface ExcelExportResult {
  success: boolean
  message: string
  fileName?: string
}

interface UseAttendanceExcelExportReturn {
  exportAttendanceToExcel: (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options?: ExcelExportOptions
  ) => Promise<ExcelExportResult>
  isExporting: boolean
  error: string | null
  clearError: () => void
}

/**
 * Custom hook especializado para exportar reportes de asistencias a Excel
 * Combina funcionalidades de ambos métodos (XLSX y HTML) con optimizaciones específicas
 * 
 * @returns {UseAttendanceExcelExportReturn} Objeto con funciones y estados para exportar asistencias
 */
export const useAttendanceExcelExport = (): UseAttendanceExcelExportReturn => {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Convierte los datos de asistencia a formato de hoja de cálculo
   */
  const transformAttendanceData = useCallback((
    data: RecordReporteDiario[],
    headers: ValuesTHead[]
  ) => {
    // Crear encabezados de la tabla
    const excelHeaders = [
      '#',
      'DNI',
      'Apellidos y Nombres',
      ...headers.map(header => `${header.dia} (${header.id})`)
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
   * Genera estadísticas de asistencias
   */
  const generateAttendanceStats = useCallback((data: RecordReporteDiario[], headers: ValuesTHead[]) => {
    const stats = {
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
      }),
      estadisticasGenerales: {
        totalPresentes: data.reduce((acc, record) => 
          acc + (record.asistencia?.filter(asist => asist.arrivalTime).length || 0), 0),
        totalFaltas: data.reduce((acc, record) => 
          acc + (record.asistencia?.filter(asist => asist.falta).length || 0), 0),
        totalTardanzas: data.reduce((acc, record) => 
          acc + (record.asistencia?.filter(asist => !asist.falta && !asist.arrivalTime).length || 0), 0)
      }
    }

    return stats
  }, [])

  /**
   * Exporta usando el método HTML (más simple, no requiere dependencias)
   */
  const exportWithHTML = useCallback(async (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options: ExcelExportOptions
  ): Promise<ExcelExportResult> => {
    const { headers: excelHeaders, rows: excelRows } = transformAttendanceData(data, headers)
    const stats = options.includeSummary ? generateAttendanceStats(data, headers) : null

    let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <meta name="ExcelCreated" content="true">
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 6px; text-align: center; }
          th { background-color: #4CAF50; color: white; font-weight: bold; }
          .summary { background-color: #f2f2f2; margin-top: 20px; }
          .summary th { background-color: #2196F3; }
          .presente { background-color: #d4edda; color: #155724; font-weight: bold; }
          .falta { background-color: #f8d7da; color: #721c24; font-weight: bold; }
          .tardanza { background-color: #fff3cd; color: #856404; font-weight: bold; }
          .header-info { background-color: #e9ecef; padding: 10px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
    `

    // Información del reporte
    htmlContent += `
      <div class="header-info">
        <h2>📊 Reporte de Asistencias</h2>
        <p><strong>📅 Período:</strong> ${options.dateRange?.startDate || 'N/A'} - ${options.dateRange?.endDate || 'N/A'}</p>
        <p><strong>👥 Total de estudiantes:</strong> ${data.length}</p>
        <p><strong>📆 Total de días:</strong> ${headers.length}</p>
        <p><strong>📅 Fecha de generación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
      </div>
    `

    // Tabla principal
    htmlContent += '<table>'
    
    // Encabezados
    htmlContent += '<tr>'
    excelHeaders.forEach(header => {
      htmlContent += `<th>${header}</th>`
    })
    htmlContent += '</tr>'

    // Filas de datos
    excelRows.forEach(row => {
      htmlContent += '<tr>'
      row.forEach((cell, index) => {
        let className = ''
        if (index >= 3) { // Columnas de asistencia
          if (cell === 'PRESENTE') className = 'presente'
          else if (cell === 'FALTA') className = 'falta'
          else if (cell === 'TARDANZA') className = 'tardanza'
        }
        htmlContent += `<td class="${className}">${cell}</td>`
      })
      htmlContent += '</tr>'
    })

    htmlContent += '</table>'

    // Resumen si está habilitado
    if (stats) {
      htmlContent += `
        <div class="summary">
          <h3>📈 Resumen de Asistencias</h3>
          <table>
            <tr>
              <th>Estudiante</th>
              <th>DNI</th>
              <th>Presentes</th>
              <th>Faltas</th>
              <th>Tardanzas</th>
              <th>% Asistencia</th>
            </tr>
      `
      
      stats.resumenPorEstudiante.forEach(est => {
        htmlContent += `
          <tr>
            <td>${est.estudiante}</td>
            <td>${est.dni}</td>
            <td>${est.presentes}</td>
            <td>${est.faltas}</td>
            <td>${est.tardanzas}</td>
            <td>${est.porcentajeAsistencia}%</td>
          </tr>
        `
      })
      
      htmlContent += '</table></div>'
    }

    htmlContent += '</body></html>'
    
    // Crear y descargar archivo
    const blob = new Blob([htmlContent], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })

    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.href = url
    link.download = `${options.fileName}.xls`
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: 'Archivo Excel exportado exitosamente (HTML)',
      fileName: `${options.fileName}.xls`
    }
  }, [transformAttendanceData, generateAttendanceStats])

  /**
   * Exporta usando el método XLSX (más robusto)
   */
  const exportWithXLSX = useCallback(async (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options: ExcelExportOptions
  ): Promise<ExcelExportResult> => {
    // Importar XLSX dinámicamente
    const XLSX = await import('xlsx')

    const { headers: excelHeaders, rows: excelRows } = transformAttendanceData(data, headers)
    const stats = options.includeSummary ? generateAttendanceStats(data, headers) : null

    // Crear workbook
    const workbook = XLSX.utils.book_new()

    // Hoja principal
    const worksheetData = [excelHeaders, ...excelRows]
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // Configurar ancho de columnas
    const colWidths = [
      { wch: 5 },   // #
      { wch: 12 },  // DNI
      { wch: 25 },  // Apellidos y Nombres
      ...headers.map(() => ({ wch: 10 })) // Días
    ]
    worksheet['!cols'] = colWidths

    XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Asistencias')

    // Hoja de resumen
    if (stats) {
      const summaryHeaders = [
        'Estudiante',
        'DNI',
        'Presentes',
        'Faltas',
        'Tardanzas',
        '% Asistencia'
      ]
      
      const summaryRows = stats.resumenPorEstudiante.map(est => [
        est.estudiante,
        est.dni,
        est.presentes,
        est.faltas,
        est.tardanzas,
        est.porcentajeAsistencia
      ])

      const summaryData = [summaryHeaders, ...summaryRows]
      const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData)
      
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

    // Generar archivo
    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array' 
    })

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.href = url
    link.download = `${options.fileName}.xlsx`
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: 'Archivo Excel exportado exitosamente (XLSX)',
      fileName: `${options.fileName}.xlsx`
    }
  }, [transformAttendanceData, generateAttendanceStats])

  /**
   * Función principal para exportar asistencias
   */
  const exportAttendanceToExcel = useCallback(async (
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options: ExcelExportOptions = {}
  ): Promise<ExcelExportResult> => {
    try {
      setIsExporting(true)
      setError(null)

      // Validaciones
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos de estudiantes para exportar')
      }

      if (!headers || !Array.isArray(headers) || headers.length === 0) {
        throw new Error('No hay datos de días para exportar')
      }

      // Configurar opciones por defecto
      const defaultOptions: ExcelExportOptions = {
        fileName: `Reporte_Asistencias_${new Date().toISOString().split('T')[0]}`,
        sheetName: 'Asistencias',
        includeSummary: true,
        includeDateRange: false,
        method: 'xlsx',
        ...options
      }

      // Exportar según el método seleccionado
      if (defaultOptions.method === 'xlsx') {
        return await exportWithXLSX(data, headers, defaultOptions)
      } else {
        return await exportWithHTML(data, headers, defaultOptions)
      }

    } catch (error: any) {
      console.error('Error al exportar asistencias:', error)
      setError(error.message || 'Error al exportar el archivo')
      
      return {
        success: false,
        message: error.message || 'Error al exportar el archivo'
      }
    } finally {
      setIsExporting(false)
    }
  }, [exportWithXLSX, exportWithHTML])

  return {
    exportAttendanceToExcel,
    isExporting,
    error,
    clearError
  }
}
