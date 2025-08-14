import { RecordEstudiante, StudentData } from '@/features/types/types';
import Link from 'next/link';
import React from 'react'
import styles from './CurrentTable.module.css';

interface Props {
    studentsByGrade: StudentData[]
    resultAttendance: (attendance: string, dni: string) => React.JSX.Element
    studentsByGradeAndSection: StudentData[]
}

const CurrentTable = ({ studentsByGrade, resultAttendance, studentsByGradeAndSection }: Props) => {
  return (
    <div className={styles.container}>
        <table className={styles.table}>
                <thead className={styles.header}>
                  <tr>
                    <th className={styles.headerCell}>
                      #
                    </th>
                    <th className={`${styles.headerCell} ${styles.hideOnMobile}`}>
                      DNI
                    </th>
                    <th className={styles.headerCell}>
                      Apellidos y Nombres
                    </th>
                    <th className={styles.headerCell}>
                      Ingreso
                    </th>
                    <th className={styles.headerCell}>
                      Salida
                    </th>
                  </tr>
                </thead>

                <tbody className={styles.body}>
                  {studentsByGrade?.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className={styles.row}
                      >
                        <td className={styles.cell}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className={`${styles.cell} ${styles.hideOnMobile}`}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {student.dni}
                          </Link>
                        </td>
                        <td className={styles.cell}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {student.lastname} {student.firstname}, {student.name}
                          </Link>
                        </td>
                        <td className={`${styles.attendanceCell} ${
                          student.attendanceByDate === "justificado"
                            ? styles.attendanceJustificado
                            : styles.attendanceDefault
                        }`}>
                          {resultAttendance(
                            student.attendanceByDate as string,
                            student.dni as string
                          )}
                        </td>
                        <td className={`${styles.cell} ${styles.departureCell}`}>
                          {student.departureByDate}
                        </td>
                      </tr>
                    );
                  })}
                  {studentsByGradeAndSection?.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className={styles.row}
                      >
                        <td className={styles.cell}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className={`${styles.cell} ${styles.hideOnMobile}`}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {student.lastname} {student.name}
                          </Link>
                        </td>
                        <td className={styles.cell}>
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                            className={styles.link}
                          >
                            {student.lastname} {student.name}
                          </Link>
                        </td>
                        <td className={`${styles.attendanceCell} ${
                          student.attendanceByDate === "justificado"
                            ? styles.attendanceJustificado
                            : styles.attendanceDefault
                        }`}>
                          {resultAttendance(
                            student.attendanceByDate as string,
                            student.dni as string
                          )}
                        </td>
                        <td className={`${styles.cell} ${styles.departureCell}`}>
                          {student.departureByDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
    </div>
  )
}

export default CurrentTable