'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useAuthentication from '@/features/hooks/useAuthentication'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useNavbarSearch from '@/features/hooks/useNavbarSearch'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import useDetailsStudents from '@/features/hooks/useDetailsStudent'

const ResumenConsultaEstudiantes = () => {
  const { getUserData } = useAuthentication()
  const searchParams = useSearchParams()
  const { studentData, resumeAttendanceStudent } = useGlobalContext()
  const { dataEstudianteConsulta } = useNavbarSearch()
  const { getDetailsofAttendanceConsultas } = useDetailsStudents()
  const paramMonth = searchParams.get('mes')
  const paramDni = searchParams.get('dni')
  const paramIdInstitution = searchParams.get('id')
  useEffect(() => {
    dataEstudianteConsulta(`${paramDni}`, `${paramIdInstitution}`)
    getDetailsofAttendanceConsultas(`${paramDni}`, `${paramMonth}`, `${paramIdInstitution}`)
  }, [paramMonth, paramDni, paramIdInstitution])
  return (
    <div className='p-3'>
      <div className='w-full'>
        <div className='m-auto w-[100%] md:w-[90%] '>
        </div>
        <div className='w-full m-auto hidden md:block'>

          {/* <div className='max-w-[1002px] m-auto flex justify-between'> */}
          <div className=' m-auto flex justify-between w-[100%] md:w-[90%] '>
            <h3 className='text-xl text-slate-500 uppercase text-left mb-5'>asistencia de <span className='font-semibold'>{studentData?.name} {studentData?.lastname} {studentData?.firstname}</span></h3>
            <div className='text-xl text-blue-500 capitalize'><span className='text-slate-400 mr-3'>Mes:</span>{paramMonth}</div>
          </div>
          <div className='m-auto flex w-[100%] md:w-[90%]  flex-wrap rounded-md overflow-hidden border-[1px] border-slate-300 shadow-md'>
            {resumeAttendanceStudent?.map(item => {
              return (
                <div key={item.date} className='text-slate-500 hover:bg-blue-50 cursor-pointer grow border-r-[1px] border-b-[1px] w-[200px] h-[130px] border-slate-300 p-1 bg-white'>
                  <div className='rounded-full w-[30px] h-[30px] bg-yellow-300 flex justify-center items-center'>
                    <div className='text-center m-auto'>
                      {item.date}
                    </div>
                  </div>
                  <div className="capitalize font-semibold">{item.day}</div>
                  <div className='text-[12px]'>Ing.: {item.attendance}</div>
                  <div className='text-[12px]'>Sal.: {item.departure}</div>
                </div>
              )
            })}
          </div>
        </div>
        <h3 className='text-xl block md:hidden text-slate-500 uppercase text-left mb-5'>asistencia de <span className='font-semibold'>{studentData?.name} {studentData?.lastname}</span></h3>
        <table className='w-[100%] md:w-[90%] shadow-md mt-5 m-auto'>
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
                  <tr key={item?.date} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer w-full'>
                    <td className='text-sm text-center'>{item?.date}</td>
                    <td className='uppercase text-sm text-center'>{item?.day}</td>
                    <td className='text-center text-sm'>{item?.attendance}</td>
                    <td className='text-center'>{item?.departure}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {
          resumeAttendanceStudent.length > 0 ?
            null
            :
            <><p className='text-center p-5 text-slate-400'>no existe registros de este mes</p></>
        }
      </div>
    </div>
  )
}

export default ResumenConsultaEstudiantes