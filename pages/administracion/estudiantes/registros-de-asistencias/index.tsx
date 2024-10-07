import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase/firebaseConfig';
import PrivateRoutes from '@/components/layouts/PrivateRoutes';
import useAuthentication from '@/features/hooks/useAuthentication';
import Link from 'next/link';
import { currentDate, hoursUnixDate, monthToString } from '@/dates/date';
import JustificacionFaltaModal from '@/Modals/JustificacionFaltaModal';
import JustificacionFaltaMotivo from '@/Modals/JustificacionFaltaMotivo';
import { RiLoader4Line } from 'react-icons/ri';
import { attendanceState } from '@/utils/attendanceState';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin';

const AttendanceRegister = () => {
  const pdfRef = useRef(null)
  const { getUserData } = useAuthentication()
  const initialStateByFilter = { grade: "", section: "" }
  const [valuesByFilter, setValuesByFilter] = useState(initialStateByFilter)
  const { studentsByGradeAndSection, sections, grades, userData, justificacionFaltaModal, justificacionStudent, justificacionMotivoModal, loadingSearchStudents, studentsByGrade } = useGlobalContext()
  const { filterRegisterByGradeAndSection, showJustificaconFaltaModal, justificacionInfoByStudent, showJustificacionMotivo, filterRegisterByGrade } = useAttendanceRegister()
  const { getSections, getGrades } = UseRegisterStudents()
  const [gradeValue, setGradeValue] = useState(0)
  const [startDate, setStartDate] = useState(dayjs());
  const [dniStudent, setDniStudent] = useState("");
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  // const [minDate, setMinDate] = useState(dayjs(new Date().setDate(0)));
  const [attendance, setAttendance] = useState('registros')

  const onDownloadPdf = () => {
    const input: any = pdfRef.current
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('portrait', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = canvas.width
      const imageHeight = canvas.height
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
      const imgX = (pdfWidth - imageWidth * ratio) / 2
      const imgY = 5
      pdf.addImage(imgData, 'PNG', imgX, imgY, imageWidth * ratio, imageHeight * ratio)
      pdf.save(`codigos-qr.pdf`)

    })
  }
  const handleChangesValuesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValuesByFilter({
      ...valuesByFilter,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    //tendria que validar si existe el valor del grado y si tiene la propiedad de gotSection en true para acceder a la busqueda de los alumnos
    if (grades[Number(valuesByFilter.grade) - 1]?.gotSection === false && valuesByFilter.grade) {
      //tengo que llamar la funcion simple de los alumnos sin seccion solo grado
      console.log('estoy solo con grados')
      filterRegisterByGrade(valuesByFilter.grade, `${startDate.date()}`, monthToString(startDate.month()))
    }
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(valuesByFilter.grade, valuesByFilter.section, `${startDate.date()}`, attendance, monthToString(startDate.month()))
    } else {
      console.log('no se encontro registros')
    }

  }, [valuesByFilter.grade, valuesByFilter.section, startDate.date()])

  useEffect(() => {
    getUserData()
    if (userData) {
      getSections()
      getGrades()
    }
  }, [userData.name])

  const resultAttendance = (value: string, dni: string) => {
    if (value === "justificado") {
      return <span onClick={() => { justificacionInfoByStudent(dni, `${startDate.date()}`); showJustificacionMotivo(!justificacionMotivoModal) }}>{value}</span>
    } else if (value === "falto") {
      return (
        <>
          {value} <span onClick={() => { showJustificaconFaltaModal(!justificacionFaltaModal); setDniStudent(dni as string) }} className='p-1 hover:bg-orange-400 duration-300 text-slate-700 bg-yellow-300 w-[15px] h-[15px] flex justify-center items-center text-[10px] rounded-sm'>J</span>
        </>
      )
    } else {
      return <span className={`${attendanceState(value) ? "text-green-400" : "text-red-400"}`}>{value}</span>
    }
  }

  return (
    <PrivateRouteAdmin>

      <div className='relative p-2'>
        {justificacionMotivoModal ?
          <JustificacionFaltaMotivo justificacionStudent={justificacionStudent} />
          :
          null
        }
        {justificacionFaltaModal ?
          <JustificacionFaltaModal date={startDate.date()} dniStudent={dniStudent} />
          :
          null}
        <h1 className='text-xl my-5 font-semibold uppercase text-slate-600 text-center'>Registros de asistencias</h1>
        <div className='relative z-10 flex justify-end items-center mb-3'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
        <div className='flex gap-5 w-full my-3'>
          <select name="grade" onChange={handleChangesValuesSelect} className='w-full bg-white rounded-md p-3  shadow-md uppercase text-slate-400'>
            <option className='text-slate-500' value="">--SELECCIONAR GRADO--</option>
            {
              grades?.map((gr, index) => {
                return (
                  <option key={index} className='text-slate-500' value={gr.grade}>{gr.traditionalGrade}</option>
                )
              })
            }
          </select>

          {
            grades[Number(valuesByFilter.grade) - 1]?.gotSection ?

              <select name="section" onChange={handleChangesValuesSelect} className='w-full bg-white rounded-md p-3 shadow-md uppercase text-slate-400'>
                <option className='text-slate-500' value="">--SELECCIONAR SECCION--</option>
                {
                  sections?.map((gr, index) => {
                    return (
                      <option key={index} className='uppercase text-slate-500' value={gr.section}>{gr.section}</option>
                    )
                  })
                }
              </select>
              : null
          }

        </div>

        <div className='mt-5'>
          {
            loadingSearchStudents ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">buscando resultados...</p>
              </div>
              :
              null
          }
          <table className='w-full'>
            <thead className='bg-blue-100 border-b-2 border-gray-200 '>
              <tr className="text-slate-600 capitalize font-nunito ">
                <th className="  md:p-2 text-[12px]  w-[20px] text-center uppercase">#</th>
                <th className="py-3 md:p-2 pl-1 md:pl-2 text-[12px] text-center uppercase">dni</th>
                <th className="py-3 md:p-2 text-[12px] text-center uppercase">apellidos y nombres</th>
                <th className="py-3 md:p-2 text-[12px] text-center uppercase">ingreso</th>
                <th className="py-3 md:p-2 text-[12px] text-center uppercase">salida</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {
                studentsByGrade?.map((student, index) => {
                  return (
                    <tr key={index} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                      <td className='text-center text-[12px] px-3'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {index + 1}
                        </Link>

                      </td>
                      <td className='text-[12px] text-center'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {student.dni}
                        </Link>
                      </td>
                      <td className='uppercase text-[12px] text-center'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {student.lastname} {student.firstname}, {student.name}
                        </Link>
                      </td>
                      <td className={`${student.attendanceByDate === "justificado" ? "text-blue-600" : "text-slate-400"} flex  gap-1 justify-center  pt-3 text-[12px]`}>
                        {
                          resultAttendance(student.attendanceByDate as string, student.dni as string)
                        }
                      </td>
                      <td className='text-center text-[12px] text-blue-600'>{student.departureByDate}</td>
                    </tr>
                  )
                })
              }
              {
                studentsByGradeAndSection?.map((student, index) => {

                  return (

                    <tr key={index} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                      <td className='text-center text-[12px] px-3'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {index + 1}
                        </Link>

                      </td>
                      <td className='text-[12px] text-center'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {student.dni}
                        </Link>
                      </td>
                      <td className='uppercase text-[12px] text-center'>
                        <Link href={`/estudiantes/resumen-de-asistencia/${student.dni}`}>
                          {student.lastname} {student.name}
                        </Link>
                      </td>
                      <td className={`${student.attendanceByDate === "justificado" ? "text-blue-600" : "text-slate-400"} flex  gap-1 justify-center  pt-3 text-[12px]`}>
                        {
                          resultAttendance(student.attendanceByDate as string, student.dni as string)
                        }
                      </td>
                      <td className='text-center text-[12px] text-blue-600'>{student.departureByDate}</td>
                    </tr>
                  )
                })

              }
            </tbody>

          </table>
          {/* <div onClick={onDownloadPdf} className='p-3 bg-blue-400 text-white rounded-sm'>descargar pdf</div>
        <ul ref={pdfRef} className='m-auto grid grid-cols-7 gap-5 w-full p-5'>
          {
            studentsByGrade.length > 0 ?
              // <QRCode value="hey" />
              studentsByGrade?.map(student => {
                return (
                  <li className='w-auto'>
                    <div className='w-full mb-5'>
                      <p className='text-center text-lg font-semibold capitalize'>{student.name} {student.lastname} {student.firstname}</p>
                    </div>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={`${student.dni}`} />
                  </li>
                )
              })
              :
              null
          }

        </ul> */}
          {
            studentsByGradeAndSection.length > 0 || studentsByGrade.length > 0 ?
              null
              :
              <div className='text-slate-400 text-md w-full text-center mt-5'>No se encontro resultadoss</div>
          }
        </div>
      </div>
    </PrivateRouteAdmin>
  )
}

export default AttendanceRegister
AttendanceRegister.Auth = PrivateRoutes