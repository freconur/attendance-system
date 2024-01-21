import useAuthentication from "@/features/hooks/useAuthentication";
import useSidebarState from "@/features/hooks/useSidebarState";
import Link from "next/link";
import { RiBarChart2Fill, RiArrowLeftSLine } from "react-icons/ri";
interface Props {
  showSidebar: boolean,
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  sidebarProducts: () => void
}
const SidebarList = () => {
  const { showSidebarContext } = useSidebarState()
  const { logout } = useAuthentication()

  return (
    <div>
      <h3 className="uppercase text-slate-500 font-semibold text-left pl-10 my-3">Asistencia</h3>
      <ul className='capitalize p-1 font-comfortaa h-full px-2'>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/asistencia" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Tomar asistencia</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/registro-de-estudiante" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/registros-de-asistencias" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
          </Link>
        </li>
      </ul>
      {/* <h3 className="uppercase text-slate-500 font-semibold text-left pl-10 my-3">Mis productos</h3> */}
      <ul className='capitalize p-1 font-comfortaa h-full px-2 border-t-[1px]'>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-go-3 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
          </Link>
        </li>
      </ul>

      <ul className='capitalize p-1 font-comfortaa h-full px-2'>
        <li onClick={() => { logout(); showSidebarContext(false) }} className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-pastel14 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <p className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>cerrar sesión</span>
          </p>
        </li>
      </ul>
    </div>


  )
}

export default SidebarList