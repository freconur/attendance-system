import { createPortal } from "react-dom";
import styles from './JustificacionFaltaConfirmationModal.module.css'
import { useGlobalContext } from "@/features/context/GlobalContext";
import useAttendanceRegister from "@/features/hooks/useAttendanceRegister";
import { JustificationValue } from "@/features/types/types";

interface Props {
  date:number,
  dniStudent:string,
  justificationValue:JustificationValue
}

const JustificacionFaltaConfirmationModal = ({date, dniStudent, justificationValue}: Props) => {
  const { justificacionFaltaConfirmationModal } = useGlobalContext()
  const { showJustificaconFaltaConfirmationModal, showJustificaconFaltaModal,justificarFalta } = useAttendanceRegister()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div className="w-full flex justify-center items-center ">
            <div>
              <h3 className="text-center text-slate-500 mb-5">Estas seguro que deseas justificar la falta del estudiante?</h3>
              <div className="mt-5 flex gap-5">
                <button onClick={() => showJustificaconFaltaConfirmationModal(false)} className=" uppercase font-semibold p-3 w-full text-red-400 duration-300">no</button>
                <button onClick={() => {justificarFalta(dniStudent,`${date}`, justificationValue); showJustificaconFaltaConfirmationModal(false); showJustificaconFaltaModal(false)}} className="uppercase font-semibold shadow-md rounded-md bg-yellow-300 p-3 w-full text-white">si</button>
              </div>
            </div>
          </div>

        </div>
      </div>,
      container
    )
    : null
}

export default JustificacionFaltaConfirmationModal