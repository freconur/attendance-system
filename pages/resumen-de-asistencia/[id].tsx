import { EnableMonths, currentMonth } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useDetailsStudents from '@/features/hooks/useDetailsStudent'
import useNavbarSearch from '@/features/hooks/useNavbarSearch'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ResumenAsistencia = () => {
  const router = useRouter()
  const [month, setMonth] = useState({ month: currentMonth() })
  const { searchStudent } = useNavbarSearch()
  const { getDetailsofAttendance } = useDetailsStudents()
  const { resumeAttendanceStudent, studentData } = useGlobalContext()

  const handleChangeValueMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth({
      ...month,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    searchStudent(`${router.query.id}`)
    getDetailsofAttendance(`${router.query.id}`, month.month)
  }, [month, router.query.id])

  return (
    <div className='p-5'>
      <h3 className='text-2xl text-slate-500 font-semibold uppercase text-center my-5'>Resumen de asistencia de {studentData.name} {studentData.lastname}</h3>

      <div className='flex justify-end'>
        <select className='p-3 rounded-md w-[200px] mb-5 text-slate-500 uppercase outline-none' onChange={handleChangeValueMonth} name="month" >
          {
            EnableMonths().map((month, index) => {
              return (
                <option key={index} value={month}>{month}</option>
              )
            })
          }
        </select>
      </div>
      <table className='w-full shadow-md'>
        <thead className='bg-blue-100 border-b-2 border-gray-200 '>
          <tr className="text-slate-600 capitalize font-nunito ">
            <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-center uppercase">fecha</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">dia</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">ingreso</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">salida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {
            resumeAttendanceStudent?.map((item) => {
              return (
                <tr key={item.date} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer w-full'>
                  <td className='text-sm text-center'>{item.date}</td>
                  <td className='uppercase text-sm text-center'>{item.day}</td>
                  <td className='text-center text-sm'>{item.attendance}</td>
                  <td></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ResumenAsistencia