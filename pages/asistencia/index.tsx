'use client'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAttendance } from '@/features/hooks/useAttendance'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Asistencia = () => {
  const initialState = { studentCode: "" }
  const [studenCode, setStudenCode] = useState(initialState)
  const { getStudentData, studentArrivalTime } = useAttendance()
  const { studentsData,testing } = useGlobalContext()
  const onChangeStudentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudenCode({
      ...studenCode,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (studenCode.studentCode.length === 8) {
      getStudentData(studenCode.studentCode,studentsData)
      setStudenCode(initialState)
    }
  }, [studenCode.studentCode])

  console.log('testing', testing)
  return (
    <div className='p-2'>
      <div>
        <h1 className='text-slate-600 uppercase font-semibold text-2xl my-5 text-center'>tomar asistencia</h1>


        <div className='w-full'>
          <div className='w-full'>
            <div className='text-slate-600 text-sm uppercase mb-2'>codigo de estudiante:</div>
            <input
            value={studenCode.studentCode}
              onChange={onChangeStudentCode}
              name="studentCode"
              type="text"
              className='w-full p-3 outline-none shadow-md rounded-md'
              placeholder='escanea o digita el codigo' />
          </div>
        </div>
      </div>
      <ul>
        {studentsData?.map((student,index) => {
          return (
            <li key={index} className='flex gap-10 mt-5 bg-white p-2 rounded-md'>
              <div className='w-[200px]'>
                {student.pictureProfile &&
                  <Image
                    alt="foto de perfil"
                    src={`${student.pictureProfile}`}
                    width={200}
                    height={200}
                  />
                }
              </div>
              <div className='grid flex-col gap-5 content-between h-full'>
                <p className='text-slate-400'>DNI: <span className='uppercase font-semibold text-slate-500'> {student.dni}</span></p>
                <p className='text-slate-400'>NOMBRE: <span className='uppercase font-semibold text-slate-500'> {student.name}</span></p>
                <p className='text-slate-400'>APELLIDOS: <span className='uppercase font-semibold text-slate-500'> {student.lastname}</span></p>
                <p className='text-slate-400'>GRADO: <span className='uppercase font-semibold text-slate-500'> {student.grade}</span></p>
                <p className='text-slate-400'>SECCION: <span className='uppercase font-semibold text-slate-500'> {student.section}</span></p>

              </div>
            </li>
          )

        })}

      </ul>
    </div>
  )
}

export default Asistencia