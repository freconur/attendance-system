"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import useTareas from '@/features/hooks/useTareas'
import useAuthentication from '@/features/hooks/useAuthentication'
import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import Image from 'next/image'
const Tareas = () => {

  const searchParams = useSearchParams()
  const { verTareas } = useTareas()
  const { getAllTareas } = useGlobalContext()
  const { getUserData } = useAuthentication()
  const paramGrade = searchParams.get('grado')
  const paramDate = searchParams.get('fecha')
  const paramMonth = searchParams.get('mes')
  const paramYear = searchParams.get('ano')
  const [grade, setGrade] = useState(paramGrade)


  useEffect(() => {
    getUserData()
  }, [])
  useEffect(() => {
    if (paramGrade && paramDate && paramMonth && paramYear) {
      verTareas(paramGrade, paramDate, paramMonth, paramYear)

    }
  }, [paramYear, paramMonth, paramDate, paramGrade])
  return (
    <div className='m-auto flex justify-center'>
      <div className='w-[1280px] pt-10' >
      {/* <div className='w-[1280px] bg-blue-50 pt-10' > */}
        {getAllTareas ?
          getAllTareas.map((tarea) => {
            return (
              <div className='mb-10 mx-3'>
                <h2 className='mb-3 uppercase text-blue-600 font-bold text-2xl underline'>{tarea.id}</h2>
                <div className='text-slate-600 font-semibold text-xl mb-5'>{tarea.observaciones}</div>
                <div className='grid justify-center items-center m-auto gap-3'>
                  {tarea.pictures?.map((picture, index) => {
                    return (
                      <Image
                        src={picture.url}
                        // src={require(`assets/slider-web/biombos.jpg`).default}
                        alt={index.toString()}
                        width={1000}
                        height={200}
                        // priority 
                        // fill={true}
                        // style={{objectFit: "contain"}}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      // style={{maxWidth:'100%', height:'auto'}}
                      />
                    )
                  })}
                </div>
                {/* <div>{tarea.fechaDeEntrega}</div> */}
              </div>
            )
          })
          : null
        }
      </div>


    </div>
  )
}

export default Tareas
// Tareas.Auth = PrivateRoutes