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
 * Custom hook para exportar datos de asistencias a Excel
 * 
 * @returns {UseExcelExportReturn} Objeto con funciones y estados para exportar a Excel
 */
export const useExcelExport = (): UseExcelExportReturn => {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Convierte los datos de asistencia a formato compatible con Excel
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
   * Crea el contenido HTML para Excel
   */
  const createExcelContent = useCallback((
    data: RecordReporteDiario[],
    headers: ValuesTHead[],
    options: ExcelExportOptions = {}
  ) => {
    const { headers: excelHeaders, rows: excelRows } = transformDataForExcel(data, headers)
    const summary = options.includeSummary ? generateSummary(data, headers) : null

    let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <meta name="ExcelCreated" content="true">
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; font-weight: bold; }
          .summary { background-color: #f2f2f2; margin-top: 20px; }
          .summary th { background-color: #2196F3; }
          .presente { background-color: #d4edda; color: #155724; }
          .falta { background-color: #f8d7da; color: #721c24; }
          .tardanza { background-color: #fff3cd; color: #856404; }
        </style>
      </head>
      <body>
    `

    // Agregar información del reporte
    if (options.includeDateRange && options.dateRange) {
      htmlContent += `
        <h2>Reporte de Asistencias</h2>
        <p><strong>Período:</strong> ${options.dateRange.startDate} - ${options.dateRange.endDate}</p>
        <p><strong>Total de estudiantes:</strong> ${data.length}</p>
        <p><strong>Total de días:</strong> ${headers.length}</p>
        <br>
      `
    }

    // Crear tabla principal
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

    // Agregar resumen si está habilitado
    if (summary) {
      htmlContent += `
        <div class="summary">
          <h3>Resumen de Asistencias</h3>
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
      
      summary.resumenPorEstudiante.forEach(est => {
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
    
    return htmlContent
  }, [transformDataForExcel, generateSummary])

  /**
   * Función principal para exportar a Excel
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

      // Crear contenido HTML
      const htmlContent = createExcelContent(data, headers, defaultOptions)

      // Crear blob y descargar
      const blob = new Blob([htmlContent], {
        type: 'application/vnd.ms-excel;charset=utf-8'
      })

      // Crear enlace de descarga
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.href = url
      link.download = `${defaultOptions.fileName}.xls`
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
        fileName: `${defaultOptions.fileName}.xls`
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
  }, [createExcelContent])

  return {
    exportToExcel,
    isExporting,
    error
  }
}
