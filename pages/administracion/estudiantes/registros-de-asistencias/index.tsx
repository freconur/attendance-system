import { useGlobalContext } from "@/features/context/GlobalContext";
import useAttendanceRegister from "@/features/hooks/useAttendanceRegister";
import UseRegisterStudents from "@/features/hooks/useRegisterStudents";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DesktopDatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
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
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import TablePagination from '@mui/material/TablePagination';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
    reporteByGradeMensual
  } = useGlobalContext();
  const {
    filterRegisterByGradeAndSection,
    showJustificaconFaltaModal,
    justificacionInfoByStudent,
    showJustificacionMotivo,
    filterRegisterByGrade,
    dataStudentForTableReport
  } = useAttendanceRegister();
  const { getSections, getGrades } = UseRegisterStudents();
  const [gradeValue, setGradeValue] = useState(0);
  const [startDate, setStartDate] = useState(dayjs());
  const [dniStudent, setDniStudent] = useState("");
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const [attendance, setAttendance] = useState("registros");
  const { getAllEstudiantes, actualizarGradosDeEstudiantes } =
    useActualizarGradosDeEstudiantes();
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
    }
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(
        valuesByFilter.grade,
        valuesByFilter.section,
        `${startDate.date()}`,
        attendance,
        monthToString(startDate.month())
      );
    } else {
    }
  }, [valuesByFilter.grade, valuesByFilter.section, startDate.date()]);

  useEffect(() => {
    getUserData();
    if (userData) {
      getSections();
      getGrades();
    }
  }, [userData.name]);

  // const handleUpdateGrado = () => {
  //   actualizarGradosDeEstudiantes(allStudents)
  // }
  // useEffect(() => {
  //   getAllEstudiantes()
  // },[])

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
            className="p-1 hover:bg-orange-400 duration-300 text-slate-700 bg-yellow-300 w-[15px] h-[15px] flex justify-center items-center text-[10px] rounded-sm"
          >
            J
          </span>
        </>
      );
    } else {
      return (
        <span
          className={`${attendanceState(value) ? "text-green-400" : "text-red-400"
            }`}
        >
          {value}
        </span>
      );
    }
  };

  // const theme = useTheme();
  // const themeWithLocale = useMemo(
  //   () => createTheme(theme, locales[locale]),
  //   [locale, theme]
  // );
  const themeWithLocale = (theme: any) =>
    createTheme({
      ...theme,
      components: {
        MuiPickersToolbar: {
          styleOverrides: {
            root: {
              color: "#bbdefb",
              borderRadius: "2px",
              borderWidth: "1px",
              borderColor: "#2196f3",
              border: "1px solid",
              backgroundColor: "#0d47a1",
            },
          },
        },
      },
    }
    );


  console.log('reporteByGradeMensual', reporteByGradeMensual)
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
        <div className="bg-gradient-to-r from-sky-500 from-1% to-emerald-500 to-99% p-2">
          <h1 className="text-3xl  uppercase text-textTitulos text-center font-antonsc mb-2">
            Registros de asistencias
          </h1>
          <div className="relative gap-3 z-10 flex-wrap-reverse justify-between flex items-center mb-3">
            <button onClick={() => setShowRecordTable(!showRecordTable)} className="p-3 duration-300 hover:translate-x-2 rounded-sm bg-gradient-to-r from-bg-gradient-to-r  to-gos-3 from-buttonLogin drop-shadow-lg text-white font-montserrat">Record de asistencia</button>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              {/* <ThemeProvider theme={themeWithLocale}> */}
              {/* <Autocomplete
                  options={Object.keys(locales)}
                  getOptionLabel={(key) =>
                    `${key.substring(0, 2)}-${key.substring(2, 4)}`
                  }
                  style={{ width: 300 }}
                  value={locale}
                  disableClearable
                  onChange={(event: any, newValue: string | null) => {
                    setLocale(newValue as SupportedLocales);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Locale" fullWidth />
                  )}
                />
                <TablePagination
                  count={2000}
                  rowsPerPage={10}
                  page={1}
                  component="div"
                  onPageChange={() => {}}
                /> */}
              {/* </ThemeProvider> */}
              <DesktopDatePicker
                minDate={minDate}
                value={startDate}
                onChange={(newValue: any) => setStartDate(newValue)}
              />
              {/* <DatePicker
                minDate={minDate}
                value={startDate}
                onChange={(newValue: any) => setStartDate(newValue)}
              /> */}
            </LocalizationProvider>
          </div>
          <div className="flex gap-5 w-full my-3">
            <select
              name="grade"
              onChange={handleChangesValuesSelect}
              className="w-full outline-none bg-white rounded-md p-3  drop-shadow-xl uppercase text-slate-400"
            >
              <option className="text-slate-500" value="">
                --SELECCIONAR GRADO--
              </option>
              {grades?.map((gr, index) => {
                return (
                  <option
                    key={index}
                    className="text-slate-500"
                    value={gr.grade}
                  >
                    {gr.traditionalGrade}
                  </option>
                );
              })}
            </select>
            {grades[Number(valuesByFilter.grade) - 1]?.gotSection ? (
              <select
                name="section"
                onChange={handleChangesValuesSelect}
                className="w-full bg-white rounded-md p-3 shadow-md uppercase text-slate-400"
              >
                <option className="text-slate-500" value="">
                  --SELECCIONAR SECCION--
                </option>
                {sections?.map((gr, index) => {
                  return (
                    <option
                      key={index}
                      className="uppercase text-slate-500"
                      value={gr.section}
                    >
                      {gr.section}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
        </div>
        <div className="mt-5 p-1">
          {loadingSearchStudents ? (
            <div className="flex w-full mt-5 items-center m-auto justify-center">
              <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
              <p className="text-slate-500">buscando resultados...</p>
            </div>
          ) : null}

          {
            showRecordTable ?
              <table className="w-full">
                <thead className="bg-gradient-to-r from-bg-gradient-to-r from-colorSecundario to-colorTercero  border-b-2 border-gray-200 ">
                  <tr className="text-textTitulos capitalize font-nunito ">
                    <th className="  md:p-2 text-[12px]  w-[20px] text-center uppercase">
                      #
                    </th>
                    <th className="py-3  md:p-2 text-[12px] text-center uppercase">
                      dni
                    </th>
                    <th className="py-3 md:p-2  xm:hidden text-[12px] text-center uppercase">
                      ape. y nom.
                    </th>
                    <th className="py-3 hidden xm:block md:p-2 text-[12px] text-center uppercase">
                      apellidos y nombres
                    </th>
                    <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                      P
                    </th>
                    <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                      T
                    </th>
                    <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                      F
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {
                    reporteByGradeMensual.map((alumno, index) => {
                      return (
                        <tr className="text-slate-500 h-[40px] font-montserrat capitalize  hover:bg-hoverTable duration-100 cursor-pointer">
                          <td className="text-center text-[12px] font-light px-3">{index + 1}</td>
                          <td className="text-center text-[12px] font-light px-3">{alumno.id}</td>
                          <td className="text-center text-[12px] font-light px-3">{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombres}</td>
                          <td className="text-center text-[12px] font-medium text-green-500 px-3">{alumno.puntual}</td>
                          <td className="text-center text-[12px] font-medium text-amber-500 px-3">{alumno.tardanza}</td>
                          <td className="text-center text-[12px] font-medium text-red-500 px-3">{alumno.falta}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              :
              <table className="w-full">
                <thead className="bg-gradient-to-r from-bg-gradient-to-r from-colorSecundario to-colorTercero  border-b-2 border-gray-200 ">
                  <tr className="text-textTitulos capitalize font-nunito ">
                    <th className="  md:p-2 text-[12px]  w-[20px] text-center uppercase">
                      #
                    </th>
                    <th className="py-3 md:p-2 pl-1 md:pl-2 text-[12px] text-center uppercase">
                      dni
                    </th>
                    <th className="py-3 md:p-2  xm:hidden text-[12px] text-center uppercase">
                      ape. y nom.
                    </th>
                    <th className="py-3 hidden xm:block md:p-2 text-[12px] text-center uppercase">
                      apellidos y nombres
                    </th>
                    <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                      ingreso
                    </th>
                    <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                      salida
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {studentsByGrade?.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-slate-500 h-[40px] hover:bg-hoverTable duration-100 cursor-pointer"
                      >
                        <td className="text-center text-[12px] px-3">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="text-[10px] xm:text-[12px] text-center">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {student.dni}
                          </Link>
                        </td>
                        <td className="uppercase text-[10px] xm:text-[12px] text-center">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {student.lastname} {student.firstname}, {student.name}
                          </Link>
                        </td>
                        <td
                          className={`${student.attendanceByDate === "justificado"
                            ? "text-blue-600"
                            : "text-slate-400"
                            } flex  gap-1 justify-center  pt-3 text-[10px] xm:text-[12px]`}
                        >
                          {resultAttendance(
                            student.attendanceByDate as string,
                            student.dni as string
                          )}
                        </td>
                        <td className="text-center text-[10px] xm:text-[12px] text-blue-600">
                          {student.departureByDate}
                        </td>
                      </tr>
                    );
                  })}
                  {studentsByGradeAndSection?.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer"
                      >
                        <td className="text-center text-[12px] px-3">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="text-[12px] text-center">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {student.dni}
                          </Link>
                        </td>
                        <td className="uppercase text-[12px] text-center">
                          <Link
                            href={`/estudiantes/resumen-de-asistencia/${student.dni}`}
                          >
                            {student.lastname} {student.name}
                          </Link>
                        </td>
                        <td
                          className={`${student.attendanceByDate === "justificado"
                            ? "text-blue-600"
                            : "text-slate-400"
                            } flex  gap-1 justify-center  pt-3 text-[12px]`}
                        >
                          {resultAttendance(
                            student.attendanceByDate as string,
                            student.dni as string
                          )}
                        </td>
                        <td className="text-center text-[12px] text-blue-600">
                          {student.departureByDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          }
          {studentsByGradeAndSection.length > 0 ||
            studentsByGrade.length > 0 ? null : (
            <div className="text-slate-400 text-md w-full text-center mt-5">
              No se encontro resultadoss
            </div>
          )}
        </div>
      </div>
    </PrivateRouteAdmin>
  );
};

export default AttendanceRegister;
AttendanceRegister.Auth = PrivateRoutes;
