import { useGlobalContext } from '@/features/context/GlobalContext'
import Image from 'next/image'
import React from 'react'

const SidebarInfoUser = () => {
  const { userData } = useGlobalContext()
  return (
    <div className='my-2 border-b-[1px] border-slate-200 '>
      <div>
        <p className='capitalize text-center text-slate-600 text-2xl'>{userData.institutionName}</p>
      </div>
      <div className='mt-1 w-full flex justify-center items-center'>
        {userData.pictureProfile ?
          <div className='rounded-full h-[100px] w-[100px] shadow-md overflow-hidden'>
            <Image
              src={userData.pictureProfile as string}
              alt={userData.name as string}
              width={200}
              height={200}
              priority
            />
          </div>
          :
          <div className='bg-green-400 w-[100px] h-[100px] rounded-full m-auto flex justify-content items-center'>
            <p className='text-center text-4xl uppercase font-semibold m-auto'>{userData.name ? userData.name[0]: null}</p>
          </div>
        }
      </div>
      <div className='mt-1'><p className='capitalize text-center text-slate-500'>{userData.name} {userData.lastname} {userData.firstname}</p></div>
      <div className='mt-1'><p className='capitalize text-center text-slate-400'>{userData.rol}</p></div>
    </div>
  )
}

export default SidebarInfoUser