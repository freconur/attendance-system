import { useGlobalContext } from '@/features/context/GlobalContext'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { Grades, StudentData } from '@/features/types/types'
import { convertGrade } from '@/utils/validateGrade'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useRef, useState } from 'react'
import QRCode from 'react-qr-code'

interface Props {
  student: StudentData,
  grades: Grades[]
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
}

const UpdateFormStudnets = ({ grades, student, onChangeItem }: Props) => {
  const initialvalueWarning = {
    firstContact: "",
    secondContact: "",
    firstNumberContact: "",
    secondNumberContact: "",
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
  const { updateStudentData } = UseRegisterStudents()
  const { updateStudentConfirmationModal } = useGlobalContext()
  const [warning, setWarning] = useState(initialvalueWarning)
  const handleSubmit = () => {
    setWarning(initialvalueWarning)
    if (student.secondContact) {
      if (student.secondNumberContact?.length === 9) {
        if (student.firstContact) {
          if (student.firstNumberContact?.length === 9) {
            //aquideberia de ir la funcion principal
            setWarning(initialvalueWarning)
            updateStudentData(updateStudentConfirmationModal)
          } else {
            setWarning({
              ...warning,
              firstNumberContact: "*numero de contacto debe tener 9 digitos"
            })
          }
        } else {
          setWarning({
            ...warning,
            firstContact: "*nombre de contacto es necesario"
          })
        }

      } else {
        setWarning({
          ...warning,
          secondNumberContact: "*numero de contacto debe tener 9 digitos "
        })
      }
    } else {
      setWarning({
        ...warning,
        secondContact: "*numero de contacto es necesario"
      })
    }

    if (!student.secondContact && !student.secondNumberContact) {
      if (student.firstContact) {
        console.log('opcion 2: existe 1er')
        if (student.firstNumberContact?.length === 9) {
          setWarning(initialvalueWarning)
          //aquideberia de ir la funcion principal
          updateStudentData(updateStudentConfirmationModal)
        }
      } else {
        setWarning({
          ...warning,
          firstContact: "*numero de contacto es necesarioaa"
        })
      }
    }
  }
  return (
    <div className='w-[100%] xs:w-[70%] uppercase m-auto'>
      <div className=''>

        <div className='block w-full'>
          <p className='text-slate-600 '>dni:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="dni" value={student?.dni} disabled={true} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>nombres:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="name" value={student?.name} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>apellidos paterno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="lastname" value={student?.lastname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>apellidos materno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="firstname" value={student?.firstname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>grado</p>
          <select onChange={onChangeItem} name="grade" className="w-full border-[1px] text-slate-500 bg-white p-1 rounded-md">
            <option value={student.grade}>{convertGrade(`${student.grade}`)}</option>
            {
              grades?.map((grade, index) => {
                return (
                  <option key={index} value={grade.grade}>{grade.traditionalGrade}</option>
                )
              })
            }
          </select>
        </div>
        <div className='block'>
          <p className='text-slate-600 '>1er contacto</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="firstContact" value={student?.firstContact} />
          {warning.firstContact && <p className='lowercase text-red-400'>{warning.firstContact}</p>}

        </div>
        <div className='block'>
          <p className='text-slate-600 '>1er numero de contacto</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' type="number" name="firstNumberContact" value={student?.firstNumberContact} />
          {warning.firstNumberContact && <p className='lowercase text-red-400'>{warning.firstNumberContact}</p>}
        </div>
        <div className='block'>
          <p className='text-slate-600 '>2do contacto</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="secondContact" value={student?.secondContact} />
          {warning.secondContact && <p className='lowercase text-red-400'>{warning.secondContact}</p>}

        </div>
        <div className='block'>
          <p className='text-slate-600 '>2do numero de contacto</p>
          <input type="number" onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="secondNumberContact" value={student?.secondNumberContact} />
          {warning.secondNumberContact && <p className='lowercase text-red-400'>{warning.secondNumberContact}</p>}
        </div>

        <div className='mt-3'>
          <div onClick={onDownloadPdf} className='m-auto w-[200px]' ref={pdfRef}>
            <p className='font-semibold text-center w-full lowercase text-sm'>{student.name} {student.lastname}</p>
            <QRCode

              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${student.dni}`} />
          </div>
        </div>
        <button onClick={handleSubmit} className='p-3 w-full rounded-md bg-amber-300 text-black capitalize font-semibold mt-3 shadow-md hover:bg-amber-200 duration-300'>actualizar</button>
      </div>
    </div>
  )
}

export default UpdateFormStudnets