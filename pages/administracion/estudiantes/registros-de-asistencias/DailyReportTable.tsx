import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { RecordReporteDiario, ValuesTHead } from '@/features/types/types';
import styles from './DailyReportTable.module.css';

interface DailyReportTableProps {
  reporteByGradeDaily: RecordReporteDiario[];
  valuesTHead: ValuesTHead[];
}

const DailyReportTable: React.FC<DailyReportTableProps> = ({ reporteByGradeDaily, valuesTHead }) => {
  const [debouncedData, setDebouncedData] = useState<RecordReporteDiario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce para evitar ordenamientos excesivos cuando los datos cambian frecuentemente
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedData(reporteByGradeDaily);
      setIsLoading(false);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [reporteByGradeDaily]);

  // Memoizar la función de ordenamiento para evitar recrearla en cada render
  const orderDailyReport = useCallback((rta: RecordReporteDiario[]) => {
    // Validar que el array existe y no esté vacío
    if (!rta || !Array.isArray(rta) || rta.length === 0) {
      return [];
    }

    // Crear una copia del array para no mutar el original
    const sortedArray = [...rta];
    
    sortedArray.sort((a: RecordReporteDiario, b: RecordReporteDiario) => {
      // Validar que los objetos y propiedades existan
      if (!a || !b || !a.estudiante || !b.estudiante) return 0;
      
      const fe: string = a.estudiante.lastname || '';
      const se: string = b.estudiante.lastname || '';

      if (fe > se) {
        return 1;
      }
      if (fe < se) {
        return -1;
      }
      if (fe === se) {
        const firstNameA = a.estudiante.firstname || '';
        const firstNameB = b.estudiante.firstname || '';
        
        if (firstNameA > firstNameB) return 1;
        if (firstNameA < firstNameB) return -1;
        return 0;
      }
      return 0;
    });

    // Ordenar la propiedad asistencia de cada estudiante por id de manera ascendente
    sortedArray.forEach(estudiante => {
      if (estudiante.asistencia && Array.isArray(estudiante.asistencia)) {
        estudiante.asistencia.sort((a, b) => {
          const idA = parseInt(a.id || '0', 10);
          const idB = parseInt(b.id || '0', 10);
          return idA - idB;
        });
      }
    });

    return sortedArray;
  }, []);

  // Memoizar los datos ordenados para evitar recalcular en cada render
  const orderedData = useMemo(() => {
    if (!debouncedData || !Array.isArray(debouncedData) || debouncedData.length === 0) {
      return [];
    }
    return orderDailyReport(debouncedData);
  }, [debouncedData, orderDailyReport]);

  // Memoizar la función de renderizado de celdas de asistencia
  const renderAttendanceCell = useCallback((alumno: RecordReporteDiario, dayHeader: ValuesTHead) => {
    const asistenciaDelDia = alumno.asistencia?.find(asist => asist.id === dayHeader.id);
    
    return (
      <div className={styles.attendanceCell}>
        {asistenciaDelDia ? (
          <div 
            className={`${styles.attendanceIndicator} ${asistenciaDelDia.falta ? styles.falta : asistenciaDelDia.arrivalTime ? styles.presente : styles.tardanza}`}
          >
            {asistenciaDelDia.falta ? 'F' : asistenciaDelDia.arrivalTime ? 'P' : 'T'}
          </div>
        ) : (
          <div className={`${styles.attendanceIndicator} ${styles.falta}`}>
            F
          </div>
        )}
      </div>
    );
  }, []);

  // Memoizar el header de la tabla para evitar recrearlo
  const tableHeader = useMemo(() => (
    <thead className={styles.header}>
      <tr>
        <th className={styles.headerCell}>#</th>
        <th className={styles.headerCell}>dni</th>
        <th className={styles.headerCell}>apellidos y nombres</th>
        { 
          valuesTHead?.map((day, dayIndex) => (
            <th className={`${styles.headerCell} ${styles.dayHeaderContainer}`} key={`header-${day.id}-${dayIndex}`}>
              <div className={styles.dayHeader}>
                <div className={styles.day}>
                  {day.dia?.slice(0, 1)}
                </div>
                <div className={styles.id}>
                  {day.id}
                </div>
              </div>
            </th>
          ))
        }
      </tr>
    </thead>
  ), [valuesTHead]);

  // Memoizar las filas de la tabla para optimizar el renderizado
  const tableRows = useMemo(() => {
    if (!orderedData || orderedData.length === 0) return null;

    return orderedData?.map((alumno, index) => (
      <tr className={styles.row} key={`${alumno.estudiante?.dni}-${index}`}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{alumno.estudiante?.dni}</td>
        <td className={styles.cell}>
          {alumno.estudiante?.lastname} {alumno.estudiante?.firstname} {alumno.estudiante?.name}
        </td>
        {valuesTHead?.map((dayHeader, dayIndex) => (
          <td className={styles.cell} key={`${alumno.estudiante?.dni}-${dayHeader.id}-${dayIndex}`}>
            {renderAttendanceCell(alumno, dayHeader)}
          </td>
        ))}
      </tr>
    ));
  }, [orderedData, valuesTHead, renderAttendanceCell]);

  // Validar que los datos existan antes de renderizar
  if (!reporteByGradeDaily || !Array.isArray(reporteByGradeDaily) || reporteByGradeDaily.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay datos disponibles para mostrar
      </div>
    );
  }

  // Mostrar loading mientras se procesan los datos
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Procesando datos...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Indicador de scroll horizontal */}
      <div className={styles.scrollIndicator}>
        Desliza horizontalmente para ver más columnas
      </div>
      
      {/* Mensaje de ayuda adicional */}
      <div className={styles.helpMessage}>
        <span className={styles.helpIcon}>💡</span>
        Esta tabla tiene muchas columnas. Usa el scroll horizontal para ver todos los días del mes.
      </div>
      
      <table className={styles.table}>
        {tableHeader}
        <tbody className={styles.body}>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(DailyReportTable); 