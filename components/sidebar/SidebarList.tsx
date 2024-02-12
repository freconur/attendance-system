import useAuthentication from "@/features/hooks/useAuthentication";
import useSidebarState from "@/features/hooks/useSidebarState";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiBarChart2Fill, RiArrowLeftSLine } from "react-icons/ri";
interface Props {
  showSidebar: boolean,
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  sidebarProducts: () => void
}
const SidebarList = () => {
  const route = useRouter()
  const { showSidebarContext } = useSidebarState()
  const { logout } = useAuthentication()
  // const validatePathnameSidebarList = () => {
  //   if (route.pathname === "/asistencia-empleados" || route.pathname === "/registro-de-asistencia-empleados") {
  //     return true
  //   } else {
  //     return false
  //   }

  //   if (route.pathname === "/resumen-de-asistencia" || route.pathname === "/registros-de-asistencias" || route.pathname === "/registro-de-etudiante" || route.pathname === "/asistencia" || route.pathname === "/info") {
  //     return true
  //   }
  // }

  return (
    <div className='overflow-y-scroll'>
      {/* {
        route.pathname === ""
      } */}
      <h3 className="uppercase  text-slate-500 font-semibold text-left pl-10 my-3">Asistencia</h3>
      <ul className=' capitalize p-1 font-comfortaa  px-2'>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/asistencia" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Tomar asistencia</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/estudiantes/asistencia-por-grado-seccion" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>Asistencia por grado</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/registro-de-estudiante" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
          </Link>
        </li>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-principal hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/estudiantes/registros-de-asistencias" className="my-1 w-56 p-2">
            {/* <RiBarChart2Fill className=" text-xl block float-left mr-3" /> */}
            <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
          </Link>
        </li>
      </ul>
      {/* <h3 claselsName="uppercase text-slate-500 font-semibold text-left pl-10 my-3">Mis productos</h3> */}
      <ul className='capitalize p-1 font-comfortaa px-2 border-t-[1px]'>
        <li className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-go-3 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={() => showSidebarContext(false)} href="/mis-productos" className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>mis productos</span>
          </Link>
        </li>
      </ul>
    </div>


  )
}

export default SidebarList