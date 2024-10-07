import React from 'react'
import Link from "next/link";
import useSidebarState from '@/features/hooks/useSidebarState';
import { useRouter } from 'next/router';
const SidebarAdmin = () => {
  const { showSidebarContext } = useSidebarState()
  const route = useRouter()
  return (
    <div>
      <>
        <ul className=' capitalize p-1 font-comfortaa  px-2'>
          <li className="rounded-md text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-green-300 hover:text-green-300 duration-300 mx-2 whitespace-nowrap drop-shadow-lg">
            <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1 w-56 p-2">
              <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
            </Link>
          </li>
        </ul>
      </>
      {
        route.pathname.includes('empleados') ?
          <>
            <h3 className="uppercase  text-slate-500 font-semibold text-left pl-10 my-3">Empleados</h3>
            <ul className=' capitalize p-1 font-comfortaa  px-2'>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/ingreso-salida-empleados" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>Asistencia</span>
                </Link>
              </li>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/asistencia-empleados" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>Registros de asistencia</span>
                </Link>
              </li>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/registro-empleados" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>agregar empleado</span>
                </Link>
              </li>

            </ul>
            <ul className='capitalize p-1 font-comfortaa px-2 border-t-[1px]'>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-go-3 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
                </Link>
              </li>
            </ul>
          </>
          :
          <>
            <h3 className="uppercase  text-slate-500 font-semibold text-left pl-10 my-3">Estudiantes</h3>
            <ul className=' capitalize p-1 font-comfortaa  px-2'>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/asistencia" className="my-1 w-56 p-2">
                  {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
                  <span className='text-base flex-1 ml-2 text-md'>Tomar asistencia</span>
                </Link>
              </li>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registro-de-estudiante" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
                </Link>
              </li>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registros-de-asistencias" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
                </Link>
              </li>
            </ul>
            <ul className='capitalize p-1 font-comfortaa px-2 border-t-[1px]'>
              <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-go-3 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1 w-56 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
                </Link>
              </li>
            </ul>
          </>
      }


    </div>
  )
}

export default SidebarAdmin