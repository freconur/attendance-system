import useSidebarState from '@/features/hooks/useSidebarState'
import React from 'react'
import Link from "next/link";
import { useGlobalContext } from '@/features/context/GlobalContext';
import { useRouter } from 'next/router';
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual';

const SidebarAulaVirtual = () => {
  const { showListCursosAulavirutal } = useAulaVirtual()
  const { showCursosAulavirtual,showSidebar } = useGlobalContext()
  const { showSidebarContext } = useSidebarState()
  const { loadingAccount, warningAccount, instituciones, validateUserAulavirtual, dataAulavirtual, idInstitucion } = useGlobalContext()
  const router = useRouter()

  console.log('showCursosAulavirtual', showCursosAulavirtual)
  return (
    <div>
      {/* <ul className=' capitalize p-1 font-comfortaa  px-2'>
        <li className="rounded-md text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-green-300 hover:text-green-300 duration-300 mx-2 whitespace-nowrap drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
          </Link>
        </li>
      </ul> */}
      {/* <h3 className="uppercase  text-slate-500 font-semibold text-left pl-10 my-3">Profesores</h3> */}
      
      <ul className=' capitalize p-1 font-comfortaa  px-2'>
        <li onClick={() => showListCursosAulavirutal(showCursosAulavirtual)} >
          <div onClick={() => showListCursosAulavirutal(showCursosAulavirtual)} className="p-2 rounded-sm text-slate-600 text-sm items-center gap-x-4 cursor-pointer   capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap drop-shadow-lg block">
            <div className="my-1 w-56">
              {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
              <span className='text-base flex-1 ml-2 text-md'>Cursos</span>
            </div>
          </div>
          {
            showCursosAulavirtual &&
            <ul className='grid '>
              {/* esto tendria que venir de la base de datos de cada estudiante. */}
              <li className=' p-2 pl-10 hover:bg-slate-100 cursor-pointer'>matematicas</li>
              <li className=' p-2 pl-10 hover:bg-slate-100 cursor-pointer'>historia</li>
              <li className=' p-2 pl-10 hover:bg-slate-100 cursor-pointer'>quimica</li>
              <li className=' p-2 pl-10 hover:bg-slate-100 cursor-pointer'>literatura</li>
            </ul>
          }
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href={`/aula-virtual/estudiante/asistencia?dni=${dataAulavirtual.dni}&idInstitucion=${idInstitucion}`} className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Mi asistencia</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href={`/empleados/resumen-de-asistencia/${dataAulavirtual.dni}`} className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Cuaderno de control</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarAulaVirtual