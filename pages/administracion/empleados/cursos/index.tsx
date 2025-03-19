import { useGlobalContext } from '@/features/context/GlobalContext'
import { useCursos } from '@/features/hooks/useCursos'
import { useNewUser } from '@/features/hooks/useNewUser'
import { CursoById } from '@/features/types/types'
import DeleteCurso from '@/Modals/deleteCursos'
import UpdateCurso from '@/Modals/updateCursos'
import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdEditSquare } from 'react-icons/md'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CursosDocentes = () => {
  const { getCursos } = useNewUser()
  const { allCursos, userData, loaderAulaVirtual } = useGlobalContext()
  const [showModalCurso, setShowModalCurso] = useState<boolean>(false)
  const [showModalDeletecurso, setShowModalDeletecurso] = useState<boolean>(false)
  const [idCurso, setIdCurso] = useState<CursoById>({})
  const [valueCurso, setValueCurso] = useState<CursoById>({})
  const { addCurso } = useCursos()
  const handleShowModalDeleteCurso = () => {
    setShowModalDeletecurso(!showModalDeletecurso)
  }

  const handleChangeCurso = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCurso({ ...valueCurso, [e.target.name]: e.target.value })
  }
  const handleCurso = () => { addCurso(valueCurso); setValueCurso({name:""}) }
  const handleShowModalCurso = () => setShowModalCurso(!showModalCurso)
  useEffect(() => {
    getCursos(userData)
  }, [userData.dni])
  return (
    <div className='p-3'>
      <ToastContainer/>
      {
        showModalCurso &&
        <UpdateCurso setShowModalCurso={setShowModalCurso} handleShowModalCurso={handleShowModalCurso} idCurso={idCurso} />
      }
      {
        showModalDeletecurso &&
        <DeleteCurso handleShowModalDeleteCurso={handleShowModalDeleteCurso} idCurso={idCurso} setShowModalDeletecurso={setShowModalDeletecurso}/>
      }
      <h2 className='font-martianMono text-2xl text-sidebarColor uppercase font-semibold text-center py-10'>Cursos</h2>

      <div className='mb-10 flex justify-center gap-5'>
        <input
          type="text"
          className="p-3 rounded-sm text-slate-400 text-md outline-none w-full drop-shadow-lg"
          placeholder="NOMBRE DEL CURSO"
          name="name"
          onChange={handleChangeCurso}
          value={valueCurso.name}
        />
        <button
          className='bg-loginForm rounded-sm p-3 text-white w-[150px] hover:bg-buttonLogin duration-300 hover:duration-300 hover:rounded-2xl'
          onClick={handleCurso}
        >
          Agregar curso
        </button>
      </div>
      <div>

        <table className='w-[100%]  shadow-md m-auto'>
          <thead className='border-b-2 border-gray-200 bg-gradient-to-r from-colorTercero to-colorSecundario'>
            <tr className='text-textTitulos font-martianMono capitalize '>
              <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-center uppercase">#</th>
              {/* <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-center uppercase">id</th> */}
              <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-left uppercase">Nombre de curso</th>
              <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-left uppercase w-[60px]"></th>
              {/* <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-left uppercase">borrar</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {
              allCursos.map((curso, index) => {
                return (
                  <tr key={curso.id} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                    <td className='text-sm text-center font-dmMono border-r-[1px] border-slate-200'>{index + 1}</td>
                    {/* <td className='text-sm text-center font-dmMono border-r-[1px] border-slate-200'>{curso.id}</td> */}
                    <td className='pl-5 text-sm text-left font-dmMono border-r-[1px] border-slate-200'>{curso.name?.toLocaleUpperCase()}</td>
                    <td className='text-center h-full justify-center items-center flex w-[60px]'>
                      <MdEditSquare className='text-xl text-yellow-500 cursor-pointer h-full' onClick={() => { setIdCurso(curso); handleShowModalCurso() }} />
                      <MdDeleteForever onClick={() => {setIdCurso(curso); handleShowModalDeleteCurso(); }} className='text-xl text-red-500 cursor-pointer h-full' />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CursosDocentes