import useAuthentication from "@/features/hooks/useAuthentication";
import useSidebarState from "@/features/hooks/useSidebarState";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiBarChart2Fill, RiArrowLeftSLine } from "react-icons/ri";
import SidebarTalleres from "./sidebarTalleres";
import SidebarListProfesores from "./sidebarListProfesores";
import { useGlobalContext } from "@/features/context/GlobalContext";
import { validateRol } from "@/utils/validateRolEmployee";
import SidebarAdmin from "./sidebarAdmin";
import SidebarAulaVirtual from "./SidebarAulaVirtual";
interface Props {
  showSidebar: boolean,
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  sidebarProducts: () => void
}
const SidebarList = () => {
  const route = useRouter()
  const { showSidebarContext } = useSidebarState()
  const { userData, validateUserAulavirtual, dataAulavirtual } = useGlobalContext()
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
  // console.log('testing', route.pathname.split("/"))
  // console.log('test-2', route.pathname.split("/").find((profesores) => profesores === 'profesores'))
  const validateRoute = () => {
    const value = route.pathname.split("/").find((profesores) => profesores === "profesores")
    if (value) {
      return true
    } else {
      return false
    }
  }

  const sidebarListfrom = () => {
    if (validateRol(Number(userData.rol)) === "administracion" && validateUserAulavirtual === false) {
      return <SidebarAdmin />
    } else if (validateRol(Number(userData.rol)) === "profesor") {
      return <SidebarListProfesores />
    } else if (validateUserAulavirtual === true) {
      return <SidebarAulaVirtual />
    }
  }

  return (
    <div className='overflow-auto'>
      {sidebarListfrom()}
    </div>


  )
}

export default SidebarList