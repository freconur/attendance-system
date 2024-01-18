import { useGlobalContext } from '@/features/context/GlobalContext'
import useNavbarSearch from '@/features/hooks/useNavbarSearch'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { TbCalendarUser } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import Link from 'next/link';

const DetailsStudent = () => {
  const { searchStudent } = useNavbarSearch()
  const { studentData } = useGlobalContext()
  const router = useRouter()
  console.log('params', router)
  useEffect(() => {
    searchStudent(`${router.query.id}`)
  }, [router.query.id])

  return (
    <div>
      <div className='my-10 uppercase text-2xl text-slate-600 text-center '>{studentData.name} {studentData.lastname}</div>

      <div className='flex flex-wrap justify-center items-center gap-10'>
        <div>
        <Link href={`/info/${router.query.id}`} className='cursor-pointer rounded-full bg-green-400  w-[150px] h-[150px] flex justify-center items-center'>
          <ImProfile className='text-white text-[90px]'/>
        </Link>

          <div className='my-5'>
            <p className='text-center text-slate-400 uppercase font-semibold'>info de estudiante</p>
          </div>
        </div>
        <div>
        <Link href={`/resumen-de-asistencia/${router.query.id}`} className='cursor-pointer rounded-full bg-cyan-400  w-[150px] h-[150px] flex justify-center items-center'>
        <TbCalendarUser className='text-white text-[90px]'/>
        </Link>

          <div className='my-5'>
            <p className='text-center text-slate-400 uppercase font-semibold'>asistencia</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default DetailsStudent