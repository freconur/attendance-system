import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import useAuthentication from '@/features/hooks/useAuthentication'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PrivateRoutes from '@/components/layouts/PrivateRoutes';
import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin';

const AsistenciaEmpleados = () => {
  const initialValueProfessor = { rol: "" }
  const [valueFilter, setValueFilter] = useState(initialValueProfessor)
  const { getUserData } = useAuthentication()
  const [startDate, setStartDate] = useState(dayjs())
  const { userData } = useGlobalContext()
  const { typesEmployee, employees } = useGlobalContext()
  const { getTypeEmployee, getEmployees } = useAttendanceEmployee()
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023) && new Date().setDate(0)));
  useEffect(() => {
    if (userData) {
      getTypeEmployee()
    }
  }, [userData.dni])

  useEffect(() => {
    if (valueFilter.rol) {
      //invoco a la funcion que hara la peticion de la lista de profesores de la institucion
      getEmployees(valueFilter.rol, `${startDate.date()}`)
    }
  }, [valueFilter.rol, startDate.date()])


  const onChangeValueFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueFilter({
      ...valueFilter,
      [e.target.name]: e.target.value
    })
  }
  console.log('employees', employees)
  return (

    <div className='p-5'>
      <h2 className='text-center text-xl text-slate-500 font-semibold uppercase'>asistencia de personal</h2>

      <div className='relative z-10 flex justify-end items-center mb-3'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
        </LocalizationProvider>
      </div>
      <button className='p-2 bg-green-500 rounded-md font-semibold drop-shadow-lg text-white'>enviar cuentas</button>
      <div className='mt-3'>
        <h3 className='text-slate-500 mb-3'>Filtrar por:</h3>
        <form className='flex gap-2'>
          <select onChange={onChangeValueFilter} name="rol" className='uppercase text-slate-400 rounded-md w-full shadow-md bg-white p-2 outline-none border-blue-400 border-[1px] ' id="">
            <option value="">--seleccionar--</option>
            {
              typesEmployee?.map((item, index) => {
                return (
                  <option key={index} value={item.code}>{item.name}</option>

                )
              })
            }
          </select>
          {/* <input type="text" className='w-full rounded-sm p-2 outline-none border-blue-400 border-[1px] '/>
          <input type="text" className='w-full rounded-sm p-2 outline-green-400 border-blue-400 border-[1px] '/> */}
        </form>

        <div className='mt-5'>
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
                employees?.map((emp, index) => {

                  return (

                    <tr key={index} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                      <td className='text-center text-[12px] px-3'>
                        <Link href={`/administracion/empleados/resumen-de-asistencia/${emp.dni}`}>
                          {index + 1}
                        </Link>

                      </td>
                      <td className='text-[12px] text-center'>
                        <Link href={`/administracion/empleados/resumen-de-asistencia/${emp.dni}`}>
                          {emp.dni}
                        </Link>
                      </td>
                      <td className='uppercase text-[12px] text-center'>
                        <Link href={`/administracion/empleados/resumen-de-asistencia/${emp.dni}`}>
                          {emp.lastname} {emp.firstname} {emp.name}
                        </Link>
                      </td>
                      <td className="text-center">{emp.attendanceByDate}</td>
                      <td className="text-center">{emp.departureByDate}</td>
                    </tr>
                  )
                })

              }
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default AsistenciaEmpleados
AsistenciaEmpleados.Auth = PrivateRouteAdmin