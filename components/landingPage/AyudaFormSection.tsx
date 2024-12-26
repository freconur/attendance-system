import { useGlobalContext } from '@/features/context/GlobalContext'
import { useCotizacion } from '@/features/hooks/useCotizacion'
import React from 'react'
import { useForm } from 'react-hook-form'
import { LuLoader2 } from 'react-icons/lu'
import { ToastContainer } from 'react-toastify'

const AyudaFormSection = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { sendFormCotizacion } = useCotizacion()
  const handleSubmitform = handleSubmit(data => {
    sendFormCotizacion(data)
    reset()
  })

  const { loaderCotizacion } = useGlobalContext()

  console.log('loaderCotizacion', loaderCotizacion)
  return (
    // <>
    <section id="formCotizacion" className='py-32 bg-fondo-claro text-center'>
    {/* <section className='py-32 text-center bg-green-400'> */}
      <ToastContainer />

      <h3 className='uppercase text-2xl font-montserrat font-semibold pb-10'>quiero cotizar un presupuesto?</h3>
      <form onSubmit={handleSubmitform} className='lg:w-[50%] m-auto'>
        <div className='w-5/6 m-auto grid gap-5 '>
          <div className='w-full text-left'>
            <input
              className='border-[1px] border-blue-500 uppercase h-[30px] rounded-md p-7 w-full' type="text"
              placeholder='NOMBRES Y APELLIDOS'
              {...register("nombres",
                { required: { value: true, message: "nombre y apellido es requerido" } }
              )}
            />
            {errors.nombres && <span className='text-red-400 '>{errors.nombres.message as string}</span>}
          </div>

          <div className='w-full text-left'>
            {/* <input className='border-[1px] uppercase border-blue-500 h-[30px] rounded-md p-7 w-full'
              type="text"
              placeholder='CARGO'
              {...register("cargo",
                { required: { value: true, message: "cargo es requerido" } }
              )} /> */}
            <select
              className='w-full  border-[1px] border-blue-500 outline-none p-4 rounded-md bg-white uppercase text-slate-500'
              {...register("cargo",
                {
                  required: { value: true, message: "cargo es requerido" },
                },

              )}

            >
              <option className='uppercase text-slate-500' value="">--CARGO--</option>
              <option className='uppercase text-slate-500' value="administracion">ADMINISTRACION</option>
              <option className='uppercase text-slate-500' value="promotor">PROMOTOR</option>
              <option className='uppercase text-slate-500' value="director">DIRECTOR</option>
              <option className='uppercase text-slate-500' value="docente">DOCENTE</option>
            </select>
            {errors.cargo && <span className='text-red-400 '>{errors.cargo.message as string}</span>}
          </div>
          <div className='w-full text-left'>
            <input className='border-[1px] uppercase border-blue-500 h-[30px] rounded-md p-7 w-full' type="text"
              placeholder='NOMBRE DEL COLEGIO'
              {...register("nombreDeColegio",
                { required: { value: true, message: "nombre de colegio es requerido" } }
              )} />
            {errors.nombreDeColegio && <span className='text-red-400 '>{errors.nombreDeColegio.message as string}</span>}
          </div>
          <div className='w-full text-left'>
            <input className='border-[1px] uppercase border-blue-500 h-[30px] rounded-md p-7 w-full' type="number"
              placeholder='CANTIDAD DE ALUMNOS'
              {...register("cantidadDeAlumnos",
                { required: { value: true, message: "cantidad de alumnos es requerido" } }
              )} />
            {errors.cantidadDeAlumnos && <span className='text-red-400 '>{errors.cantidadDeAlumnos.message as string}</span>}
          </div>
          <div className='w-full text-left'>
            <input className='border-[1px] uppercase border-blue-500 h-[30px] rounded-md p-7 w-full' type="number"
              placeholder='NUMERO DE CELULAR'
              {...register("numeroDeCelular",
                {
                  required: { value: true, message: "numero de celular es requerido" },
                  minLength: { value: 9, message: "numero de celular debe tener 9 caracteres" },
                  maxLength: { value: 9, message: "numero de celular debe tener 9 caracteres" },
                }

              )} />
            {errors.numeroDeCelular && <span className='text-red-400 '>{errors.numeroDeCelular.message as string}</span>}
          </div>

        </div>
        {
          loaderCotizacion ?
            <div className="flex items-center justify-center mt-10">
              <LuLoader2 className="animate-spin w-[20px] h-[20px] text-blue-500" />
              <span className="text-blue-500">Enviando mensaje, espera porfavor.</span>
            </div>
            :

            <button className='p-3 rounded-md hover:bg-blue-400 bg-blue-500 mt-5 w-5/6 uppercase text-white font-semibold shadow-md duration-300'>enviar</button>

        }
      </form>
      {/* <div className=' grid justify-center items-center gap-5 w-1/2 m-auto'> */}
    </section>
    // </>
  )
}

export default AyudaFormSection