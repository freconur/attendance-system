import PrivateRouteAulaVirtual from '@/components/layouts/PrivateRouteAulaVirtual'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import { useNewUser } from '@/features/hooks/useNewUser'
import { UserAulaVirtual } from '@/features/types/types'
import { app } from '@/firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
const AulaVirtual = () => {

  // const auth = getAuth(app)
  const { getInstitution } = useNewUser()
  const { loadingAccount, warningAccount, instituciones, validateUserAulavirtual, dataAulavirtual, idInstitucion } = useGlobalContext()
  const router = useRouter()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { validateUserAulaVirutal } = useAulaVirtual()
  useEffect(() => {
    getInstitution()
  }, [])
  const validateStudent = handleSubmit((data: UserAulaVirtual) => {
    console.log("data", data)
    validateUserAulaVirutal(data)
  })

  useEffect(() => {
    testing()
  },[validateUserAulavirtual,dataAulavirtual.dni])
  const testing = () => {
    if (validateUserAulavirtual !== false) {
      if(dataAulavirtual.dni){
        router.push(`/aula-virtual/estudiante/asistencia?dni=${dataAulavirtual.dni}&idInstitucion=${idInstitucion}`)

      }
    }
  }
  console.log('validateUserAulavirtual', validateUserAulavirtual)
  console.log('dataAulavirtual', dataAulavirtual)
  return (
    <div className='grid h-login w-full p-1 place-content-center'>
      <h1 className='text-slate-500 text-xl uppercase font-semibold text-center mb-10'>aula virtual</h1>
      <div className='min-w-[320px] bg-white p-3 rounded-md'>

        <form onSubmit={validateStudent}>
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
            <div className='w-full my-5'>
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
            </div>
          </div>
          <button className='p-3 bg-pastel18 uppercase font-semibold cursor-pointer rounded-md shadow-md text-white w-full'>ingresar</button>
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