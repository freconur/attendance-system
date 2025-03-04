import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Estudiante = () => {

  const router = useRouter()
const { validateUserAulaVirutal } = useAulaVirtual()
  useEffect(() => {
    if(router.query.dni && router.query.idInstitucion){
      const data = {
        dni:`${router.query.dni}`, 
        institucion:`${router.query.idInstitucion}`
      }
      validateUserAulaVirutal(data)
    }
  },[router.query.dni, router.query.idInstitucion])
  console.log("router.query.dni", router.query.dni)
  console.log("router.query.idInstitucion", router.query.idInstitucion)
  return (
    <div>Estudiante</div>
  )
}

export default Estudiante