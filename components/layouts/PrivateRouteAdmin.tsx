import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import { app } from '@/firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrivateRouteAdmin = ({ children }: Props) => {

  const router = useRouter()
  const auth = getAuth(app)
  const { getUserData } = useAuthentication()
  const { userData } = useGlobalContext()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData()
      }else {
        router.push('/login');
      }
    });
  }, [])

  useEffect(() => {
    console.log('userData de administrador', userData)
    if (userData.dni) {
      if (userData.rol !== undefined) {
        if (Number(userData?.rol) !== 4) {
          router.push('/login')
        }
      }
    } 
    // else if (!userData) {
    //   router.push('/login')
    // }
  }, [userData.dni]);
  return (
    <>{children}</>
  )
}

export default PrivateRouteAdmin