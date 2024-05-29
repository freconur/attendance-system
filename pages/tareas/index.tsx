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
  }, [paramYear, paramYear, paramDate, paramGrade])
  return (
    <div className='m-auto flex justify-center'>
      <div className='w-[1280px] bg-green-200 pt-10' >
        {getAllTareas ?
          getAllTareas.map((tarea) => {
            return (
              <div>
                <h2>{tarea.id}</h2>
                <div>{tarea.observaciones}</div>
                {tarea.pictures?.map((picture, index) => {
                  return (
                    <Image
                      src={picture.url}
                      // src={require(`assets/slider-web/biombos.jpg`).default}
                      alt={index.toString()}
                      width={1000}
                      height={200}
                      // priority 
                      quality={100}
                      // style={{maxWidth:'100%', height:'auto'}}
                      />
                  )
                })}
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