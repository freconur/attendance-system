'use client'
import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAttendance } from '@/features/hooks/useAttendance'
import useAuthentication from '@/features/hooks/useAuthentication'
import { convertGrade } from '@/utils/validateGrade'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { RiLoader4Line } from 'react-icons/ri'
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import AttendanceEmployeeModal from '@/Modals/attendanceEmployeeModal'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import DepartureStudentModal from '@/Modals/departureStudentModal'
import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin'
const Asistencia = () => {
  const initialState = { studentCode: "" }
  const { getUserData } = useAuthentication()
  const [studenCode, setStudenCode] = useState(initialState)
  const { getStudentData, studentArrivalTime, activeDepartureManualModal, getAllStudents } = useAttendance()
  const { employeeModal } = useAttendanceEmployee()
  const { studentsData, userData, loadingGetStudents, activeEmployeeModal, showDepartureManualModal, allStudents } = useGlobalContext()
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
  }, [])
  useEffect(() => {
    if (studenCode.studentCode.length === 8) {
      getStudentData(studenCode.studentCode, studentsData)
      setStudenCode(initialState)
    }
  }, [studenCode.studentCode])

  useEffect(() => {
    getUserData()
    getAllStudents()
  }, [userData.dni])

  console.log('cargando')
  // console.log('userData', userData)
  // console.log('studentsData', studentsData)
  // console.log('allStudents', allStudents)
  return (
    <div className='p-2'>
      {/* <div className='flex xs:hidden justify-start'>
      </div> */}
      <div className='flex xs:hidden justify-between'>
        <div onClick={() => activeDepartureManualModal(showDepartureManualModal)} className='bg-red-400 text-white p-1 rounded-sm cursor-pointer'>
          <p className='text-white font-semibold uppercase'>sm</p>
        </div>
        <div onClick={() => employeeModal(activeEmployeeModal)} className='bg-blue-400 text-white p-1 rounded-sm cursor-pointer'>
          <FaUserTie className='text-lg' />
        </div>
      </div>
      {
        activeEmployeeModal ?
          <AttendanceEmployeeModal />
          : null
      }
      {
        showDepartureManualModal ?
          <DepartureStudentModal />
          : null
      }
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
              type="number"
              className='w-full p-3 outline-none shadow-md rounded-md'
              placeholder='escanea o digita el codigo' />
          </div>
        </div>
      </div>
      <>
        {loadingGetStudents ?
          <div className="flex w-full mt-5 items-center m-auto justify-center">
            <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
            <p className="text-slate-500">buscando resultados...</p>
          </div>
          :
          null
        }</>
      <div className='w-full flex justify-center items-center'>
        <ul className='w-full xs:w-[520px] tablet:w-[660px]'>
          {studentsData?.map((student, index) => {
            return (
              <li key={index} className='grid grid-cols-2 gap-5 mt-5 bg-white p-2 rounded-md'>
                {/* <div className='rounded-full shadow-md overflow-hidden w-[50%]'> */}
                {student?.pictureProfile ?
                  <div className="overflow-hidden rounded-md">
                    <Image
                      alt="foto de perfil"
                      src={`${student.pictureProfile}`}
                      // fill
                      width={350}
                      height={350}
                    />
                  </div>
                  :
                  <div className='bg-blue-100 p-3 rounded-sm  flex items-center justify-center'>
                    <FaUserAlt className='w-[50%] h-[50%] text-blue-200' />
                  </div>
                }
                {/* </div> */}
                {/* <div className='flex flex-col gap-2 content-between h-full'> */}
                <div className='flex items-center text-[10px] xsm:text-[12px] xm:text-[15px] md:text-[20px]'>
                  <div className=''>
                    <p className='text-slate-400'>DNI: </p>
                    <span className='uppercase font-semibold text-slate-500'> {student.dni}</span>
                    <p className='text-slate-400'>NOMBRE: </p>
                    <span className='uppercase font-semibold text-slate-500'> {student.name}</span>
                    <p className='text-slate-400'>APELLIDOS: </p>
                    <span className='uppercase font-semibold text-slate-500'> {student.lastname} {student.firstname}</span>
                    <p className='text-slate-400'>GRADO: </p>
                    <span className='uppercase font-semibold text-slate-500'> {convertGrade(`${student.grade}`)}</span>
                    {/* <p className='text-slate-400'>SECCION: </p>
                    <span className='uppercase font-semibold text-slate-500'> {student.section}</span> */}
                  </div>

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
Asistencia.Auth = PrivateRouteAdmin