import { useGlobalContext } from '@/features/context/GlobalContext'
import useSidebarState from '@/features/hooks/useSidebarState'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../assets/divino-maestro-logo.png'
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
    <div className=' border-b-[1px] border-slate-200 pt-5 pb-10'>
      <div className='flex justify-center items-center mb-3'>
          <Image
            className=''
            src={logo}
            alt="imagen de cabecera"
            priority
            width={70}
            height={70}
          />
      </div>
      <div>
        <p className='capitalize text-left ml-8 text-textTitulos font-semibold text-xl'>{institucionData.name}</p>
      </div>
      <div className='mt-1 w-full flex justify-center items-center'>
      </div>
      <div className='mt-1'><p className='capitalize text-left ml-8 text-textTitulos'>{dataAulavirtual.name} {dataAulavirtual.lastname} {dataAulavirtual.firstname}</p></div>
      <div className='mt-1'><p className='capitalize text-left ml-8 text-textTitulos'>{dataAulavirtual.dni}</p></div>
      {/* <div className='mt-1'><p className='capitalize text-center text-slate-400'>{validateRol(Number(userData.rol))}</p></div> */}
    </div>
  )
}

export default SidebarAulaVirtualInfo