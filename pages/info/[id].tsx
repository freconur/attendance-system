import { useGlobalContext } from '@/features/context/GlobalContext'
import useNavbarSearch from '@/features/hooks/useNavbarSearch'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TbCalendarUser } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import Link from 'next/link';
import PrivateRoutes from '@/components/layouts/PrivateRoutes';
import useAuthentication from '@/features/hooks/useAuthentication';

const Info = () => {
  const { getUserData } = useAuthentication()
  const [first, setfirst] = useState(true)
  const { dataStudent } = useNavbarSearch()
  const { studentData, userData } = useGlobalContext()
  const router = useRouter()
  useEffect(() => {
    // getUserData()
    if (userData) {
      dataStudent(`${router.query.id}`)
    }
  }, [router.query.id, userData.name])
  console.log('studentData', studentData)
  return (
    <div>
      <div className='my-10 uppercase text-2xl text-slate-600 text-center '>{studentData.name} {studentData.lastname}</div>

      <div className='flex flex-wrap justify-center items-center gap-10'>
        {studentData ?
          <div>
            <Link href={studentData.rol ? `/administracion/empleados/info/${router.query.id}` : `/administracion/estudiantes/info/${router.query.id}`} className='cursor-pointer rounded-full bg-tere  w-[150px] h-[150px] flex justify-center items-center'>
              <ImProfile className='text-white text-[90px]' />
            </Link>

            <div className='my-5'>
              <p className='text-center text-slate-400 uppercase font-semibold'>datos de usuario</p>
            </div>
          </div>
          :
          null
        }

        {/* <div>
          <Link href={`/estudiantes/resumen-de-asistencia/${router.query.id}`} className='cursor-pointer rounded-full bg-gb-2  w-[150px] h-[150px] flex justify-center items-center'>
            <TbCalendarUser className='text-white text-[90px]' />
          </Link>

          <div className='my-5'>
            <p className='text-center text-slate-400 uppercase font-semibold'>asistencia</p>
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default Info
Info.Auth = PrivateRoutes