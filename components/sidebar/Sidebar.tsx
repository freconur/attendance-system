import useSidebarState from "@/features/hooks/useSidebarState"
import SidebarInfoUser from "./SidebarInfoUser"
import SidebarList from "./SidebarList"
import { GlobalContext, useGlobalContext } from "@/features/context/GlobalContext"
import useAuthentication from "@/features/hooks/useAuthentication"
import SidebarAulaVirtualInfo from "./SidebarAulaVirtualInfo"


interface Props {
  showSidebar: boolean
  closeSidebar: React.RefObject<HTMLDivElement>,
}

const Sidebar = ({ closeSidebar, showSidebar }: Props) => {
  const { showSidebarContext } = useSidebarState()
  const { logout } = useAuthentication()
  const { validateUserAulavirtual } = useGlobalContext()
  return (
    <div ref={closeSidebar} className={`z-[2000] grid-rows-gridRows justify-evenly grid fixed duration-300 drop-shadow-xl h-full w-[250px] bg-white  ${showSidebar ? "left-[0px]" : "-left-[300px]"}`}>
      {validateUserAulavirtual === false ?
        <SidebarInfoUser />
        :
        <SidebarAulaVirtualInfo />
      }
      <SidebarList />
      <ul className='capitalize  p-1 font-comfortaa h-full px-2'>
        <li onClick={() => { logout(); showSidebarContext(false) }} className="rounded-sm text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-pastel14 hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <p className="my-1 w-56 p-2">
            <span className='text-base flex-1 ml-2 text-md'>cerrar sesión</span>
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar