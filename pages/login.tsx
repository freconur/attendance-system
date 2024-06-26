import React, { useState } from 'react'
import useAuthentication from '@/features/hooks/useAuthentication'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/firebase/firebaseConfig'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { RiLoader4Line } from 'react-icons/ri'
const Login = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const { loadingAccount, warningAccount } = useGlobalContext()
  const { signIn } = useAuthentication()
  const initialValue = { email: "", password: "" }
  const [formValue, setFormValue] = useState(initialValue)

  const handleValueUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn(formValue)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/mis-productos');
      }
    });
    // const response = await axios.post('/api/auth/login', formValue)
    // console.log('response', response)
  }
  return (
    <div className='grid h-login w-full p-1 place-content-center'>
      <div className='min-w-[320px]'>
        <h1 className='text-slate-500 text-xl uppercase font-semibold text-center'>inicio de sesión</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='w-full my-5'>
              <p className='text-slate-400 text-sm uppercase'>usuario:</p>
              <input className='p-3 outline-none rounded-md shadow-md w-full' onChange={handleValueUser} type="email" name="email" placeholder="nombre de usuario" />
            </div>
            <div className='w-full my-5'>
              <p className='text-slate-400 text-sm uppercase'>contraseña:</p>
              <input type="password" className='p-3 outline-none rounded-md shadow-md w-full' onChange={handleValueUser} name="password" placeholder="contraseña" />
            </div>
          </div>
          <button className='p-3 bg-principal uppercase font-semibold cursor-pointer rounded-md shadow-md text-white w-full'>ingresar</button>
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
    </div>
  )
}

export default Login