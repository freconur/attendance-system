import { createPortal } from "react-dom"
import { useGlobalContext } from "@/features/context/GlobalContext";
import styles from './modal.module.css'
import { UserData } from "@/features/types/types";
import { validateRolMessageWhatsapp } from "@/utils/validateRolEmployee";
import { useMensajeria } from "@/features/hooks/useMensajeria";
import { LuLoader2 } from "react-icons/lu";
interface Props {
  selectedItems: string[],
  userData: UserData,
  messagesWhatsapp: { message: string },
  confirmationSendMessageWhatsapp: (value: boolean) => void,
  showModalConfirmationSendMessageWhatsapp: boolean,
}

const ConfirmationSendMessageWhatsapp = ({ showModalConfirmationSendMessageWhatsapp, confirmationSendMessageWhatsapp, selectedItems, userData, messagesWhatsapp }: Props) => {
  const { mensajeriaEmpleados, } = useMensajeria()

  const { sendMessageWhatsappLoader } = useGlobalContext()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>

        <div className={styles.containerSale}>
          {/* <div className="w-full flex justify-center items-center "> */}
          <div>
            <h3 className=" text-slate-500 font-comfortaa font-semibold mb-5">Vista previa de mensaje a enviar:</h3>

            <div className={styles.groupEmisorReceptor}>
              <h4 >Mensaje será enviado a: </h4>
              <ul>
                {
                  selectedItems.map((item, index) => {
                    return (
                      <li key={item} className={styles.receptor}>{index + 1}- {validateRolMessageWhatsapp(Number(item))}</li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.containerTexto}>
              <p className={styles.titleTexto}>Texto:</p>
              <textarea
                rows={8}
                disabled
                placeholder="motivo de falta"
                name="justification"
                className={styles.texto}
                // type="text"
                value={messagesWhatsapp.message}
              />
            </div>

            {
              sendMessageWhatsappLoader ?
                // <span>...cargando</span>
                <div className="flex items-center justify-center">
                  <LuLoader2 className="animate-spin w-[20px] h-[20px] text-blue-500" />
                  <span className="text-blue-500">Enviando mensajes, espera porfavor.</span>
                </div>


                :
                <>
                  <div>
                    <h4 className="text-slate-400 text-center">Estás seguro de enviar el mensaje?, dale a SI para continuar</h4>
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button
                      onClick={() => confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)} className={styles.optionButtonCancel}>cancelar</button>
                    <button
                      className={styles.buttonSubmit}
                      onClick={() => {
                        mensajeriaEmpleados(sendMessageWhatsappLoader, selectedItems, userData, messagesWhatsapp.message)
                        // confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)
                      }}
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

export default ConfirmationSendMessageWhatsapp