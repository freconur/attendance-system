import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import { app } from '@/firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrivateRouteProfesores = ({ children }: Props) => {

  const router = useRouter()
  const { getUserData } = useAuthentication()
  const { userData } = useGlobalContext()
  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData()
      }else {
        router.push('/login');
      }
    });
  },[])

  useEffect(() => {
    if (userData) {
      if(userData.rol !== undefined) {
        if (Number(userData?.rol) !== 1) {
            router.push('/login')
        }
      }
    }
    // else {
    //   router.push('/login')
    // }
  }, [userData.dni]);
  // console.log('user data', userData)
  return (
    <>{children}</>
  )
}

export default PrivateRouteProfesores