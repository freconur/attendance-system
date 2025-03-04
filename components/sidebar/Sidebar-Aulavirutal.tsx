import React, { useState } from 'react'
import SidebarAulaVirtual from './SidebarAulaVirtual'
import SidebarInfoUser from './SidebarInfoUser'
import { useGlobalContext } from '@/features/context/GlobalContext'
import SidebarAulaVirtualInfo from './SidebarAulaVirtualInfo'


interface Props {
  showSidebar: boolean
}
const SidebarAulavirtual = ({ showSidebar }: Props) => {

  const [setShowSidebar] = useState(true)
  const { validateUserAulavirtual } = useGlobalContext()
  return (
    <div
      className={`z-[2000] grid-rows-gridRows justify-evenly grid fixed duration-300 drop-shadow-xl h-full w-[250px] bg-white  ${showSidebar ? "left-[0px]" : "-left-[300px]"}`}
    >
      <SidebarAulaVirtualInfo />
      <SidebarAulaVirtual />
      <ul className='capitalize  p-1 font-comfortaa h-full px-2'>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-pastel14 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <p className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>cerrar sesión</span>
          </p>
        </li>
      </ul>
    </div>
  )
}

export default SidebarAulavirtual