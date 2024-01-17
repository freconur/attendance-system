import { AttendanceRegister } from "../actions/actionAttendance"
import { useGlobalContextDispatch } from "../context/GlobalContext"



const useSidebarState = () => {
const dispatch = useGlobalContextDispatch()
  const showSidebarContext = (value: boolean) => {

    dispatch({type:AttendanceRegister.SHOW_SIDEBAR, payload: value})
  }

  return {showSidebarContext}
}

export default useSidebarState