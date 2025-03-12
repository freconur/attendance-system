import React from 'react'
import Link from "next/link";
import useSidebarState from '@/features/hooks/useSidebarState';
import { useRouter } from 'next/router';
const SidebarAdmin = () => {
  const { showSidebarContext } = useSidebarState()
  const route = useRouter()
  return (
    <div className=' h-[360px]'>
      <>
        <ul className=' capitalize p-1 font-comfortaa  px-2 mb-3 '>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
            </Link>
          </li>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/mensajeria" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>mensajeria</span>
            </Link>
          </li>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/cuaderno-control" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>cuaderno control</span>
            </Link>
          </li>
        </ul>
      </>
      {
        route.pathname.includes('empleados') ?
          <div className='py-5 border-t-[1px] border-textTitulos'>
            {/* <h3 className="uppercase  text-textTitulos font-semibold text-left pl-10 my-3">Empleados</h3> */}
            <ul className=' capitalize p-1 font-comfortaa  px-2 mb-5'>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/ingreso-salida-empleados" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>Asistencia</span>
                </Link>
              </li>
              
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/asistencia-empleados" className="my-1 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>Registros</span>
                </Link>
              </li>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/registro-empleados" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>agregar empleado</span>
                </Link>
              </li>

            </ul>
            <ul className='capitalize p-1 font-comfortaa px-2 border-t-[1px]'>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
                </Link>
              </li>
            </ul>
          </div>
          :
          <div className='py-5 border-t-[1px] border-textTitulos'>
            <h3 className="uppercase  text-textTitulos font-semibold text-left pl-10 ">Estudiantes</h3>
            <ul className='capitalize font-montserrat  border-slate-200 mb-3'>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/asistencia" className="my-1  p-2">
                  {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
                  <span className='text-base flex-1 ml-2 text-md'>Tomar asistencia</span>
                </Link>
              </li>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registro-de-estudiante" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
                </Link>
              </li>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registros-de-asistencias" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
                </Link>
              </li>
            </ul>
            <ul className='capitalize font-montserrat  border-slate-200 mb-3'>
              <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1 p-2">
                  <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
                </Link>
              </li>
            </ul>
          </div>
      }


    </div>
  )
}

export default SidebarAdmin