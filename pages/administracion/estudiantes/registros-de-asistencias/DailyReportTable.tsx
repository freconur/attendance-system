import React from 'react';
import { RecordReporteDiario } from '@/features/types/types';
import styles from './registrosAsistencia.module.css';

interface DailyReportTableProps {
  reporteByGradeDaily: RecordReporteDiario[];
}

const DailyReportTable: React.FC<DailyReportTableProps> = ({ reporteByGradeDaily }) => {
  const orderDailyReport = (rta: RecordReporteDiario[]) => {
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
    return sortedArray;
  };

  // Validar que los datos existan antes de renderizar
  if (!reporteByGradeDaily || !Array.isArray(reporteByGradeDaily) || reporteByGradeDaily.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay datos disponibles para mostrar
      </div>
    );
  }

  const orderedData = orderDailyReport(reporteByGradeDaily);

  return (
    <div className={styles.dailyReportTable} style={{ overflowX: 'auto' }}>
      <table className="animate-fade-in">
        <thead>
          <tr>
            <th>#</th>
            <th className="hidden md:table-cell">dni</th>
            <th>apellidos y nombres</th>
            {orderedData.length > 0 && orderedData[0]?.asistencia ? (
              orderedData[0].asistencia.map((day, dayIndex) => {
                return (
                  <th className={styles.dayHeaderContainer} key={dayIndex}>
                    <div className={styles.dayHeader}>
                      <div className={styles.day}>
                        {day.day?.slice(0, 1)}
                      </div>
                      <div className={styles.id}>
                        {day.id}
                      </div>
                    </div>
                  </th>
                )
              })
            ) : null}
          </tr>
        </thead>
        <tbody>
          {orderedData.map((alumno, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="hidden md:table-cell">{alumno.estudiante?.dni}</td>
                <td className={styles.nameCell}>{alumno.estudiante?.lastname} {alumno.estudiante?.firstname} {alumno.estudiante?.name}</td>
                {alumno.asistencia && Array.isArray(alumno.asistencia) ? (
                  alumno.asistencia.map((day, dayIndex) => {
                    return (
                      <td className={styles.rowAttendanceCell} key={dayIndex}>
                        <div className={styles.attendanceCell}>
                          <div 
                            className={`${styles.attendanceIndicator} ${day.falta ? styles.falta : day.arrivalTime ? styles.presente : styles.tardanza}`}
                            data-tooltip={day.falta ? 'Falta' : day.arrivalTime ? 'Presente' : 'Tardanza'}
                          >
                            {day.falta ? 'F' : day.arrivalTime ? 'P' : 'T'}
                          </div>
                        </div>
                      </td>
                    )
                  })
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DailyReportTable; 