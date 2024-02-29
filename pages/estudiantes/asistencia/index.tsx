'use client'
import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAttendance } from '@/features/hooks/useAttendance'
import useAuthentication from '@/features/hooks/useAuthentication'
import { convertGrade } from '@/utils/validateGrade'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Asistencia = () => {
  const initialState = { studentCode: "" }
  const { getUserData } = useAuthentication()
  const [studenCode, setStudenCode] = useState(initialState)
  const { getStudentData, studentArrivalTime } = useAttendance()
  const { studentsData, userData } = useGlobalContext()
  const focusRef = useRef<HTMLInputElement>(null)
  const onChangeStudentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudenCode({
      ...studenCode,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  },[])
  useEffect(() => {
    if (studenCode.studentCode.length === 8) {
      getStudentData(studenCode.studentCode, studentsData)
      setStudenCode(initialState)
    }
  }, [studenCode.studentCode])

  useEffect(() => {
    getUserData()

  }, [])
  return (
    <div className='p-2'>
      <div>
        <h1 className='text-slate-600 uppercase font-semibold text-2xl my-5 text-center'>tomar asistencia</h1>


        <div className='w-full'>
          <div className='w-full'>
            <div className='text-slate-600 text-sm uppercase mb-2'>codigo de estudiante:</div>
            <input
              ref={focusRef}
              value={studenCode.studentCode}
              onChange={onChangeStudentCode}
              name="studentCode"
              type="text"
              className='w-full p-3 outline-none shadow-md rounded-md'
              placeholder='escanea o digita el codigo' />
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <ul className='w-full xs:w-[520px] tablet:w-[660px]'>
          {studentsData?.map((student, index) => {
            return (
              <li key={index} className='flex gap-10 mt-5 bg-white p-2 rounded-md'>
                <div className='w-[200px]'>
                  {student.pictureProfile &&
                    <div className="overflow-hidden h-[200px] w-[200px] rounded-md">
                      <Image
                        alt="foto de perfil"
                        src={`${student.pictureProfile}`}
                        width={200}
                        height={200}
                      />
                    </div>
                  }
                </div>
                <div className='grid flex-col gap-5 content-between h-full'>
                  <p className='text-slate-400'>DNI: <span className='uppercase font-semibold text-slate-500'> {student.dni}</span></p>
                  <p className='text-slate-400'>NOMBRE: <span className='uppercase font-semibold text-slate-500'> {student.name}</span></p>
                  <p className='text-slate-400'>APELLIDOS: <span className='uppercase font-semibold text-slate-500'> {student.lastname}</span></p>
                  <p className='text-slate-400'>GRADO: <span className='uppercase font-semibold text-slate-500'> {convertGrade(`${student.grade}`)}</span></p>
                  <p className='text-slate-400'>SECCION: <span className='uppercase font-semibold text-slate-500'> {student.section}</span></p>

                </div>
              </li>
            )

          })}

        </ul>
      </div>
    </div>
  )
}

export default Asistencia
Asistencia.Auth = PrivateRoutes