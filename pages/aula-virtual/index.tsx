import PrivateRouteAulaVirtual from '@/components/layouts/PrivateRouteAulaVirtual'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import { useNewUser } from '@/features/hooks/useNewUser'
import { UserAulaVirtual } from '@/features/types/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Image from 'next/image'
import background from '../../assets/login-image.jpg'
const AulaVirtual = () => {

  // const auth = getAuth(app)
  const { getInstitution } = useNewUser()
  const { loadingAccount, warningAccount, instituciones, validateUserAulavirtual, dataAulavirtual } = useGlobalContext()
  const router = useRouter()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { validateUserAulaVirutal } = useAulaVirtual()
  const route = useRouter()
  useEffect(() => {
    getInstitution()
  }, [])
  const validateStudent = handleSubmit((data: UserAulaVirtual) => {
    console.log("data", data)
    validateUserAulaVirutal({ ...data, institucion: `${route.query.idInstitucion}` })
  })

  useEffect(() => {
    if (dataAulavirtual.dni) {
      router.push(`/aula-virtual/estudiante/aula-virtual?dni=${dataAulavirtual.dni}&idInstitucion=${route.query.idInstitucion}`)
    }
  }, [dataAulavirtual.dni])
  // console.log('validateUserAulavirtual', validateUserAulavirtual)
  // console.log('estoy en ruta de login')
  return (
    <div className='grid h-[100vh] w-full p-1 place-content-center relative'>
      <div className='top-0 bottom-0 rigth-0 left-0 bg-cyan-400 z-[15] absolute w-full opacity-20'></div>
      <Image
        className='absolute object-cover h-[100vh] bottom-0 top-[0px] right-0 left-0 z-[10] w-full opacity-80'
        src={background}
        alt="imagen de cabecera"
        // objectFit='fill'
        // sizes="(max-width: 768px) 100vw, 33vw"
        // style={{objectFit: "cover"}}
        priority
      />
      <div className='min-w-[320px] relative z-[20]  bg-white rounded-md drop-shadow-lg'>
        <h1 className=' relative z-[20] bg-loginForm p-5 text-textTitulos text-xl uppercase font-semibold text-center mb-3'>aula virtual</h1>

        <form onSubmit={validateStudent} className='p-2'>
          <div>
            <div className='w-full mb-5'>
              {/* <p className='text-slate-400 text-sm uppercase'>usuario:</p> */}

              <input
                className='p-3 outline-none rounded-md shadow-md w-full'
                type="number"
                placeholder="DNI DE ESTUDIANTE"
                {
                ...register("dni",
                  {
                    required: { value: true, message: "dni es requerido" },
                    minLength: { value: 8, message: "dni debe tener 8 digitos" },
                    maxLength: { value: 8, message: "dni debe tener 8 digitos" }
                  }
                )
                }
              />
            </div>
            {/* <div className='w-full my-5'>
              <select
                className='p-3 bg-white shadow-md text-slate-400 rounded-md w-full'
                {...register("institucion",
                  {
                    required: { value: true, message: "institucion es requerido" },
                  }
                )}
              >
                <option value="">INSTITUCIÓN</option>
                {instituciones?.map((institucion, index) => {
                  return (
                    <option className='uppercase text-slate-500' key={index} value={institucion.id}>{institucion?.name?.toLocaleUpperCase()}</option>
                  )
                })}
              </select>
            </div> */}
          </div>
          <button className='p-3 bg-gradient-to-r from-colorTercero to-colorSecundario uppercase font-semibold cursor-pointer rounded-md shadow-md text-white w-full'>ingresar</button>
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

export default AulaVirtual
AulaVirtual.Auth = PrivateRouteAulaVirtual