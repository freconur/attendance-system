import useSidebarState from '@/features/hooks/useSidebarState'
import Link from 'next/link'
import React from 'react'

interface Props {
  pathname:string
}
const SidebarTalleres = ({pathname}:Props) => {
  const { showSidebarContext } = useSidebarState()
  return (
    <>
    {
      pathname.includes('talleres') ?
      <>
      <h3 className="uppercase text-gray-600 font-semibold text-left pl-10 my-3">Talleres</h3>
                  <ul className=' capitalize p-1 font-comfortaa  px-2'>
                    <li className="rounded-sm text-gray-700 pl-2 text-sm flex items-center gap-x-4 cursor-pointer mt-2 capitalize hover:bg-blue-100 hover:text-blue-700 duration-300 whitespace-nowrap my-3 drop-shadow-lg">
                      <Link onClick={() => showSidebarContext(false)} href="/empleados/ingreso-salida-empleados" className="my-1 w-56 p-2">
                        {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
                        <span className='text-base flex-1 ml-2 text-md'>Asistencia</span>
                      </Link>
                    </li>
                    
                  </ul>
      </>
      :
      null
    }
    </>
    
  )
}

export default SidebarTalleres