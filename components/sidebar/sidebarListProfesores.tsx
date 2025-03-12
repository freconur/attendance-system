import useSidebarState from '@/features/hooks/useSidebarState'
import React from 'react'
import Link from "next/link";
import { useGlobalContext } from '@/features/context/GlobalContext';

const SidebarListProfesores = () => {
  const { showSidebarContext } = useSidebarState()
  const { userData } = useGlobalContext()

  return (
    <div>
      <ul className='capitalize font-montserrat border-b-[1px] border-slate-200 py-10'>
        <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
          <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1  p-2">
            <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
          </Link>
        </li>
        <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
          <Link onClick={() => showSidebarContext(false)} href="/profesores/aula-virtual" className="my-1  p-2">
            <span className='text-base flex-1 ml-2 text-md'>Aula virtual</span>
          </Link>
        </li>
        <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
          <Link onClick={() => showSidebarContext(false)} href={`/empleados/resumen-de-asistencia/${userData.dni}`} className="my-1  p-2">
            <span className='text-base flex-1 ml-2 text-md'>Mi asistencia</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarListProfesores