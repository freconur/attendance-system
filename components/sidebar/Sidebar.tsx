import SidebarInfoUser from "./SidebarInfoUser"
import SidebarList from "./SidebarList"
import { useGlobalContext } from "@/features/context/GlobalContext"


interface Props {
  showSidebar:boolean
  closeSidebar: React.RefObject<HTMLDivElement>,
}

const Sidebar = ({closeSidebar,showSidebar}:Props) => {

  
  return (
    <div ref={closeSidebar} className={`z-[2000] fixed duration-300 drop-shadow-xl h-full w-[250px] bg-white  ${showSidebar ? "left-[0px]" : "-left-[300px]"}`}>
      <SidebarInfoUser />
      <SidebarList />
    </div>
  )
}

export default Sidebar