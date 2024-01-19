import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EstudentsRegister = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { registerNewStudent, getSections, getGrades, sendPictureProfile } = UseRegisterStudents()
  const { sections, grades, pictureProfileUrl } = useGlobalContext()

  const handleSubmitform = handleSubmit(data => {
    registerNewStudent(data, pictureProfileUrl)
    reset()
  })
  
  useEffect(() => {
    if(watch('pictureProfile') !== undefined) {
      sendPictureProfile(watch('pictureProfile')[0])
    }
  }, [watch('pictureProfile')])

  useEffect(() => {
    getSections()
    getGrades()
  }, [])
  return (
    <div className='p-2'>
      <h1 className='text-2xl my-5 font-semibold uppercase text-center text-slate-600'>registro de estudiantes</h1>
      <form onSubmit={handleSubmitform} className='mt-5' action="">
        <div className='w-full rounded-sm shadow-md p-5 bg-white my-3'>
          <h3 className='text-xl text-slate-500 uppercase font-semibold mb-3'>estudiante</h3>
          <div className='uppercase text-slate-600'>Nombre:</div>
          <input
            className='w-full border-[1px] outline-none border-blue-400 p-2 text-slate-500 rounded-sm my-2' type="text"
            placeholder="nombres"
            {...register("name",
              {
                required: { value: true, message: "nombre es requerido" },
                minLength: { value: 2, message: "nombre debe tener un minimo de 2 caracteres" },
                maxLength: { value: 20, message: "nombre debe tener un maximo de 20 caracteres" },
              }
            )}
          />
          {errors.name && <span className='text-red-400'>{errors.name.message as string}</span>}
          <div className='uppercase text-slate-600'>Apellidos:</div>
          <input
            className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text"
            placeholder="apellidos"
            {...register("lastname",
              {
                required: { value: true, message: "apellido es requerido" },
                minLength: { value: 2, message: "apellido debe tener un minimo de 2 caracteres" },
                maxLength: { value: 20, message: "apellido debe tener un maximo de 20 caracteres" },
              }
            )}
          />
          {errors.lastname && <span className='text-red-400'>{errors.lastname.message as string}</span>}

          <div className='uppercase text-slate-600'>dni:</div>
          <input
            className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text"
            placeholder="dni"
            {...register("dni",
              {
                required: { value: true, message: "dni es requerido" },
                minLength: { value: 8, message: "dni debe tener 8 caracteres" },
                maxLength: { value: 8, message: "dni debe tener 8 caracteres" },
              }
            )}
          />
          {errors.dni && <span className='text-red-400'>{errors.dni.message as string}</span>}

          {/* //esto tiene que ser un select */}
          <div className='uppercase text-slate-600'>grado:</div>
          <select
            className='w-full rounded-sm border-[1px] border-blue-400 outline-none my-2 p-2 bg-white uppercase text-slate-500'
            {...register("grade",
              {
                required: { value: true, message: "grado es requerido" }
              }
            )}
          >
            <option className='uppercase text-slate-500' value="">--seleccionar--</option>
            {
              grades?.map((gr, index) => {
                return (
                  <option className='uppercase text-slate-500' key={index} value={gr.grade}>{gr.traditionalGrade}</option>
                )
              })
            }
          </select>
          {errors.grade && <span className='text-red-400'>{errors.grade.message as string}</span>}

          <div className='uppercase text-slate-600'>seccion:</div>
          <select
            className='w-full rounded-sm border-[1px] border-blue-400 outline-none my-2 p-2 bg-white uppercase text-slate-500'
            {...register("section",
              {
                required: { value: true, message: "seccion es requerido" }
              }
            )}
          >
            <option className='uppercase text-slate-500' value="">--seleccionar--</option>

            {
              sections?.map((sec, index) => {
                return (
                  <option className='uppercase text-slate-500' key={index} value={sec.section}>{sec.section}</option>
                )
              })
            }
          </select>
          {errors.section && <span className='text-red-400'>{errors.section.message as string}</span>}
          <div className='uppercase text-slate-600'>foto de perfil:</div>
          {!watch('pictureProfile') || watch('pictureProfile').length === 0 ? (
            <input
              type="file"
              className="form-control my-2"
              placeholder="seleciona una imagen"
              // onChange={fileHandler}
              disabled={pictureProfileUrl ? true : false}
              {...register("pictureProfile",
                {
                  required: { value: true, message: "foto de perfil es requerido" },
                }
              )}
            />
          ) : (<strong>{watch('pictureProfile')[0].name}</strong>)}

          {errors.pictureProfile && <span className='text-red-400'>* foto de perfil es requerido</span>}
          {
            pictureProfileUrl ?
              <div className='m-auto mt-2 rounded-md overflow-hidden bg-red-400 w-[150px] h-[150px]'>
                <Image
                  alt={`foto de perfil de estudiante`}
                  src={`${pictureProfileUrl}`}
                  width={150}
                  height={150} />
              </div>
              : null
          }
        </div>
        <div className='w-full rounded-sm shadow-md p-5 bg-white'>
          <h3 className='text-xl text-slate-500 uppercase font-semibold mb-3'>padres del estudiante</h3>
          <div
            className='uppercase text-slate-600'>Nombre del padre:</div>
          <input
            className='w-full border-[1px] outline-none border-blue-400 p-2 text-slate-500 rounded-sm my-2' type="text" placeholder="nombrePadre"
            {...register("nameFather",
              {
                required: { value: true, message: "nombre del padre es requerido" },
                minLength: { value: 2, message: "nombre del padre debe tener un minimo de 2 caracteres" },
                maxLength: { value: 20, message: "nombre del padre debe tener un maximo de 20 caracteres" },
              }
            )}
          />
          {errors.nameFather && <span className='text-red-400'>{errors.nameFather.message as string}</span>}
          <div
            className='uppercase text-slate-600'>celular del padre:</div>
          <input
            className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text" placeholder="celularPadre"
            {...register("numberFather",
              {
                required: { value: true, message: "celular es requerido" },
                minLength: { value: 9, message: "celular del padre debe tener un minimo de 9 caracteres" },
                maxLength: { value: 9, message: "celular del padre debe tener un maximo de 9 caracteres" },
              }
            )}
          />
          {errors.numberFather && <span className='text-red-400'>{errors.numberFather.message as string}</span>}
          <div
            className='uppercase text-slate-600'>nombre de la madre:</div>
          <input
            className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text" placeholder="nombres"
            {...register("nameMother",
              {
                required: { value: true, message: "nombre es requerido" },
                minLength: { value: 2, message: "nombre de la madre debe tener un minimo de 2 caracteres" },
                maxLength: { value: 20, message: "nombre de la madre debe tener un maximo de 20 caracteres" },
              }
            )}
          />
          {errors.nameMother && <span className='text-red-400'>{errors.nameMother.message as string}</span>}
          <div
            className='uppercase text-slate-600'>celular de la madre:</div>
          <input
            className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text" placeholder="celularMadre"
            {...register("numberMother",
              {
                required: { value: true, message: "celular es requerido" },
                minLength: { value: 9, message: "celular de la madre debe tener un minimo de 9 caracteres" },
                maxLength: { value: 9, message: "celular de la madre debe tener un maximo de 9 caracteres" },
              }
            )}
          />
          {errors.numberMother && <span className='text-red-400'>{errors.numberMother.message as string}</span>}

        </div>
        <button className='p-3 my-5 duration-300 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-sm w-full text-white shadow-md uppercase font-semibold'>registrar</button>
      </form>
    </div>
  )
}

export default EstudentsRegister

EstudentsRegister.Auth = PrivateRoutes