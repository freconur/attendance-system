'use client '
import PrivateRouteProfesores from '@/components/layouts/PrivateRouteProfesores'
import { todayDate } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import useTareas from '@/features/hooks/useTareas'
import { useUploadFiles } from '@/features/hooks/useUploadFiles'
import { convertGrade } from '@/utils/validateGrade'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Image from 'next/image'
import header from '../../../assets/header-cloud.jpg'
import React, { useEffect, useState } from 'react'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { RiLoader4Line } from 'react-icons/ri'


const AulaVirtual = () => {
  const [file, setFile] = useState<any>()
  const { uploadFiles, getFilesPorFecha } = useUploadFiles()
  const { grades, cursos, userData, archivosAulaVirtual, loaderAulaVirtual, loaderUpload } = useGlobalContext()
  const [grado, setGrado] = useState("")
  const [curso, setCurso] = useState("")
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e?.target?.files[0])
    }
  }
  const onChangeGrade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrado(e.target.value)
  }
  const onChangeCursos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurso(e.target.value)
  }
  const chargeFile = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    uploadFiles(file, grado, curso)
    setGrado("")
    setCurso("")
    setFile({})
  }
  const { getGrades } = UseRegisterStudents()
  const { getCursosDocente } = useTareas()
  useEffect(() => {
    getGrades()
    getCursosDocente()
  }, [userData.dni])
  useEffect(() => {

    getFilesPorFecha(startDate.date(), startDate.month())
  }, [startDate.date(), userData.dni])

  // console.log('archivosAulaVirtual', archivosAulaVirtual)
  // 
  useEffect(() => {
    if (file) {
      console.log('file', file)
    }
  }, [file])
  return (
    <div className=''>
      {/* <div className='mb-10'>
        <h1 className='text-3xl text-slate-600 font-semibold font-martianMono uppercase text-center'>aula virtual</h1>
      </div> */}
      <div className='grid relative h-[190px]  sm:h-[350px]  bg-headerPsicolinguistica overflow-hidden drop-shadow-lg'>
        <div className='top-0 bottom-0 rigth-0 left-0 bg-green-700 z-[15] absolute w-full opacity-30'></div>
        <Image
          className='absolute bottom-0 top-[0px] right-0 left-0 z-[10] opacity-80'
          src={header}
          alt="imagen de cabecera"
          objectFit='fill'
          priority
        />
        <h1 className="text-textTitulos grid place-content-center relative z-[20] text-3xl font-bold font-martianMono capitalize text-center">aula virtual</h1>
      </div>

      <div className='p-5'>

        <div className='mb-5 flex justify-between items-center '>
          <p className='text-sm text-slate-500 uppercase'>{todayDate()}</p>

        </div>
        <div className='justify-center mb-10 cs:flex gap-2 lg:w-[60%] xl:w-[50%] m-auto'>
          <div className='sm:flex gap-2'>
            <select value={curso} onChange={onChangeCursos} className='text-center h-[45px] py-2 rounded-[50px] bg-white outline-none cursor-pointer text-graduado-blue-3 capitalize drop-shadow-lg w-full mb-2'>
              <option>--curso--</option>
              {
                cursos?.map((curso, index) => {
                  return (
                    <option key={index} value={curso}>{curso}</option>
                  )
                })
              }
            </select>
            <select value={grado} onChange={onChangeGrade} className='h-[45px] p-2 w-full rounded-[50px] text-center bg-white outline-none cursor-pointer text-graduado-blue-3 capitalize drop-shadow-lg mb-2'>
              <option>--grado--</option>
              {
                grades?.map((grade, index) => {
                  return (
                    <option key={index} value={grade.grade}>{grade.traditionalGrade}</option>
                  )
                })
              }
            </select>
          </div>
          <form className='w-full cs:flex' onSubmit={chargeFile}>
            <input
              type="file"
              onChange={onChangeFiles}
              className='text-slate-400 rounded-[50px] file:cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:p-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 bg-white drop-shadow-md mr-2 p-1 w-full mb-2' />
            {
              loaderUpload ?
                <div className="flex w-full mt-5 items-center m-auto justify-center text-center">
                  <RiLoader4Line className="animate-spin text-xl text-center text-slate-500 " />
                  <p className="text-slate-500 text-sm">subiendo archivo...</p>
                </div>
                :
                <button disabled={file && grado && curso ? false : true} className={`${file && grado && curso ? 'bg-green-500 cursor-pointer' : 'bg-slate-300'} p-2 hover:p-3 hover:text-md text-sm  rounded-[50px] text-white hover:opacity-80 duration-300 w-full cs:w-[150px] cursor-pointer mb-2`}>subir archivo</button>
            }
          </form>
        </div>
        <div className={`${archivosAulaVirtual.length === 0 && 'h-[300px]'} border-y-[1px] border-slate-300   mb-10`}>
          <div className='relative z-10 flex justify-start items-center mb-10 mt-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
            </LocalizationProvider>
          </div>

          {
            loaderAulaVirtual ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">buscando resultados...</p>
              </div>
              :
              <div>
                {
                  archivosAulaVirtual.length > 0 ?
                    <ul className='grid xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 cs:grid-cols-3 gap-10 items-center mb-10'>

                      {archivosAulaVirtual?.map((archivo, index) => {
                        return (
                          <li key={index} className='grid justify-center items-center m-auto'>
                            <a target="_blank" className='' rel="noopener noreferrer" href={`${archivo.url}`}>
                              <LuFileSpreadsheet className='text-[50px] m-auto text-green-700' />
                              <div className='text-center'>
                                <p className='text-slate-600'>{archivo.nombreArchivo}</p>
                                <p className='text-slate-700 uppercase text-sm'>{archivo.nombreCurso}</p>
                                <p className='text-slate-400'>{convertGrade(`${archivo.grado}`)}</p>
                              </div>

                            </a>
                          </li>

                        )
                      })}

                    </ul>
                    :
                    <div className='w-full grid justify-center m-auto items-center text-slate-600 text-xl'>
                      <p>no se encontraron resultados</p>
                    </div>
                }
              </div>
          }
        </div>
      </div>


    </div>
  )
}

export default AulaVirtual
AulaVirtual.Auth = PrivateRouteProfesores