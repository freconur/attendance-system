import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import useAuthentication from '@/features/hooks/useAuthentication'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const RegistroEmpleados = () => {
  const { getUserData } = useAuthentication()
  const { sections, grades, pictureProfileUrl, userData } = useGlobalContext()
  const { getTypeEmployee, registerEmployee } = useAttendanceEmployee()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { typesEmployee } = useGlobalContext()
  const handleSumitForm = handleSubmit(data => {
    registerEmployee(data)
    reset()
  })

  useEffect(() => {
    // getUserData()
    if (userData) {
      getTypeEmployee()
    }
  }, [])
  // console.log('typesEmployee', typesEmployee)
  return (
    <div className='p-3'>
      <h3 className='text-xl text-center text-slate-400 uppercase font-semibold'>agregar nuevo empleado</h3>
      <form onSubmit={handleSumitForm}>
        <div className='uppercase text-slate-500'>Nombre:</div>
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

        <div className='uppercase text-slate-600'>Apellidos paterno:</div>
        <input
          className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text"
          placeholder="apellidos paterno"
          {...register("lastname",
            {
              required: { value: true, message: "apellido paterno es requerido" },
              minLength: { value: 2, message: "apellido paterno debe tener un minimo de 2 caracteres" },
              maxLength: { value: 20, message: "apellido paterno debe tener un maximo de 20 caracteres" },
            }
          )}
        />
        {errors.lastname && <span className='text-red-400'>{errors.lastname.message as string}</span>}
        <div className='uppercase text-slate-600'>Apellidos materno:</div>
        <input
          className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="text"
          placeholder="apellidos materno"
          {...register("firstname",
            {
              required: { value: true, message: "apellido materno es requerido" },
              minLength: { value: 2, message: "apellido materno debe tener un minimo de 2 caracteres" },
              maxLength: { value: 20, message: "apellido materno debe tener un maximo de 20 caracteres" },
            }
          )}
        />
        {errors.firstname && <span className='text-red-400'>{errors.firstname.message as string}</span>}
        <div className='uppercase text-slate-600'>dni:</div>
        <input
          className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="number"
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

        {/* <div className='uppercase text-slate-600'>celular:</div>
        <input
          className='w-full p-2 border-[1px] outline-none border-blue-400 text-slate-500 rounded-sm my-2' type="number"
          placeholder="celular"
          {...register("phone",
            {
              required: { value: true, message: "dni es requerido" },
              minLength: { value: 9, message: "dni debe tener 8 caracteres" },
              maxLength: { value: 9, message: "dni debe tener 8 caracteres" },
            }
          )}
        />
        {errors.phone && <span className='text-red-400'>{errors.phone.message as string}</span>} */}
        <div className='uppercase text-slate-600'>rol:</div>
          <select
            className='w-full rounded-sm border-[1px] border-blue-400 outline-none my-2 p-2 bg-white uppercase text-slate-500'
            {...register("rol",
              {
                required: { value: true, message: "rol es requerido" },
                // onChange(event) {
                //   setGradeValue(Number(event.target.value - 1))
                // },
              },
                
            )}
          >
            <option className='uppercase text-slate-500' value="">--seleccionar--</option>
            {
              typesEmployee?.map((type, index) => {
                return (
                  <option className='uppercase text-slate-500' key={index} value={Number(type.code)}>{type.name}</option>
                )
              })
            }
          </select>
            {errors.rol && <span className='text-red-400'>{errors.rol.message as string}</span>}
          <button className='p-3 my-5 duration-300 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-sm w-full text-white shadow-md uppercase font-semibold'>registrar</button>
      </form>
    </div>
  )
}

export default RegistroEmpleados
RegistroEmpleados.Auth = PrivateRoutes