import NewUserModal from '@/Modals/newUserModal'
import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import { useNewUser } from '@/features/hooks/useNewUser'
import { validateRol } from '@/utils/validateRolEmployee'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValuePassword = {
  newPassword: "",
  currentPassword:"",
  validateNewPassword: "",
  warningPassword: ""
}
const MyAccount = () => {
  const { userData } = useGlobalContext()
  const { showNewUserModal, errorCurrentPassword } = useGlobalContext()
  const { showNewUserModalValue } = useNewUser()
  const [changePasswordUser, setChangePasswordUser] = useState<boolean>(false)
  const [password, setPassword] = useState(initialValuePassword)
  const [agreePassword, setAgreePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { changePassword } = useAuthentication()
  // const [validateNewPassword, setValidateNewPassword] = useState({})
  // console.log('mi cuenta', userData)

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }
  const cancelPassword = () => {
    setPassword(initialValuePassword)
  }
  useEffect(() => {
    if (password.newPassword === password.validateNewPassword && password.newPassword.length > 0 && password.validateNewPassword.length > 0) {
      setAgreePassword(true)
      setPassword({ ...password, warningPassword: "" })
    } else if (password.newPassword.length > 0 && password.validateNewPassword.length > 0) {
      setPassword({ ...password, warningPassword: "contraseñas no coinciden, verifica que sean iguales" })
      setAgreePassword(false)

    } else {
      setAgreePassword(false)
    }
  }, [password.newPassword, password.validateNewPassword])

  // console.log('password', password)
  return (
    <>
      <ToastContainer />
      {
        userData.dni ?
          <div className='p-3'>
            <div className='w-full'>
              <div className='m-auto xs:w-[80%] w-full bg-white p-3'>
                {
                  showNewUserModal && <NewUserModal userData={userData} />
                }
                <div>
                  <h3 className='uppercase font-semibold text-xl text-slate-600 mb-3'>mi cuenta</h3>
                  <div className='border-b-[2px] border-t-[2px] p-3 border-emerald-400'>
                    <h4 className='capitalize font-semibold text-blue-500'>mis datos</h4>
                    <p className='text-md text-slate-500 capitalize '><span className='font-bold'>Nombre completo: </span>
                      {userData.name} {userData.lastname} {userData.firstname}
                    </p>
                    <p className='text-md text-slate-500 capitalize '>
                      <span className='font-bold'>id: </span>{userData.dni}
                    </p>
                    <p className='text-md text-slate-500 capitalize '>
                      <span className='font-bold'>cargo: </span>{validateRol(Number(userData.rol))}
                    </p>
                    <p className='text-md text-slate-500 '>
                      <span className='font-bold capitalize'>cuenta: </span>{userData.acc}
                    </p>
                    <p className='text-md text-slate-500 '>
                      <span className='font-bold capitalize'>celular: </span>{userData.celular}
                    </p>
                    <p className='text-md text-slate-500 capitalize'>
                      <span className='font-bold capitalize'>nombre de institución: </span>{userData.institutionName}
                    </p>
                  </div>
                </div>
                <h4 onClick={() => setChangePasswordUser(!changePasswordUser)} className='p-3 w-auto cursor-pointer capitalize font-semibold text-blue-500 mb-2 duration-300 hover:text-blue-600'>cambiar mi contraseña</h4>

                {
                  changePasswordUser &&
                  <div className='p-3'>
                    <div className='mb-3'>
                      <h3 className='text-slate-500 mb-2'>Escribe tu contraseña actual</h3>
                      <input value={password.currentPassword} onChange={handleNewPassword} name="currentPassword" type="text" placeholder="contraseña actual" className='p-3 w-[100%] border-[1px]' />
                      {
                        errorCurrentPassword &&
                        <span className='text-red-500 text-sm'>*tu contraseña no coincide, verifica que hayas escrito correctamente tu contraseña actual</span>
                      }
                      
                    </div>
                    <div className='mb-3'>
                      <h3 className='text-slate-500 mb-2'>Escribe tu nueva contraseña</h3>
                      <div className='flex gap-5'>
                      <input value={password.newPassword} onChange={handleNewPassword} name="newPassword" className='p-3 w-[100%] border-[1px]' type={showPassword ? 'text' : 'password'} placeholder='nueva contraseña' />
                      <input value={password.validateNewPassword} onChange={handleNewPassword} name="validateNewPassword" className='p-3 w-[100%] outline-none border-[1px]' type={showPassword ? 'text' : 'password'} placeholder='vuelve a escribir la nueva contraseña' />
                      </div>
                    </div>
                    {
                      password.warningPassword &&

                      <span className='text-red-300 text-sm'>{password.warningPassword}</span>
                    }
                    <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-teal-500 capitalize text-sm'>{showPassword ? 'ocultar contraseña' : 'mostrar contraseña'}</div>
                    <div className='mt-3 gap-5 flex '>
                      <button onClick={() => { setChangePasswordUser(!changePasswordUser), cancelPassword() }} className=' text-red-300 font-semibold'>cancelar</button>
                      <button onClick={() => { changePassword(password.newPassword, userData, password.currentPassword), setPassword(initialValuePassword), setChangePasswordUser(errorCurrentPassword)}} disabled={password.warningPassword.length > 0 ? true : false} className={`p-2  text-white capitalize rounded-sm  ${agreePassword ? 'bg-blue-400' : 'bg-gray-200'} font-semibold`}>aceptar</button>
                    </div>
                  </div>
                }
                {/* <div className='p-3'>
                  <h4 className='capitalize font-semibold text-blue-500 mb-2'>crear nuevo usuario</h4>
                  <button onClick={() => showNewUserModalValue(showNewUserModal)} className='capitalize p-3 border-[1px] border-emerald-400 hover:border-emerald-600 text-emerald-400 hover:text-white hover:bg-emerald-600 duration-300'>nuevo usuario</button>
                </div> */}
              </div>
            </div>
          </div>
          :
          // colocar loader de carga para el usuario
          <p>...cargando</p>
      }
    </>
  )
}

export default MyAccount

// MyAccount.Auth = PrivateRouteAdmin