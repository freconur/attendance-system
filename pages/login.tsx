import React, { useEffect, useState } from 'react'
import useAuthentication from '@/features/hooks/useAuthentication'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/firebase/firebaseConfig'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { RiLoader4Line } from 'react-icons/ri'
import { validateRol } from '@/utils/validateRolEmployee'
import { useNewUser } from '@/features/hooks/useNewUser'
import NewUserModal from '@/Modals/newUserModal'
import Image from 'next/image'
import image from '../assets/login-main.jpg'
const Login = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const { loadingAccount, warningAccount, userData, showNewUserModal } = useGlobalContext()
  const { signIn } = useAuthentication()
  const initialValue = { email: "", password: "" }
  const [formValue, setFormValue] = useState(initialValue)
  const { showNewUserModalValue } = useNewUser()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (validateRol(Number(userData.rol)) === "profesor") {
          router.push('/profesores/aula-virtual')
        }
        if (validateRol(Number(userData.rol)) === "administracion") {
          router.push('/mi-cuenta');
        }
      }
    })
  }, [userData.rol])
  const handleValueUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn(formValue)
  }
  return (
    <div>
      <div className='top-0 bottom-0 rigth-0 left-0 bg-cyan-400 z-[15] absolute w-full opacity-20'></div>
      <Image
        className='absolute object-cover h-[100vh] bottom-0 top-[0px] right-0 left-0 z-[10] w-full opacity-80'
        src={image}
        alt="imagen de cabecera"
        // objectFit='fill'
        // sizes="(max-width: 768px) 100vw, 33vw"
        // style={{objectFit: "cover"}}
        priority
      />

    <div className='relative z-[20] grid h-[100vh]  w-full p-1 place-content-center drop-shadow-lg'>
      <div className='min-w-[320px] bg-white'>
        {
          showNewUserModal && <NewUserModal userData={userData}/>
        }
        <h1 className='text-textTitulos p-5 bg-loginForm text-xl uppercase font-semibold text-center'>inicio de sesión</h1>
        <form onSubmit={handleSubmit} className='p-3 bg-background1'>
          <div>
            <div className='w-full my-5'>
              <p className='text-slate-400 text-sm uppercase'>usuario:</p>
              <input className='p-3 outline-none  shadow-md w-full' onChange={handleValueUser} type="email" name="email" placeholder="nombre de usuario" />
            </div>
            <div className='w-full my-5'>
              <p className='text-slate-400 text-sm uppercase'>contraseña:</p>
              <input type="password" className='p-3 outline-none  shadow-md w-full' onChange={handleValueUser} name="password" placeholder="contraseña" />
            </div>
          </div>
          <button className='p-3 bg-buttonLogin uppercase font-semibold cursor-pointer  shadow-md text-white w-full'>ingresar</button>
          {
            loadingAccount ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">validando datos...</p>
              </div>
              :
              null
          }
          {
            warningAccount.length > 1 ?
              <p className='text-[12px] text-red-500 w-full text-center mt-5'>*{warningAccount}</p>
              : null
          }
        </form>
      </div>
      {/* <div className='p-3'>
        <h4 className='capitalize text-center text-blue-500 mb-2'>crear nuevo usuario</h4>
        <button onClick={() => showNewUserModalValue(showNewUserModal)} className='capitalize p-3 w-full border-[1px] border-emerald-400 hover:border-emerald-600 text-emerald-400 hover:text-white hover:bg-emerald-600 duration-300'>nuevo usuario</button>
      </div> */}
    </div>
    </div>
  )
}

export default Login