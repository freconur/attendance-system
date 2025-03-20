import { createPortal } from "react-dom"
import styles from './deleteEvaluacion.module.css'
import { useState } from "react";
import { useGlobalContext } from "@/features/context/GlobalContext";
import UseRegisterStudents from "@/features/hooks/useRegisterStudents";

interface Props {
  id: string,
  showModalDeleteEstudiante: () => void
}
const DeleteEstudiante = ({ id, showModalDeleteEstudiante }: Props) => {
  const initialValue = { id: "", name: "", nivel: "" }

  const { loaderAulaVirtual, cursoById } = useGlobalContext()
  const [validateDelete, showValidateDelete] = useState<boolean>(false)
  const { deleteEstudiante } = UseRegisterStudents()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleDeleteEstudiante = () => {
    deleteEstudiante(id)
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {
            loaderAulaVirtual ?
              null
              :
              validateDelete ?
                <div className='grid items-center justify-center'>
                  <h4 className={styles.tituloBotones}>Esta acción no se puede deshacer, si estas seguro dale al boton de continuar</h4>
                  <div className='flex gap-3 justify-center items-center'>
                    <button className={styles.buttonCrearEvaluacion} onClick={() => { showModalDeleteEstudiante() }}>CANCELAR</button>
                    <button onClick={() => {  handleDeleteEstudiante();showModalDeleteEstudiante() }} className={styles.buttonDelete}>CONTINUAR</button>
                  </div>
                </div>
                :
                <div className='grid items-center justify-center'>
                  <h4 className={styles.tituloBotones}>¿Estas seguro que quieres eliminar este estudiante?</h4>
                  <div className='flex gap-3 justify-center items-center'>
                    <button onClick={() => { showModalDeleteEstudiante(); }} className={styles.buttonCrearEvaluacion}>CANCELAR</button>
                    <button onClick={() => { showValidateDelete(!validateDelete) }} className={styles.buttonDelete}>SI</button>
                  </div>
                </div>
          }
        </div>
      </div>,
      container
    )
    : null
}

export default DeleteEstudiante