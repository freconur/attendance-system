import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAttendance } from '@/features/hooks/useAttendance'
import useAuthentication from '@/features/hooks/useAuthentication'
import useDetailsStudents from '@/features/hooks/useDetailsStudent'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { RiLoader4Line } from 'react-icons/ri'

const AsistenciaTaller = () => {
  const initialValue = { code: "" }
  const focusRef = useRef<HTMLInputElement>(null)
  const [codeStudent, setCodeStudent] = useState(initialValue)
  const { attendanceArrivalStudentsTalleres } = useAttendance()
  const { getUserData } = useAuthentication()
  const { studentTaller, studentTallerLoader } = useGlobalContext()
  const onChangeCodeStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeStudent({
      ...codeStudent,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (codeStudent.code.length === 8) {
      attendanceArrivalStudentsTalleres(codeStudent.code)
      setCodeStudent(initialValue)
    }
  }, [codeStudent.code])
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [])

  return (
    <div className='p-2'>
      <h1 className='uppercase text-slate-500 text-xl font-semibold text-center'>asistencia talleres</h1>

      <div className='w-full p-1 mt-2'>
        <input type="text"
          onChange={onChangeCodeStudent}
          value={codeStudent.code}
          name="code"
          className='w-full rounded-md border-[1px] p-3 shadow-md focus:border-sky-500 focus:ring-[0.5] focus:ring-sky-500 focus:outline-none'
          placeholder='codigo de estudiante'
          ref={focusRef}
        />

        {
          studentTallerLoader ?
            <div className="flex w-full mt-5 items-center m-auto justify-center">
              <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
              <p className="text-slate-500">buscando resultados...</p>
            </div>
            : null
        }
        {studentTaller?.dni ?
          <div className='w-full xs:w-[520px] tablet:w-[660px] m-auto'>
            <div className='grid grid-cols-2 gap-5 mt-5 bg-white p-2 rounded-md'>
              {/* <div className='w-[50%]'> */}
              {studentTaller.pictureProfile ?
                <div className="overflow-hidden  rounded-md">
                  <Image
                    alt="foto de perfil"
                    src={`${studentTaller.pictureProfile}`}
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
                  <span className='uppercase font-semibold text-slate-500'> {studentTaller.dni}</span>
                  <p className='text-slate-400'>NOMBRE: </p>
                  <span className='uppercase font-semibold text-slate-500'> {studentTaller.name}</span>
                  <p className='text-slate-400'>APELLIDOS: </p>
                  <span className='uppercase font-semibold text-slate-500'>{studentTaller.lastname} {studentTaller.firstname}</span>
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
    </div>
  )
}


export default AsistenciaTaller
AsistenciaTaller.Auth = PrivateRoutes