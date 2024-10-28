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
  const {  verCuadernoControl} = useCuadernoControl()
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
    <div>
      <h3>cuaderno de control</h3>
    {
      getAllCuadernoControl 
      ?
      <div>aqui estan los comunicados del dias de hoy</div>
      : null
    }
    </div>
  )
}

export default CuadernoControl