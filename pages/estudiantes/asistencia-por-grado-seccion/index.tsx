import ConfirmationSaveAttendanceByGradeSection from '@/Modals/ConfirmationSaveAttendanceByGradeSection'
import { currentDate, currentMonth, currentYear } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister'
import useAuthentication from '@/features/hooks/useAuthentication'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { RiLoader4Line } from 'react-icons/ri'

const AsistenciaGradoseccion = () => {
  const { getUserData } = useAuthentication()
  const initialStateByFilter = { grade: "", section: "" }
  const initialStateByAttendance = { presente: false, tadanza: false, falta: true }
  const [valuesByFilter, setValuesByFilter] = useState(initialStateByFilter)
  const [testing, setTesting] = useState(initialStateByAttendance)
  const { getSections, getGrades } = UseRegisterStudents()
  const { userData, grades, sections, studentsForAttendance, confirmationSaveAttendanceByGradeSectionModal, loadingSearchStudents } = useGlobalContext()
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023) && new Date().setDate(0)));
  const { filterRegisterByGradeAndSection, changeAttendanceFromStudent, saveChangesFromAttendanceByGradeSecction, saveAttendance } = useAttendanceRegister()
  const [attendance, setAttendance] = useState('asistencia-grado')


  // useEffect(() => {
  //   const handleChangeAttendanceState = (value: string) => {
  //     changeAttendanceFromStudent(`${student.dni}`, studentsForAttendance, `falta`)
  //   }
  // }, [])
  useEffect(() => {
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(valuesByFilter.grade, valuesByFilter.section, `${startDate.date()}`, attendance)
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

  const handleChangesValuesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValuesByFilter({
      ...valuesByFilter,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveAttendance = () => {
    saveAttendance(confirmationSaveAttendanceByGradeSectionModal)
  }
  console.log('studentsForAttendance', studentsForAttendance)
  return (
    <div className='p-2'>
      {confirmationSaveAttendanceByGradeSectionModal ? <ConfirmationSaveAttendanceByGradeSection /> : null}

      <h1 className='text-xl my-5 font-semibold uppercase text-slate-600 text-center'>Tomar asistencias por grado</h1>
      <div className='relative z-10 flex justify-between items-center mb-3'>
        <p className='border-[1px] border-slate-200 p-3 rounded-md  text-slate-400 uppercase'>{currentDate()} / {currentMonth()} / {currentYear()}</p>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
        </LocalizationProvider> */}
        {/* <div onClick={() => saveChangesFromAttendanceByGradeSecction(studentsForAttendance)} className='bg-blue-400 text-white rounded-sm shadow-md p-3 cursor-pointer hover:bg-blue-300 duration-300'>Guardar asistencia</div> */}
        <button disabled={studentsForAttendance.length > 0 ? false : true } onClick={handleSaveAttendance} className={` text-white rounded-sm shadow-md p-3 cursor-pointer  duration-300 ${studentsForAttendance.length > 0 ? "bg-blue-400 hover:bg-blue-300" : "bg-gray-200 hover:bg-gray-200"}`}>Guardar asistencia</button>
      </div>
      <div className='flex gap-5 w-full my-3'>
        <select name="grade" onChange={handleChangesValuesSelect} className='w-full p-3 shadow-md uppercase bg-white rounded-md text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none'>
          <option className='text-slate-500' value="">--SELECCIONAR GRADO--</option>
          {
            grades?.map((gr, index) => {
              return (
                <option key={index} className='text-slate-500' value={gr.grade}>{gr.traditionalGrade}</option>
              )
            })
          }
        </select>
        <select name="section" onChange={handleChangesValuesSelect} className='w-full p-3 shadow-md uppercase bg-white rounded-md text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none '>
          <option className='text-slate-500' value="">--SELECCIONAR SECCION--</option>
          {
            sections?.map((gr, index) => {
              return (
                <option key={index} className='uppercase text-slate-500' value={gr.section}>{gr.section}</option>
              )
            })
          }
        </select>
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
              <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                <span className='block xm:hidden'>P</span>
                <span className='hidden xm:block'>Presente</span>
              </th>
              <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                <span className='block xm:hidden'>T</span>
                <span className='hidden xm:block'>Tardanza</span>
              </th>
              <th className="py-3 md:p-2 text-[12px] text-center uppercase">
                <span className='block xm:hidden'>F</span>
                <span className='hidden xm:block'>Falta</span>
              </th>
              {/* <th className="py-3 md:p-2 text-[12px] text-center uppercase">salida</th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {
              studentsForAttendance?.map((student, index) => {

                return (

                  <tr key={index} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                    <td className='text-center text-[12px] px-3'>
                      {index + 1}

                    </td>
                    <td className='text-[12px] text-center'>
                      {student.dni}
                    </td>
                    <td className='uppercase text-[12px] text-center'>
                      {student.lastname} {student.name}
                    </td>
                    <td className={`${student.attendanceByDate === "justificado" ? "text-blue-600" : "text-slate-400"} flex  gap-1 justify-center  pt-3 text-[12px]`}>
                      {/* {
                        resultAttendance(student.attendanceByDate as string, student.dni as string)
                      } */}
                      {/* <div className='border-[1px] border-green-400 bg-green-200 rounded-full w-[20px] h-[20px] flex justify-center overflow-hidden items-center'>

                      </div> */}
                      <input onChange={() => changeAttendanceFromStudent(`${student.dni}`, studentsForAttendance, `presente`)} checked={student.presente ? true : false} name="presente" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2 accent-green-300  focus:accent-blue-500' />
                    </td>
                    <td className='text-center pt-3 '>
                      <input onChange={() => changeAttendanceFromStudent(`${student.dni}`, studentsForAttendance, `tardanza`)} checked={student.tardanza ? true : false} name="tardanza" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2 accent-yellow-300 focus:accent-blue-500' />
                    </td>
                    <td className='text-center pt-3 '>
                      <input onChange={() => changeAttendanceFromStudent(`${student.dni}`, studentsForAttendance, `falta`)} checked={student.falta ? true : false} name="falta" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2 accent-red-400 focus:accent-blue-500' />
                    </td>
                  </tr>
                )
              })

            }
          </tbody>

        </table>
        {
          loadingSearchStudents
            ? null
            :
            studentsForAttendance.length === 0 &&
            <div className='text-slate-400 text-md w-full text-center mt-5'>No se encontro resultados</div>
        }
      </div>
    </div>
  )
}

export default AsistenciaGradoseccion