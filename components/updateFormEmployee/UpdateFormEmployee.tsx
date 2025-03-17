import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import { useNewUser } from '@/features/hooks/useNewUser'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { Curso, Employee, Grades, StudentData, UpdateDataUser, UserData } from '@/features/types/types'
import styles from './updateFormEmployee.module.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import { validateRol } from '@/utils/validateRolEmployee'

interface Props {
  employee: UpdateDataUser,
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
  setEmployee: (value: UpdateDataUser) => void
}

const UpdateFormEmployee = ({ employee, onChangeItem, setEmployee }: Props) => {
  const { getCursos } = useNewUser()
  const [showButtonAgregarCursos, setShowButtonAgregarCursos] = useState<boolean>(false)
  const [cursosProfesor, setCursosProfesor] = useState<Curso[]>([])
  const { allCursos, studentData, userData, updateStudentConfirmationModal } = useGlobalContext()
  const initialvalueWarning = {
    numberPhone: ""
  }
  const pdfRef = useRef(null)
  const onDownloadPdf = () => {
    const input: any = pdfRef.current
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('portrait', 'mm', 'a10', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = canvas.width
      const imageHeight = canvas.height
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
      const imgX = (pdfWidth - imageWidth * ratio) / 2
      const imgY = 5
      pdf.addImage(imgData, 'PNG', imgX, imgY, imageWidth * ratio, imageHeight * ratio)
      pdf.save(`codigos-qr.pdf`)

    })
  }

  useEffect(() => {
    //  AGREGA LOS CURSOS ACTRUALES DEL PROFESOR AL ESTADO CURSOPROFESOR
    // LA INFORMACION ME AYUDARA A TENER LOS VALORES INICIALES PARA PODER FITRAR LOS DATOS NUEVOS
    if (employee.misCursos) {
      setCursosProfesor(employee.misCursos)
    }
  }, [employee.misCursos])

  const deleteCursoProfesor = (curso: string) => {
    //elimina los cursos del profesor que se hayan agregados o los anteriores
    //ELIMINA LOS CURSOS DEL PROFESOR QUE SE HAYAN AGREGADO O LOS ANTERIORES
    const rtaCursos = cursosProfesor.filter((c) => c.id !== curso)
    // setCursosProfesor(rtaCursos)
    if (employee?.misCursos) {
      setEmployee({ ...employee, misCursos: rtaCursos })
    }
  }
  const { updateStudentData } = UseRegisterStudents()
  const { confirmationUpdateEmployee } = useAttendanceEmployee()
  const [warning, setWarning] = useState(initialvalueWarning)
  const handleSubmit = () => {
    setWarning(initialvalueWarning)
    if (employee.numberPhone) {
      if (employee.numberPhone.length === 9) {
        confirmationUpdateEmployee(true)
      } else {
        setWarning({
          ...warning,
          numberPhone: "*número de celular debe tener 9 digitos"
        })
      }
    } else {
      confirmationUpdateEmployee(true)
    }
  }
  const handleAddCursos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const rta = allCursos.find((c) => c.id === e.target.value)
    if (rta) {
      const cursoduplicado = employee.misCursos?.find((c) => c.id === rta.id)
      if (!cursoduplicado) {
        console.log('no se encontro curso y se añade a la lista de cursos')
        console.log('employee', employee)
        // setCursosProfesor([...cursosProfesor, { ...rta, newCurso: true }])
        //AGREGA NUEVOS CURSOS A LA PROPIEDAD DE MISCURSOS CON UNA NUEVA PROPIEDAD DE NEW CURSO PARA PODER IDENTIFICAR SE HA SIDO UNA ASIGNACION RECIENTE
        if (employee.misCursos) {
          // setEmployee({ ...employee, misCursos: [...employee?.misCursos, { ...rta, newCurso: true }] })
          setEmployee({ ...employee, misCursos: [...employee?.misCursos, { ...rta }] })
        }
        // setEmployee({ ...employee, misCursos: [...employee?.misCursos, { ...rta }] })

      }
    }
  }
  useEffect(() => {
    if (Number(userData.rol) === 4 && Number(studentData.rol) === 1) {
      getCursos(userData)
    }
  }, [studentData.rol])

  return (
    <div className='w-[100%] xs:w-[70%]  m-auto'>
      <div className=''>
        <div className='block w-full'>
          <p className='text-slate-600 uppercase '>dni:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="dni" value={employee?.dni} disabled={true} />
        </div>
        <div className='block'>
          <p className='text-slate-600 uppercase '>nombres:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="name" value={employee?.name} />
        </div>
        <div className='block'>
          <p className='text-slate-600 uppercase '>apellidos paterno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="lastname" value={employee?.lastname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 uppercase '>apellidos materno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="firstname" value={employee?.firstname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 uppercase '>número celular</p>
          <input onChange={onChangeItem} type='number' className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="celular" value={employee?.celular} />
          {
            warning.numberPhone &&
            <p className='text-sm text-red-500 lowercase'>{warning.numberPhone}</p>
          }
        </div>
        <div className='block'>
          <p className='text-slate-600 uppercase '>cargo</p>
          <input disabled onChange={onChangeItem} type='text' className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="numberPhone" value={validateRol(Number(employee?.rol))} />
          {
            warning.numberPhone &&
            <p className='text-sm text-red-500 lowercase'>{warning.numberPhone}</p>
          }
        </div>
        <div className='block'>
          {
            employee.misCursos &&
              employee.misCursos?.length > 0 ?
              <div>
                <h4 className={styles.titleCursos}>cursos asignados</h4>
                <ul className={styles.cursosList}>
                  {
                    employee.misCursos?.map((c, index) => {
                      return (
                        <li key={index} className={!c.newCurso ? styles.lista : styles.listaNuevosCursos}><span className={styles.labelLista}>{c.name}</span>
                          {
                            Number(userData.rol) === 4 ?
                              <span className={styles.deleteCurso} onClick={() => deleteCursoProfesor(`${c.id}`)}>x</span>
                              :
                              null
                          }

                        </li>
                      )
                    })
                  }
                </ul>

              </div>
              :
              <div>
                <h4 className={styles.titleCursos}>cursos asignados</h4>
                <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' disabled={true} placeholder='no hay cursos asignados' />
              </div>
          }
          {
            warning.numberPhone &&
            <p className='text-sm text-red-500 lowercase'>{warning.numberPhone}</p>
          }
        </div>
        {
          !showButtonAgregarCursos &&
          <div onClick={() => setShowButtonAgregarCursos(!showButtonAgregarCursos)} className={styles.buttonSubmit}>
            asignar nuevos cursos
          </div>
        }
        {
          showButtonAgregarCursos &&
          <div className='block'>
            <p className='text-red-400'>*selecciona los cursos que desees asignar al profesor</p>
            <select className={styles.selectCursos} onChange={handleAddCursos} name="misCursos">
              <option value="" >SELECCIONAR CURSOS</option>
              {allCursos?.map((curso) => {
                return (
                  <option key={curso.id} value={curso.id}>{curso.name}</option>
                )
              })}
            </select>
          </div>
        }
        <div className='mt-3'>
          <div onClick={onDownloadPdf} className='m-auto w-[200px]' ref={pdfRef}>
            <p className='font-semibold text-center w-full lowercase text-sm'>{employee.name} {employee.lastname}</p>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${employee.dni}`} />
          </div>
        </div>
        <button onClick={handleSubmit} className='p-3 w-full rounded-md bg-amber-300 text-black capitalize font-semibold mt-3 shadow-md hover:bg-amber-200 duration-300'>actualizar</button>
      </div>
    </div>
  )
}

export default UpdateFormEmployee