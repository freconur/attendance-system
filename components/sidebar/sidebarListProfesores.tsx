import useSidebarState from '@/features/hooks/useSidebarState'
import React from 'react'
import Link from "next/link";
import { useGlobalContext } from '@/features/context/GlobalContext';

const SidebarListProfesores = () => {
  const { showSidebarContext } = useSidebarState()
  const  { userData } = useGlobalContext()

  return (
    <div>
      <ul className=' capitalize p-1 font-comfortaa  px-2'>
        <li className="rounded-md text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-green-300 hover:text-green-300 duration-300 mx-2 whitespace-nowrap drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
          </Link>
        </li>
      </ul>
      <h3 className="uppercase  text-slate-500 font-semibold text-left pl-10 my-3">Profesores</h3>
      <ul className=' capitalize p-1 font-comfortaa  px-2'>
        {/* <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/profesores/tareas" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>Tareas</span>
          </Link>
        </li> */}
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/profesores/aula-virtual" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Aula virtual</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href={`/empleados/resumen-de-asistencia/${userData.dni}`} className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Mi asistencia</span>
          </Link>
        </li>
        {/* <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/profesores/mis-datos" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>Mis datos</span>
          </Link>
        </li> */}
        {/* <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/estudiantes/registros-de-asistencias" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
                </Link>
              </li> */}
      </ul>
    </div>
  )
}

export default SidebarListProfesores