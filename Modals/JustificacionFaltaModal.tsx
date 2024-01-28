import { createPortal } from "react-dom"
import styles from './JustificacionFaltaModal.module.css'
import { useGlobalContext } from "@/features/context/GlobalContext";
import JustificacionFaltaConfirmationModal from "./justificacionFaltaConfirmationModal";
import useAttendanceRegister from "@/features/hooks/useAttendanceRegister";
import { useEffect, useState } from "react";

interface Props {
  date:number,
  dniStudent:string
}

const JustificacionFaltaModal = ({date, dniStudent}:Props) => {
  const initialValue = { justification: "" }
  const { justificacionFaltaConfirmationModal } = useGlobalContext()
  const { showJustificaconFaltaConfirmationModal, showJustificaconFaltaModal } = useAttendanceRegister()
  const [justificationValue, setJustificationValue] = useState(initialValue)
  const [warning, setWarning] = useState("")
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleChangeJustificacion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJustificationValue({
      ...justificationValue,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (justificationValue.justification.length < 10) {
      setWarning("la justificacion debe tener al menos 10 caracteres")
    } else {
      setWarning("")
    }
  }, [justificationValue.justification])

  return container
    ? createPortal(
      <div className={styles.containerModal}>

        <div className={styles.containerSale}>
          {
            justificacionFaltaConfirmationModal ?
              <JustificacionFaltaConfirmationModal date={date} dniStudent={dniStudent} justificationValue={justificationValue}/>
              :
              null
          }
          <div className="w-full flex justify-center items-center ">
            <div>
              <h3 className="uppercase text-slate-500 font-semibold mb-5">Justificacion de falta de estudiante</h3>
              <div>
                <p className="text-slate-500 capitalize">Motivo:</p>
                <input
                  placeholder="motivo de falta"
                  name="justification"
                  className="mb-3 w-full rounded-md shadow-md p-3 bg-blue-50 text-slate-300 outline-none"
                  onChange={handleChangeJustificacion}
                  type="text"
                />
                {
                  warning ? <p className="text-red-600 text-[12px] ">*{warning}</p> : null
                }
              </div>
              <div className="mt-5 flex gap-5">
                <button  onClick={() => showJustificaconFaltaModal(false)} className="cursor-pointer uppercase font-semibold p-3 w-full text-red-400 duration-300">cancelar</button>
                <button disabled={warning ? true : false} onClick={() => showJustificaconFaltaConfirmationModal(!justificacionFaltaConfirmationModal)} className={`duration-300 uppercase font-semibold shadow-md rounded-md  p-3 w-full text-white ${warning ? "bg-blue-100 " : "bg-blue-500"}`}>justificar</button>
              </div>
            </div>
          </div>

        </div>
      </div>,
      container
    )
    : null

}

export default JustificacionFaltaModal