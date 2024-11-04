'use client'
import useAuthentication from '@/features/hooks/useAuthentication'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCuadernoControl } from '@/features/hooks/useCuadernoControl'
import { useGlobalContext } from '@/features/context/GlobalContext'

const CuadernoControl = () => {

  //un cuaderno va a tener
  //fecha, mes, año, grado
  const { getUserData } = useAuthentication()
  const { verCuadernoControl } = useCuadernoControl()
  const { getAllCuadernoControl } = useGlobalContext()
  const searchParams = useSearchParams()
  const paramGrade = searchParams.get('grado')
  const paramDate = searchParams.get('fecha')
  const paramMonth = searchParams.get('mes')
  const paramYear = searchParams.get('ano')
  useEffect(() => {
    getUserData()
  }, [])
  useEffect(() => {
    if (paramGrade && paramDate && paramMonth && paramYear) {
      verCuadernoControl(paramGrade, paramDate, paramMonth, paramYear)

    }
  }, [paramYear, paramMonth, paramDate, paramGrade])
  console.log('getAllCuadernoControl', getAllCuadernoControl)
  return (
    <div className='m-auto flex justify-center'>
      <div className='w-[80%] pt-10' >

        <div className='text-xl flex justify-between'>
          <h3 className='uppercase text-slate-500 font-semibold'>cuaderno de control</h3>
          <p className='uppercase text-slate-500 font-semibold'>fecha: {paramDate?.padStart(2,"0")}/{paramMonth?.padStart(2,'0')}/{paramYear}</p>
        </div>
        <ul className='mt-3 px-3'>
        {
          getAllCuadernoControl
            ?
            getAllCuadernoControl.map((notification, index) => {
              return (
                <li key={index} className='my-3 border-b-[1px] pb-5'>

                  <h4 className='text-blue-600 text-lg font-semibold'>{index+1}- Asunto: {notification.subject}</h4>
                  <p className='text-slate-500'>Mensaje: {notification.message}</p>
                </li>
              )
            })
            : null
        }

        </ul>

      </div>
    </div>
  )
}

export default CuadernoControl