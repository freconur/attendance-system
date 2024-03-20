import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import useAuthentication from '@/features/hooks/useAuthentication'
import { validateRol } from '@/utils/validateRolEmployee'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { RiLoader4Line } from 'react-icons/ri'

const IngresoSalidaEmployee = () => {
  const initialValueCode = { employee: "" }
  const focusRef = useRef<HTMLInputElement>(null)
  const { attendanceEmployee, getEmployeeAndAttendance } = useAttendanceEmployee()
  const [codeEmployee, setCodeEmployee] = useState(initialValueCode)
  const { getUserData } = useAuthentication()
  const { userData, employee, loaderGetEmployee } = useGlobalContext()


  useEffect(() => {
    getUserData()
  }, [userData.name])
  const onChangeCodeEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeEmployee({
      ...codeEmployee,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (codeEmployee.employee.length === 8) {
      console.log("estamos entrando en el bucle de 8 digitos de largo")
      getEmployeeAndAttendance(codeEmployee.employee)
      setCodeEmployee(initialValueCode)
    }
  }, [codeEmployee.employee])

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [])
  return (
    <div className='p-2'>
      <h2 className='text-xl text-slate-400 text-center uppercase '>ingreso y salida de empleados</h2>
      <div className='w-full p-1 mt-2'>
        <input
          onChange={onChangeCodeEmployee}
          type="text"
          value={codeEmployee.employee}
          name="employee"
          className='w-full rounded-md border-[1px] p-3 shadow-md focus:border-sky-500 focus:ring-[0.5] focus:ring-sky-500 focus:outline-none'
          placeholder='codigo de empleado'
          ref={focusRef}
        />
      </div>

      {
        loaderGetEmployee ?

          <div className="flex w-full mt-5 items-center m-auto justify-center">
            <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
            <p className="text-slate-500">buscando resultados...</p>
          </div>
          : null
      }
      {employee?.dni ?
        <div className='border-[1px] shadow-md p-3 rounded-md w-[60%] m-auto bg-white'>
          <div className='flex gap-10 bg-white p-2 rounded-md'>
            <div className='w-[200px]'>
              {employee.pictureProfile &&
                <div className="overflow-hidden h-[200px] w-[200px] rounded-md">
                  <Image
                    alt="foto de perfil"
                    src={`${employee.pictureProfile}`}
                    width={200}
                    height={200}
                  />
                </div>
              }
            </div>
            <div className='grid flex-col gap-5 content-center h-full'>
              <p className='text-slate-400'>DNI: <span className='uppercase font-semibold text-slate-500'> {employee.dni}</span></p>
              <p className='text-slate-400'>NOMBRE: <span className='uppercase font-semibold text-slate-500'> {employee.name}</span></p>
              <p className='text-slate-400'>APELLIDOS: <span className='uppercase font-semibold text-slate-500'> {employee.firstname} {employee.lastname}</span></p>
              <p className='text-slate-400'>CARGO: <span className='uppercase font-semibold text-slate-500'> {validateRol(employee?.rol)}</span></p>
            </div>
          </div>
        </div>
        :
        <div className='w-full flex justify-center m-auto'>
          <p className='m-auto text-slate-500 mt-5'>
            no se encontro resultados
          </p>
        </div>
      }
    </div>
  )
}

export default IngresoSalidaEmployee
IngresoSalidaEmployee.Auth = PrivateRoutes