import React from 'react';
import { RecordEstudiante } from '@/features/types/types';
import styles from './RecordTable.module.css';

interface RecordTableProps {
  reporteByGradeMensual: RecordEstudiante[];
}

const RecordTable: React.FC<RecordTableProps> = ({ reporteByGradeMensual }) => {
  const orderReporteMensual = (rta: RecordEstudiante[]) => {
    // Validar que el array existe y no esté vacío
    if (!rta || !Array.isArray(rta) || rta.length === 0) {
      return [];
    }

    // Crear una copia del array para no mutar el original
    const sortedArray = [...rta];
    
    sortedArray.sort((a: RecordEstudiante, b: RecordEstudiante) => {
      // Validar que los objetos y propiedades existan
      if (!a || !b) return 0;
      
      const fe: string = a.apellidoPaterno || '';
      const se: string = b.apellidoPaterno || '';

      if (fe > se) {
        return 1;
      }
      if (fe < se) {
        return -1;
      }
      if (fe === se) {
        const apellidoMaternoA = a.apellidoMaterno || '';
        const apellidoMaternoB = b.apellidoMaterno || '';
        
        if (apellidoMaternoA > apellidoMaternoB) return 1;
        if (apellidoMaternoA < apellidoMaternoB) return -1;
        return 0;
      }
      return 0;
    });
    return sortedArray;
  };

  // Validar que los datos existan antes de renderizar
  if (!reporteByGradeMensual || !Array.isArray(reporteByGradeMensual)) {
    return (
      <div className={styles.noDataMessage}>
        No hay datos disponibles para mostrar
      </div>
    );
  }

  const orderedData = orderReporteMensual(reporteByGradeMensual);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.headerCell}>#</th>
            <th className={`${styles.headerCell} ${styles.hideOnMobile}`}>dni</th>
            <th className={styles.headerCell}>apellidos y nombres</th>
            <th className={styles.headerCell}>P</th>
            <th className={styles.headerCell}>T</th>
            <th className={styles.headerCell}>F</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {orderedData.length > 0 ? (
            orderedData.map((alumno, index) => {
              return (
                <tr key={index} className={styles.row}>
                  <td className={styles.cell}>{index + 1}</td>
                  <td className={`${styles.cell} ${styles.hideOnMobile}`}>{alumno.id}</td>
                  <td className={styles.cell}>{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombres}</td>
                  <td className={styles.cell}>{alumno.puntual}</td>
                  <td className={styles.cell}>{alumno.tardanza}</td>
                  <td className={styles.cell}>{alumno.falta}</td>
                </tr>
              )
            })
          ) : (
            <tr className={styles.noDataRow}>
              <td colSpan={6} className={styles.noDataCell}>
                No hay registros de asistencia disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable; 