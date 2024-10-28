import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import { app } from '@/firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrivateRouteUser = ({ children }: Props) => {


  const router = useRouter()
  const auth = getAuth(app)
  const { getUserData } = useAuthentication()
  const { userData } = useGlobalContext()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData()
      } else {
        router.push('/login');
      }
    });
  }, [])

  useEffect(() => {
    if (userData.rol) {
      if (userData.rol === undefined) {
        router.push('/login')
      }
    }
  }, [userData.rol])
  return (
    <div>{children}</div>
  )
}

export default PrivateRouteUser