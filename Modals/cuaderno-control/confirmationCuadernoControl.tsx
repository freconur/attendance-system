import { createPortal } from "react-dom"
import { useGlobalContext } from "@/features/context/GlobalContext";
import styles from './modal.module.css'
import { CuadernoControl, CuadernoControlCheckbox, UserData } from "@/features/types/types";
import { validateRolMessageWhatsapp } from "@/utils/validateRolEmployee";
import { useMensajeria } from "@/features/hooks/useMensajeria";
import { LuLoader2 } from "react-icons/lu";
import { useCuadernoControl } from "@/features/hooks/useCuadernoControl";
import { convertGrade, convertionValueToGrade } from "@/utils/validateGrade";

interface Props {
  setMessagesWhatsapp: React.Dispatch<React.SetStateAction<{ message: string, subject: string }>>
  selectedItems: string[],
  messagesWhatsapp: CuadernoControl,
}

const ConfirmationCuadernoControl = ({ setMessagesWhatsapp, selectedItems, messagesWhatsapp }: Props) => {
  const { handleShowModalConfirmationCuadernoControl, nuevaNotificacionCuadernoControl } = useCuadernoControl()
  const { sendMessageWhatsappLoader, userData, showModalConfirmationCuadernoControl } = useGlobalContext()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div>
            <h3 className=" text-slate-500 font-comfortaa font-semibold mb-5">Vista previa de mensaje a enviar:</h3>
            <div className={styles.groupEmisorReceptor}>
              <h4 >Mensaje será enviado a: </h4>
              <ul>
                {
                  selectedItems.map((rem, index) => {
                    return (
                      <li key={index} value={rem}> {convertGrade(rem)}</li>
                    )
                  })
                }

              </ul>
              {/* {remitentes(selectedItems)} */}
            </div>
            <div className={styles.containerTexto}>
              <p className={styles.titleTexto}>Texto:</p>
              <textarea
                rows={8}
                disabled
                placeholder="motivo de falta"
                name="justification"
                className={styles.texto}
                value={messagesWhatsapp.message}
              />
            </div>
            {
              sendMessageWhatsappLoader ?
                <div className="flex items-center justify-center">
                  <LuLoader2 className="animate-spin w-[20px] h-[20px] text-blue-500" />
                  <span className="text-blue-500">Enviando mensajes, espera porfavor.</span>
                </div>
                :
                <>
                  <div>
                    <h4 className="text-slate-400 text-center">Estás seguro de generar una nueva notificacion para cuaderno de control?, dale a SI para continuar</h4>
                  </div>
                  <div className={styles.buttonsContainer}>
                    {/* falta colocar la funcionalidad en el boton de onclick en la funciona useCuadernoControl */}
                    <button
                      onClick={() => handleShowModalConfirmationCuadernoControl(showModalConfirmationCuadernoControl)}
                      className={styles.optionButtonCancel}>cancelar
                      </button>
                    <button
                      //falta limpiar los checkbox y los daots de textbox y el input
                      onClick={() => {
                        nuevaNotificacionCuadernoControl(selectedItems, messagesWhatsapp);
                        setMessagesWhatsapp({ message: "", subject: "" })
                      }
                      }
                      className={styles.buttonSubmit}
                    >SI</button>
                  </div>
                </>
            }
          </div>
        </div>
      </div>,
      container
    )
    : null

}

export default ConfirmationCuadernoControl