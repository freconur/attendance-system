import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import { app } from '@/firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrivateRouteAulaVirtual = ({ children }: Props) => {

  const router = useRouter()
  const { getUserData } = useAuthentication()
  const { validateUserAulavirtual } = useGlobalContext()

  // useEffect(() => {
  //   if(validateUserAulavirtual === true) {
  //     router.push('/aula-virtual?dni=47163636')
  //   }
    
  // }, [validateUserAulavirtual]);
  console.log('estoy en ruta privada')
  return (
    <>{children}</>
  )
}

export default PrivateRouteAulaVirtual