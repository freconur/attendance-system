import { useGlobalContext } from "@/features/context/GlobalContext";
import useAttendanceRegister from "@/features/hooks/useAttendanceRegister";
import UseRegisterStudents from "@/features/hooks/useRegisterStudents";
import dayjs from "dayjs";
import "dayjs/locale/es";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PrivateRoutes from "@/components/layouts/PrivateRoutes";
import useAuthentication from "@/features/hooks/useAuthentication";
import Link from "next/link";
import { monthToString } from "@/dates/date";
import JustificacionFaltaModal from "@/Modals/JustificacionFaltaModal";
import JustificacionFaltaMotivo from "@/Modals/JustificacionFaltaMotivo";
import { RiLoader4Line } from "react-icons/ri";
import { attendanceState } from "@/utils/attendanceState";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrivateRouteAdmin from "@/components/layouts/PrivateRouteAdmin";
import { useActualizarGradosDeEstudiantes } from "@/features/hooks/useActualizarGradosEstudiantes";
import { createTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import { RecordEstudiante, RecordReporteDiario, ValuesTHead } from "@/features/types/types";
import styles from "./registrosAsistencia.module.css";
import RecordTable from "./RecordTable";
import CurrentTable from "./CurrentTable";
import DailyReportTable from "./DailyReportTable";
import HeaderSection from "./HeaderSection";
type SupportedLocales = keyof typeof locales;
const AttendanceRegister = () => {
  const [locale, setLocale] = React.useState<SupportedLocales>("esES");
  const pdfRef = useRef(null);
  const { getUserData } = useAuthentication();
  const initialStateByFilter = { grade: "", section: "" };
  const [valuesByFilter, setValuesByFilter] = useState(initialStateByFilter);
  const {
    allStudents,
    studentsByGradeAndSection,
    sections,
    grades,
    userData,
    justificacionFaltaModal,
    justificacionStudent,
    justificacionMotivoModal,
    loadingSearchStudents,
    studentsByGrade,
    reporteByGradeMensual,
    reporteByGradeDaily
  } = useGlobalContext();
  const {
    filterRegisterByGradeAndSection,
    showJustificaconFaltaModal,
    justificacionInfoByStudent,
    showJustificacionMotivo,
    filterRegisterByGrade,
    dataStudentForTableReport,
    dataStudentsTablaDaily,
  } = useAttendanceRegister();
  const { getSections, getGrades, falsearTodosEstudiantes, actualizarEstudiantesActivos } = UseRegisterStudents();
  const [gradeValue, setGradeValue] = useState(0);
  const [startDate, setStartDate] = useState(dayjs());
  const [showReporteDiario, setShowReporteDiario] = useState<boolean>(false)
  const [dniStudent, setDniStudent] = useState("");
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const [attendance, setAttendance] = useState("registros");
  const [valuesTHead, setValuesTHead] = useState<ValuesTHead[]>([]);
  const [showRecordTable, setShowRecordTable] = useState<boolean>(false)
  const onDownloadPdf = () => {
    const input: any = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 5;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`codigos-qr.pdf`);
    });
  };
  const handleChangesValuesSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValuesByFilter({
      ...valuesByFilter,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    diasDelMesConFechaParaElTHead()
    //tendria que validar si existe el valor del grado y si tiene la propiedad de gotSection en true para acceder a la busqueda de los alumnos
    if (
      grades[Number(valuesByFilter.grade) - 1]?.gotSection === false &&
      valuesByFilter.grade
    ) {
      //tengo que llamar la funcion simple de los alumnos sin seccion solo grado
      filterRegisterByGrade(
        valuesByFilter.grade,
        `${startDate.date()}`,
        monthToString(startDate.month())
      );
      dataStudentForTableReport(monthToString(startDate.month()), valuesByFilter.grade)
      dataStudentsTablaDaily(monthToString(startDate.month()), valuesByFilter.grade, startDate.month())

    }
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(
        valuesByFilter.grade,
        valuesByFilter.section,
        `${startDate.date()}`,
        attendance,
        monthToString(startDate.month())
      );
    }
  }, [valuesByFilter.grade, valuesByFilter.section, startDate.date()]);

  useEffect(() => {
    getUserData();
    if (userData) {
      getSections();
      getGrades();
    }
  }, [userData.name]);
  const diasDelMesConFechaParaElTHead = () => {
    const mes = startDate.month(); // 0-11
    const año = startDate.year();
    const primerDia = startDate.startOf('month');
    const ultimoDia = startDate.endOf('month');
    
    // Obtener la fecha actual
    const fechaActualHoy = dayjs();
    const mesActual = fechaActualHoy.month();
    const añoActual = fechaActualHoy.year();
    
    // Determinar hasta qué día debemos iterar
    let fechaLimite;
    
    if (mes === mesActual && año === añoActual) {
      // Si estamos en el mes actual, limitar hasta la fecha actual
      fechaLimite = fechaActualHoy;
    } else if (mes < mesActual || (mes === mesActual && año < añoActual)) {
      // Si estamos en un mes anterior, incluir todo el mes
      fechaLimite = ultimoDia;
    } else {
      // Si estamos en un mes futuro, no incluir ningún día
      setValuesTHead([]);
      return;
    }
    
    const diasLaborables = [];
    
    // Iterar desde el primer día del mes hasta la fecha límite
    let fechaActual = primerDia.clone();
    
    while (fechaActual.isBefore(fechaLimite) || fechaActual.isSame(fechaLimite, 'day')) {
      const diaSemana = fechaActual.day(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
      
      // Solo incluir días de lunes a viernes (1-5)
      if (diaSemana >= 1 && diaSemana <= 5) {
        const diaString = fechaActual.format('dddd'); // Obtener nombre completo del día
        const primeraLetra = diaString.charAt(0).toUpperCase(); // Primera letra en mayúscula
        
        diasLaborables.push({
          id: fechaActual.date().toString(),
          dia: primeraLetra
        });
      }
      
      fechaActual = fechaActual.add(1, 'day');
    }
    setValuesTHead(diasLaborables)
    console.log('diasLaborables', diasLaborables)
   
  }
  console.log('startDate.month()', startDate)
  const resultAttendance = (value: string, dni: string) => {
    if (value === "justificado") {
      return (
        <span
          onClick={() => {
            justificacionInfoByStudent(dni, `${startDate.date()}`);
            showJustificacionMotivo(!justificacionMotivoModal);
          }}
        >
          {value}
        </span>
      );
    } else if (value === "falto") {
      return (
        <>
          {value}{" "}
          <span
            onClick={() => {
              showJustificaconFaltaModal(!justificacionFaltaModal);
              setDniStudent(dni as string);
            }}
            className={styles.justificationButton}
          >
            J
          </span>
        </>
      );
    } else {
      return (
        <span
          style={{
            color: attendanceState(value) ? '#22c55e' : '#ef4444'
          }}
        >
          {value}
        </span>
      );
    }
  };




  const orderReporteMensual = (rta:RecordEstudiante[]) => {
    rta.sort((a: any, b: any) => {
      const fe: string = a && a.apellidoPaterno;
      const se: string = b && b.apellidoPaterno;

      if (fe > se) {
        return 1;
      }
      // if(fe && se) {}
      if (fe < se) {
        return -1;
      }
      if (a.apellidoPaterno === b.apellidoPaterno) {
        if (a.apellidoMaterno > b.apellidoMaterno) return 1;
        if (a.apellidoMaterno < b.apellidoMaterno) return -1;
        return 0;
      }
      return 0;
    });
    return rta
  }

  return (
    <PrivateRouteAdmin>
      <div className="relative">
        {justificacionMotivoModal ? (
          <JustificacionFaltaMotivo
            justificacionStudent={justificacionStudent}
          />
        ) : null}
        {justificacionFaltaModal ? (
          <JustificacionFaltaModal
            date={startDate.date()}
            dniStudent={dniStudent}
          />
        ) : null}
        <HeaderSection
          startDate={startDate}
          setStartDate={setStartDate}
          minDate={minDate}
          showRecordTable={showRecordTable}
          setShowRecordTable={setShowRecordTable}
          showReporteDiario={showReporteDiario}
          setShowReporteDiario={setShowReporteDiario}
          valuesByFilter={valuesByFilter}
          handleChangesValuesSelect={handleChangesValuesSelect}
          grades={grades}
          sections={sections}
        />
        <div className={styles.contentContainer}>
          {loadingSearchStudents ? (
            <div className={styles.loaderContainer}>
              <RiLoader4Line className={styles.loaderIcon} />
              <p className={styles.loaderText}>buscando resultados...</p>
            </div>
          ) : (
            <div className={styles.tablesContainer}>
              {!showReporteDiario && !showRecordTable && (
                <div className={styles.tableWrapper}>
                  <div className={styles.tableTitleContainer}>
                    <h3 className={styles.tableTitle}>Vista General de Asistencia</h3>
                    <p className={styles.tableSubtitle}>Tabla principal con la asistencia del día seleccionado</p>
                  </div>
                  <CurrentTable studentsByGrade={studentsByGrade} studentsByGradeAndSection={studentsByGradeAndSection} resultAttendance={resultAttendance}/>
                </div>
              )}
              
              {showReporteDiario && (
                <div className={styles.tableWrapper}>
                  <div className={styles.tableTitleContainer}>
                    <h3 className={styles.tableTitle}>Reporte Diario de Asistencia</h3>
                    <p className={styles.tableSubtitle}>Resumen detallado de la asistencia por día</p>
                  </div>
                  <div className={styles.dailyReportContainer}>
                    <DailyReportTable reporteByGradeDaily={reporteByGradeDaily} valuesTHead={valuesTHead}/>
                  </div>
                </div>
              )}

              {showRecordTable && (
                <div className={styles.tableWrapper}>
                  <div className={styles.tableTitleContainer}>
                    <h3 className={styles.tableTitle}>Reporte Acumulado de Asistencia</h3>
                    <p className={styles.tableSubtitle}>Resumen mensual de la asistencia de todos los estudiantes</p>
                  </div>
                  <RecordTable reporteByGradeMensual={orderReporteMensual(reporteByGradeMensual)} />
                </div>
              )}
            </div>
          )}


          {studentsByGradeAndSection.length > 0 ||
            studentsByGrade.length > 0 ? null : (
            <div className={styles.noResults}>
              No se encontraron resultados
            </div>
          )}
        </div>
      </div>
    </PrivateRouteAdmin>
  );
};

export default AttendanceRegister;
AttendanceRegister.Auth = PrivateRoutes;
