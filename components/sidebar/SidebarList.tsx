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

  return (
    <ul className='capitalize p-1 font-comfortaa h-full px-2'>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(false)} href="/asistencia" className="my-1 w-56 p-2">
          <RiBarChart2Fill className=" text-xl block float-left mr-3" />
          <span className='text-base flex-1 ml-2 text-md'>Tomar asistencia</span>
        </Link>
      </li>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(false)} href="/registro-de-estudiante" className="my-1 w-56 p-2">
          <RiBarChart2Fill className=" text-xl block float-left mr-3" />
          <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
        </Link>
      </li>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(false)} href="/registros-de-asistencias" className="my-1 w-56 p-2">
          <RiBarChart2Fill className=" text-xl block float-left mr-3" />
          <span className='text-base flex-1 ml-2 text-md'>registros de asistenci</span>
        </Link>
      </li>

      {/* <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <div className='flex justify-between items-center '>

        <Link onClick={sidebarProducts} href="" className="my-1 w-[200px] p-2">
          <BsFillBoxFill className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>productos</span>

        </Link>
        <Link onClick={sidebarProducts} href="">
        <RiArrowLeftSLine className='rotate-180 text-xl block float-left mr-3 w-[40px] pl-5' />

        </Link>
        </div>
      </li>

      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/registro-ventas" className="my-1 w-56 p-2">
          <MdPointOfSale className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}> Punto de venta</span>
        </Link>
      </li>
      
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/anulacion-venta" className="my-1 w-56 p-2">
          <TiTicket className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>Mis tickets</span>
        </Link>
      </li>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/ventas" className="my-1 w-56 p-2">
          <BiArchiveOut className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>ventas</span>
        </Link>
      </li> */}
    </ul>
  )
}

export default SidebarList