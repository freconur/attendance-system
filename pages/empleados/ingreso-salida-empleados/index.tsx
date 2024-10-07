import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import useAuthentication from '@/features/hooks/useAuthentication'
import { validateRol } from '@/utils/validateRolEmployee'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { RiLoader4Line } from 'react-icons/ri'

const IngresoSalidaEmployee = () => {
  const initialValueCode = { employee: "" }
  const focusRef = useRef<HTMLInputElement>(null)
  const { attendanceEmployee, getEmployeeAndAttendance } = useAttendanceEmployee()
  const [codeEmployee, setCodeEmployee] = useState(initialValueCode)
  const { getUserData } = useAuthentication()
  const { userData, employee, loaderGetEmployee } = useGlobalContext()


  // useEffect(() => {
  //   getUserData()
  // }, [userData.name])
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
  console.log('employee', employee)
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
        <div className='w-full xs:w-[520px] tablet:w-[660px] m-auto'>
          <div className='grid grid-cols-2 gap-5 mt-5 bg-white p-2 rounded-md'>
            {/* <div className='w-[50%]'> */}
              {employee.pictureProfile ?
                <div className="overflow-hidden  rounded-md">
                  <Image
                    alt="foto de perfil"
                    src={`${employee.pictureProfile}`}
                    width={350}
                    height={350}
                  />
                </div>
                :
                <div className='bg-blue-100 p-3 rounded-sm  flex items-center justify-center w-full'>
                  <FaUserAlt className='w-[40%] h-[100px] text-blue-200' />
                </div>
              }
            {/* </div> */}
            <div className='flex items-center text-[10px] xsm:text-[12px] xm:text-[15px] md:text-[20px]'>
              <div>
                <p className='text-slate-400'>DNI: </p>
                <span className='uppercase font-semibold text-slate-500'> {employee.dni}</span>
                <p className='text-slate-400'>NOMBRE: </p>
                <span className='uppercase font-semibold text-slate-500'> {employee.name}</span>
                <p className='text-slate-400'>APELLIDOS: </p>
                <span className='uppercase font-semibold text-slate-500'>{employee.lastname} {employee.firstname}</span>
                <p className='text-slate-400'>CARGO: </p>
                <span className='uppercase font-semibold text-slate-500'> {validateRol(employee?.rol)}</span>
                <p className='text-slate-400'>HORA: </p>
                <span className='uppercase font-semibold text-slate-500'> {employee?.currentlyHour}</span>

              </div>

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