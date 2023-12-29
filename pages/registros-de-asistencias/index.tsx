import { dateConvertObject, hoursUnixDate } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { attendanceState } from '@/attendanceState';

const AttendanceRegister = () => {
  const initialStateByFilter = { grade: "", section: "" }
  const [valuesByFilter, setValuesByFilter] = useState(initialStateByFilter)
  const { studentsByGradeAndSection, sections, grades } = useGlobalContext()
  const { filterRegisterByGradeAndSection } = useAttendanceRegister()
  const { getSections, getGrades } = UseRegisterStudents()
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setMonth(7)));

  const handleChangesValuesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValuesByFilter({
      ...valuesByFilter,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(valuesByFilter.grade, valuesByFilter.section,`${startDate.date()}`)
    } else {
      console.log('no se encontro registros')
    }
  }, [valuesByFilter.grade, valuesByFilter.section, startDate.date()])
  useEffect(() => {
    getSections()
    getGrades()
  }, [])
  console.log('studentsByGradeAndSection', studentsByGradeAndSection)
  console.log('startDate', startDate.date())
  return (
    <div className='p-2'>
      <h1 className='text-2xl font-semibold uppercase text-slate-600 text-center'>Registros de asistencias</h1>
      <div className='flex gap-5 w-full my-3'>
        <select name="grade" onChange={handleChangesValuesSelect} className='w-full p-3 shadow-md uppercase text-slate-500'>
          <option className='text-slate-500' value="">--SELECCIONAR GRADO--</option>
          {
            grades?.map((gr,index) => {
              return (
                <option className='text-slate-500' key={index} value={gr.grade}>{gr.traditionalGrade}</option>
              )
            })
          }
        </select>
        <select name="section" onChange={handleChangesValuesSelect} className='w-full p-3 shadow-md uppercase text-slate-500'>
          <option className='text-slate-500' value="">--SELECCIONAR SECCION--</option>
          {
            sections?.map((gr, index) => {
              return (
                <option className='uppercase text-slate-500' key={index} value={gr.section}>{gr.section}</option>
              )
            })
          }
        </select>
      </div>
      <div className='flex justify-end items-center mb-3'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
      <div>
        <ul className='grid gap-2 w-full h-full  place-content-stretch'>
          {
          studentsByGradeAndSection?.length > 0
          ?
          
            studentsByGradeAndSection?.map((student,index) => {
              return (
                <li key={student.dni} className=' flex  border-[1px]  bg-white shadow-md w-full rounded-lg overflow-hidden'>
                  <div className='text-blue-50 bg-blue-500 w-[30px] grid place-content-center text-xl font-semibold'>{index + 1}</div>
                  <div className='min-w-[100px] min-h-[100px] '>
                    {student.pictureProfile ?
                      <Image alt="foto de perfil de estudiante"  height="90" width="90" src={student.pictureProfile} />
                      : <span>no image</span>}
                  </div>
                  <div className='grid gap-3'>
                    <p className='text-slate-500'>ID: {student.dni}</p>
                    <p className='uppercase text-slate-700'>{student.name} {student.lastname}</p>
                    {/* {
                      student?.currentAttendance ?
                        <p>ingreso: {hoursUnixDate(student?.currentAttendance)}</p>
                        : null
                    } */}
                    <p className={`${attendanceState(student?.attendanceByDate) === true ? "text-green-600" : "text-red-600"}`} >Hora de ingreso: {student.attendanceByDate}</p>
                  </div>
                </li>
              )
            })
          
          :
          <div className="grid place-content-center text-2xl text-slate-400">sin resultados</div>
          }
          
        </ul>
      </div>
    </div>
  )
}

export default AttendanceRegister