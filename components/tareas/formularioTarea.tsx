import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PrivateRoutes from '../layouts/PrivateRoutes'
import useTareas from '@/features/hooks/useTareas'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Image from 'next/image'
import { RiLoader4Line } from 'react-icons/ri'
import LoaderImageTareaModal from '@/Modals/loaderImages'

const FormularioTarea = () => {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { registerNewStudent, getSections, getGrades } = UseRegisterStudents()
  const { sections, grades, pictureTareas, userData, cursos, loaderPictureTask } = useGlobalContext()
  const { getUserData } = useAuthentication()
  const [gradeValue, setGradeValue] = useState(0)
  const { getCursosDocente, sendPictureTareas, addNuevaTarea } = useTareas()
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const handleSubmitForm = handleSubmit(data => {
    console.log('data', data)
    //aqui tiene que ir la funcion que va agregar esta tarea
    addNuevaTarea(data, pictureTareas, { date: startDate.date(), month: startDate.month(), year: startDate.year() })
    reset()
  })
  useEffect(() => {
    if (watch('pictureProfile') !== undefined) {
      sendPictureTareas(watch('pictureProfile')[0], pictureTareas)
    }
  }, [watch('pictureProfile')])
  useEffect(() => {
  }, [])
  useEffect(() => {
    getUserData()
    if (userData) {
      getGrades()
      getCursosDocente()
    }
  }, [userData.name])
  console.log('loaderPictureTask', loaderPictureTask)
  // console.log('startDate', startDate.date().toString().padStart(2,"0"), startDate.month(), startDate.year())
  return (
    <form onSubmit={handleSubmitForm} className='mt-5'>
      <div id="container" className='grid grid-cols-2 gap-5'>
        <div className='w-full'>
          <p className='capitalize text-slate-400'>grado</p>
          <select
            className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'
            {
            ...register("grade",
              {
                required: { value: true, message: "grado es requerido" },
                onChange(event) {
                  setGradeValue(Number(event.target.value - 1))
                }
              }
            )
            }
          >
            <option className='uppercase text-slate-500' value="">--seleccionar--</option>
            {
              grades?.map((gr, index) => {
                return (
                  <option className='uppercase text-slate-500' key={index} value={gr.grade}>{gr.traditionalGrade}{gr.gotSection}</option>
                )
              })
            }
          </select>
          {errors.grade && <span className='text-red-400'>{errors.grade.message as string}</span>}
        </div>
        <div className='w-full'>
          <p className='capitalize text-slate-400'>nombre del curso</p>
          <select
            className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'
            {
            ...register("curso",
              {
                required: { value: true, message: "curso es requerido" },
              }
            )
            }
          >
            <option className='uppercase text-slate-500' value="">--seleccionar--</option>
            {
              cursos?.map((curso, index) => {
                return (
                  // <option className='uppercase text-slate-500' key={index} value={curso.id}>{curso.identificador}-{curso.id} {curso.name}</option>
                  <option className='uppercase text-slate-500' key={index} value={curso}>{curso}</option>
                )
              })
            }
          </select>
          {errors.curso && <span className='text-red-400'>{errors.curso.message as string}</span>}
        </div>
        {/* <div className='w-full'>
          <p className='capitalize text-slate-400'>fecha de entrega</p>
          <select className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'>
            <option value="">fecha</option>
          </select>
        </div> */}
        <div className='relative z-10 mb-3'>
          <div className='capitalize text-slate-400'>Fecha de entrega</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
      </div>
      <div className='w-full mt-5'>
        <p className='capitalize text-slate-400'>observaciones</p>
        <textarea
          className='w-full rounded-md text-slate-500 mt-2 p-2'
          placeholder="aqui puedes escribir algunas observaciones"
          {
          ...register("observaciones",
            {
              required: { value: true, message: "observaciones es requerido" },
              minLength: { value: 2, message: "observaciones debe tener 2 caracteres como minimo" },
            }
          )
          }
        />
        {errors.observaciones && <span className='text-red-400'>{errors.observaciones.message as string}</span>}
      </div>
      <input
        type="file"
        className="form-control my-2"
        placeholder="seleciona una imagen"
        // onChange={fileHandler}
        // disabled={pictureProfileUrl ? true : false}
        {...register("pictureProfile",
          // {
          //   required: { value: false, message: "foto de perfil es requerido" },
          // }
        )}
      />
      {/* {!watch('pictureProfile') || watch('pictureProfile').length === 0 ? (
            <input
              type="file"
              className="form-control my-2"
              placeholder="seleciona una imagen"
              // onChange={fileHandler}
              disabled={pictureProfileUrl ? true : false}
              {...register("pictureProfile",
                // {
                //   required: { value: false, message: "foto de perfil es requerido" },
                // }
              )}
            />
          ) : (<strong>{watch('pictureProfile')[0].name}</strong>)} */}

      {errors.pictureProfile && <span className='text-red-400'>* foto de perfil es requerido</span>}

      {loaderPictureTask ?
        <LoaderImageTareaModal />
        :
        null
      }
      <ul className='flex gap-2 justify-center items-center'>
        {
          pictureTareas?.map((pic, index) => {
            return (
              <li key={index} className='m-auto mt-2 rounded-md overflow-hiddenw-auto flex justify-center items-center'>
                <Image
                  className='m-auto w-auto h-auto'
                  alt={`foto de tarea`}
                  src={pic.url}
                  width={150}
                  height={150}
                />
              </li>

            )
          })
        }

      </ul>
      <button className='p-3 my-5 duration-300 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-sm w-full text-white shadow-md uppercase font-semibold'>registrar tarea</button>
    </form>
  )
}

export default FormularioTarea
FormularioTarea.Auth = PrivateRoutes