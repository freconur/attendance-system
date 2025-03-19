import { createPortal } from "react-dom"
import styles from './updateEvaluacion.module.css'
import { RiLoader4Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/features/context/GlobalContext";
import { useCursos } from "@/features/hooks/useCursos";
import { CursoById } from "@/features/types/types";

interface Props {
  handleShowModalDeleteCurso: () => void,
  idCurso: CursoById,
  setShowModalDeletecurso:React.Dispatch<React.SetStateAction<boolean>>
}
const DeleteCurso = ({ idCurso,setShowModalDeletecurso ,handleShowModalDeleteCurso }: Props) => {
  const initialValue = { id: "", name: "", nivel: "" }

  const { loaderAulaVirtual, cursoById } = useGlobalContext()
  const [validateDelete, setValidateDelete] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<CursoById>(initialValue)
  const { getCursoById, updateCursoById, deleteCursoById } = useCursos()

  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handleDeleteCurso = () => {
    deleteCursoById(`${idCurso.id}`)
  }

  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {
            loaderAulaVirtual ?
              <div className='grid items-center justify-center'>
                <div className='flex justify-center items-center'>
                  <RiLoader4Line className="animate-spin text-3xl text-colorTercero " />
                  <span className='text-colorTercero animate-pulse'>...borrando evaluación</span>
                </div>
              </div>
              :
              <>
                {
                  validateDelete ?
                    <>
                      <div className={styles.closeModalContainer}>
                        <div className={styles.close} onClick={() => { handleShowModalDeleteCurso(); }}>cerrar</div>
                      </div>
                      <div>
                        <h3 className={styles.tituloBotones}>¿Esta acción no se puede revertir, si estas seguro dale a continuar?</h3>
                        <div className='flex gap-3 justify-center items-center'>
                          <button onClick={() => { handleShowModalDeleteCurso(); }} className={styles.buttonCrearEvaluacion}>CANCELAR</button>
                          <button onClick={() => { handleDeleteCurso(); setShowModalDeletecurso(loaderAulaVirtual); }} className={styles.buttonDelete}>CONTINUAR</button>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div className={styles.closeModalContainer}>
                        <div className={styles.close} onClick={() => { handleShowModalDeleteCurso(); }}>cerrar</div>
                      </div>
                      <div>
                        <h3 className={styles.tituloBotones}>¿Quieres eliminar este curso?</h3>
                        <div className='flex gap-3 justify-center items-center'>
                          <button onClick={() => { handleShowModalDeleteCurso(); }} className={styles.buttonCrearEvaluacion}>NO</button>
                          <button onClick={() => { setValidateDelete(!validateDelete) }} className={styles.buttonDelete}>SI</button>
                        </div>
                      </div>
                    </>

                }
              </>
          }
        </div>
      </div>,
      container
    )
    : null
}

export default DeleteCurso