import React, { useState } from 'react'
import SidebarAulaVirtual from './SidebarAulaVirtual'
import SidebarInfoUser from './SidebarInfoUser'
import { useGlobalContext } from '@/features/context/GlobalContext'
import SidebarAulaVirtualInfo from './SidebarAulaVirtualInfo'
import Link from 'next/link'
import BackgroundSidebar from './background-sidebar'
import useSidebarState from '@/features/hooks/useSidebarState'
import { useRouter } from 'next/router'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'


interface Props {
  showSidebar: boolean
}
const SidebarAulavirtual = ({ showSidebar }: Props) => {

  const router = useRouter()
  const { salirAulaVirtual } = useAulaVirtual()
  const { showSidebarContext } = useSidebarState()


  const salir = () => {
    salirAulaVirtual()
    router.push("/aula-virtual?idInstitucion=l2MjRJSZU2K6Qdyc3lUz")
  }
  return (
    <div className={`z-[2000] grid-rows-gridRows justify-evenly grid fixed duration-300 drop-shadow-xl h-full w-[250px] bg-pastel11  ${showSidebar ? "left-[0px]" : "-left-[300px]"}`}>
      <BackgroundSidebar />
      {/* <div  className='absolute capitalize p-2 w-[30px] h-[30px] bg-colorBrand1 justify-center items-center flex rounded-full text-white l-10 cursor-pointer left-[235px] top-[30px] shadow-md'>x</div> */}
      <div onClick={() => showSidebarContext(!showSidebar)} className='absolute capitalize p-2 w-[30px] h-[30px] bg-colorBrand1 justify-center items-center flex rounded-full text-white l-10 cursor-pointer left-[235px] top-[10px] shadow-md'>x</div>
      <div>
        <SidebarAulaVirtualInfo />
        <SidebarAulaVirtual />
      </div>
      <ul className='capitalize font-montserrat border-b-[1px] border-slate-200 pb-5 mb-5'>
        <div onClick={salir} className="relative z-[10] ml-2 hover:border rounded-sm   duration-300 hover:border-red-300 p-3 h-[50px] font-montserrat hover:text-red-300 text-slate-600 w-[200px] cursor-pointer ">
          <p>Salir</p>
        </div>
      </ul>




    </div>
  )
}

export default SidebarAulavirtual