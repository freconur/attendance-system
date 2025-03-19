import { createPortal } from "react-dom"
import styles from './updateEvaluacion.module.css'
import { RiLoader4Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/features/context/GlobalContext";
import { useCursos } from "@/features/hooks/useCursos";
import { CursoById } from "@/features/types/types";

interface Props {
  handleShowModalCurso: () => void,
  idCurso: CursoById,
  setShowModalCurso: React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateCurso = ({ idCurso, handleShowModalCurso, setShowModalCurso }: Props) => {
  const initialValue = { id: "", name: "", nivel: "" }

  const { loaderAulaVirtual, cursoById } = useGlobalContext()
  const [inputValue, setInputValue] = useState<CursoById>(initialValue)
  const { getCursoById, updateCursoById, cleanCursoById } = useCursos()

  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handleActualizarCurso = () => {
    updateCursoById(inputValue)
  }
  const handleCleanCursoById = () => {
    setInputValue(initialValue)
  }
  useEffect(() => {
    setInputValue(idCurso)
  }, [idCurso.id])
console.log('loaderAulaVirtual', loaderAulaVirtual)
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
                <div className={styles.closeModalContainer}>
                  <div className={styles.close} onClick={() => { handleShowModalCurso(); handleCleanCursoById() }}>cerrar</div>
                </div>
                <h3 className={styles.title}>Editar Curso</h3>
                <div>
                  {/* <h3 className="text-xl text-white">{nameEva}</h3> */}
                  <label className="text-sm text-white font-martianMono">Curso</label>
                  <input
                    className={styles.inputNombresDni}
                    value={inputValue?.name}
                    name="name"
                    onChange={handleChangeInput}
                  />
                  <p className={styles.tituloBotones}>¿Quieres actualizar los datos de este usuario?</p>
                  <div className='flex gap-3 justify-center items-center'>

                    <button onClick={() => { handleShowModalCurso(); handleCleanCursoById() }} className={styles.buttonCrearEvaluacion}>CANCELAR</button>
                    <button onClick={() => {setShowModalCurso(loaderAulaVirtual); handleActualizarCurso(); handleCleanCursoById() }} className={styles.buttonDelete}>SI</button>

                  </div>

                </div>
              </>
          }
        </div>
      </div>,
      container
    )
    : null
}

export default UpdateCurso