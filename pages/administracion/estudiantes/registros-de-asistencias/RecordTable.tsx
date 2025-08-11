import React from 'react';
import { RecordEstudiante } from '@/features/types/types';
import styles from './registrosAsistencia.module.css';

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
      <div className="p-4 text-center text-gray-500">
        No hay datos disponibles para mostrar
      </div>
    );
  }

  const orderedData = orderReporteMensual(reporteByGradeMensual);

  return (
    <table className={`${styles.recordTable} animate-fade-in`}>
      <thead>
        <tr>
          <th>#</th>
          <th className="hidden md:table-cell">dni</th>
          <th>apellidos y nombres</th>
          <th>P</th>
          <th>T</th>
          <th>F</th>
        </tr>
      </thead>
      <tbody>
        {orderedData.length > 0 ? (
          orderedData.map((alumno, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="hidden md:table-cell">{alumno.id}</td>
                <td>{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombres}</td>
                <td>{alumno.puntual}</td>
                <td>{alumno.tardanza}</td>
                <td>{alumno.falta}</td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500">
              No hay registros de asistencia disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RecordTable; 