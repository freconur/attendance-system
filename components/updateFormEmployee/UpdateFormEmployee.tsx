import { useGlobalContext } from '@/features/context/GlobalContext'
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { Employee, Grades, StudentData, UpdateDataUser } from '@/features/types/types'
import { convertGrade } from '@/utils/validateGrade'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useRef, useState } from 'react'
import QRCode from 'react-qr-code'

interface Props {
  employee: UpdateDataUser,
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
}

const UpdateFormEmployee = ({ employee, onChangeItem }: Props) => {
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
  const { updateStudentData } = UseRegisterStudents()
  const { updateStudentConfirmationModal } = useGlobalContext()
  const { confirmationUpdateEmployee } = useAttendanceEmployee()
  const [warning, setWarning] = useState(initialvalueWarning)
  const handleSubmit = () => {
    setWarning(initialvalueWarning)
    if (employee.numberPhone) {
      if (employee.numberPhone.length === 9) {
        console.log('completo')
        //aqui debe ir la funcion que va actualizar la data del usuario
        confirmationUpdateEmployee(true)
        
      } else {
        setWarning({
          ...warning,
          numberPhone: "*número de celular debe tener 9 digitos"
        })
      }
    }else {
      confirmationUpdateEmployee(true)
    }
  }
  return (
    <div className='w-[100%] xs:w-[70%] uppercase m-auto'>
      <div className=''>

        <div className='block w-full'>
          <p className='text-slate-600 '>dni:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="dni" value={employee?.dni} disabled={true} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>nombres:</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="name" value={employee?.name} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>apellidos paterno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="lastname" value={employee?.lastname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>apellidos materno</p>
          <input onChange={onChangeItem} className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="firstname" value={employee?.firstname} />
        </div>
        <div className='block'>
          <p className='text-slate-600 '>número celular</p>
          <input onChange={onChangeItem} type='number' className='w-full rounded-md text-slate-500 border-[1px] p-1 ' name="numberPhone" value={employee?.numberPhone} />
          {
            warning.numberPhone &&
            <p className='text-sm text-red-500 lowercase'>{warning.numberPhone}</p>
          }
        </div>

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
        {/* <button onClick={handleSubmit} className='p-3 w-full rounded-md bg-amber-300 text-black capitalize font-semibold mt-3 shadow-md hover:bg-amber-200 duration-300'>actualizar</button> */}
      </div>
    </div>
  )
}

export default UpdateFormEmployee