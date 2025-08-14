import useSidebarState from "@/features/hooks/useSidebarState"
import SidebarInfoUser from "./SidebarInfoUser"
import SidebarList from "./SidebarList"
import { GlobalContext, useGlobalContext } from "@/features/context/GlobalContext"
import useAuthentication from "@/features/hooks/useAuthentication"
import SidebarAulaVirtualInfo from "./SidebarAulaVirtualInfo"
import BackgroundSidebar from "./background-sidebar"
import { useRouter } from "next/router"
import styles from "./Sidebar.module.css"

interface Props {
  showSidebar: boolean
  closeSidebar: React.RefObject<HTMLDivElement>,
}

const Sidebar = ({ closeSidebar, showSidebar }: Props) => {
  const { showSidebarContext } = useSidebarState()
  const { logout } = useAuthentication()
  const { validateUserAulavirtual } = useGlobalContext()
  const router = useRouter()
  
  return (
    <div 
      ref={closeSidebar} 
      className={`${styles.sidebar} ${showSidebar ? styles.sidebarVisible : styles.sidebarHidden}`}
    >
      <BackgroundSidebar />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          {validateUserAulavirtual === false ? (
            <div>
              <SidebarInfoUser />
              <SidebarList />
            </div>
          ) : (
            <div>
              <SidebarAulaVirtualInfo />
              <SidebarList />
            </div>
          )}
        </div>
        
        <div className={styles.logoutSection}>
          <button 
            onClick={() => { 
              router.push('/login');
              logout(); 
              showSidebarContext(false) 
            }} 
            className={styles.logoutButton}
          >
            <span className={styles.logoutText}>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar