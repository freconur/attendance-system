import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import FormularioTarea from '@/components/tareas/formularioTarea'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import React, { useEffect } from 'react'

const Tareas = () => {
  // const { registerNewStudent, getSections, getGrades, sendPictureProfile } = UseRegisterStudents()
  // const { sections, grades, pictureProfileUrl, userData } = useGlobalContext()
  // const { getUserData } = useAuthentication()
  // useEffect(() => {
  //   getUserData()
  //   if (userData) {
  //     getGrades()
  //   }
  // }, [userData.name])
  // console.log('userData1',userData)
  // console.log('grades1',grades)
  return (
    <div className='p-2 m-auto'>
      <div className='max-w-[1280px] m-auto '>
        <h1 className='text-xl font-semibold uppercase text-slate-500 text-center'>tareas</h1>
        <FormularioTarea />
      </div>
    </div>
  )
}

export default Tareas
Tareas.Auth = PrivateRoutes