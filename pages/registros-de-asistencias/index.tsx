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
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023) && new Date().setDate(0)));

  const handleChangesValuesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValuesByFilter({
      ...valuesByFilter,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (valuesByFilter.grade && valuesByFilter.section) {
      filterRegisterByGradeAndSection(valuesByFilter.grade, valuesByFilter.section, `${startDate.date()}`)
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
    <div className='relative p-2'>
      <h1 className='text-2xl my-5 font-semibold uppercase text-slate-600 text-center'>Registros de asistencias</h1>
      <div className='relative z-10 flex justify-end items-center mb-3'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
        </LocalizationProvider>
      </div>
      <div className='flex gap-5 w-full my-3'>
        <select name="grade" onChange={handleChangesValuesSelect} className='w-full p-3 shadow-md uppercase text-slate-500'>
          <option className='text-slate-500' value="">--SELECCIONAR GRADO--</option>
          {
            grades?.map((gr, index) => {
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

      <div className='mt-5'>
        <table className='w-full'>
          <thead className='bg-blue-100 border-b-2 border-gray-200 '>
            <tr className="text-slate-600 capitalize font-nunito ">
              <th className="  md:p-2 text-sm  w-[20px] text-center uppercase">#</th>
              <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-center uppercase">dni</th>
              <th className="py-3 md:p-2 text-sm text-center uppercase">apellidos y nombres</th>
              <th className="py-3 md:p-2 text-sm text-center uppercase">ingreso</th>
              <th className="py-3 md:p-2 text-sm text-center uppercase">salida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {
              studentsByGradeAndSection?.map((student,index) => {
                return (
                  <tr key={student.dni} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                    <td className='text-center text-sm px-3'>{index + 1}</td>
                    <td className='text-sm text-center'>{student.dni}</td>
                    <td className='uppercase text-sm text-center'>{student.lastname} {student.name}</td>
                    <td className='text-center text-sm'>{student.attendanceByDate}</td>
                    <td></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceRegister