import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import useSidebarState from '@/features/hooks/useSidebarState'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const SidebarAulaVirtualInfo = () => {

  const { dataAulavirtual, institucionData } = useGlobalContext()

  const { showSidebar } = useGlobalContext()
  const { showSidebarContext } = useSidebarState()

  // const { validateUserAulaVirutal } = useAulaVirtual()
  //   const route = useRouter()

  //   useEffect(() => {
  //     validateUserAulaVirutal({dni:`${route.query.dni}`, institucion:`${route.query.idInstitucion}`})
  //   },[route.query.dni, route.query.idInstitucion])

  return (
    <div className='my-2 border-b-[1px] border-slate-200 '>
      <div className='flex justify-end'>
        <div
          onClick={() => showSidebarContext(!showSidebar)}
          className='p-3 w-[30px] h-[30px] bg-green-500 rounded-full cursor-pointer flex justify-center items-center text-white font-semibold mr-[-10px]'
        >
          X
        </div>
      </div>
      <div>
        <p className='capitalize text-left ml-8 text-slate-600 text-xl'>{institucionData.name}</p>
      </div>
      <div className='mt-1 w-full flex justify-center items-center'>
      </div>
      <div className='mt-1'><p className='capitalize text-left ml-8 text-slate-500'>{dataAulavirtual.name} {dataAulavirtual.lastname} {dataAulavirtual.firstname}</p></div>
      <div className='mt-1'><p className='capitalize text-left ml-8 text-slate-500'>{dataAulavirtual.dni}</p></div>
      {/* <div className='mt-1'><p className='capitalize text-center text-slate-400'>{validateRol(Number(userData.rol))}</p></div> */}
    </div>
  )
}

export default SidebarAulaVirtualInfo