import useSidebarState from '@/features/hooks/useSidebarState'
import React from 'react'
import Link from "next/link";
import { useGlobalContext } from '@/features/context/GlobalContext';
import { useRouter } from 'next/router';
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual';

const SidebarAulaVirtual = () => {
  const { showListCursosAulavirutal } = useAulaVirtual()
  const { showCursosAulavirtual, showSidebar } = useGlobalContext()
  const { showSidebarContext } = useSidebarState()
  const { loadingAccount, warningAccount, instituciones, validateUserAulavirtual, dataAulavirtual, idInstitucion } = useGlobalContext()
  const router = useRouter()

  console.log('showCursosAulavirtual', showCursosAulavirtual)
  return (
    <div>
      <ul className='capitalize font-montserrat border-b-[1px] border-gray-200 py-10'>
        <li className='rounded-md text-gray-700 pl-2 text-sm flex items-center gap-x-4 cursor-pointer mt-2 capitalize hover:border-[1px] hover:border-blue-500 hover:text-blue-600 duration-300 mx-2 whitespace-nowrap drop-shadow-lg'>
          <Link onClick={() => showSidebarContext(false)} href={`/aula-virtual/estudiante/asistencia?dni=${dataAulavirtual.dni}&idInstitucion=${router.query.idInstitucion}`} className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>Mi asistencia</span>
          </Link>
        </li>
        <li className='rounded-md text-gray-700 pl-2 text-sm flex items-center gap-x-4 cursor-pointer mt-2 capitalize hover:border-[1px] hover:border-blue-500 hover:text-blue-600 duration-300 mx-2 whitespace-nowrap drop-shadow-lg'>
          <Link onClick={() => showSidebarContext(false)} href={`/aula-virtual/estudiante/aula-virtual?dni=${dataAulavirtual.dni}&idInstitucion=${router.query.idInstitucion}`} className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>Aula virtual</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarAulaVirtual