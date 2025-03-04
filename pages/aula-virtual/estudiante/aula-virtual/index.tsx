'use client'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import { useUploadFiles } from '@/features/hooks/useUploadFiles'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { RiLoader4Line } from 'react-icons/ri'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { convertGrade } from '@/utils/validateGrade'

const Avirtual = () => {
  const { validateUserAulaVirutal } = useAulaVirtual()
  const route = useRouter()
  const { getFilesPorGrado } = useUploadFiles()
  const { dataAulavirtual, archivosAulaVirtual, loaderAulaVirtual } = useGlobalContext()
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  useEffect(() => {
    getFilesPorGrado(startDate.date(), startDate.month(), Number(dataAulavirtual.grade), `${route.query.idInstitucion}`)
  }, [dataAulavirtual.grade, startDate.date()])

  useEffect(() => {
    validateUserAulaVirutal({ dni: `${route.query.dni}`, institucion: `${route.query.idInstitucion}` })
  }, [route.query.dni, route.query.idInstitucion])

  console.log('archivosAulaVirtual', archivosAulaVirtual)
  return (
    <div className='p-10'>
      <div>
        <h1 className='text-2xl font-bold font-martianMono uppercase text-center text-slate-600 mb-10'>aula virtual</h1>
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
                          <ul className='grid grid-cols-4 gap-10 items-center mb-10'>
        
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

export default Avirtual