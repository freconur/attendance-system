import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { EnableMonths, currentMonth } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import useDetailsStudents from '@/features/hooks/useDetailsStudent'
import useNavbarSearch from '@/features/hooks/useNavbarSearch'
import { DetailsPerDayOfStudent } from '@/features/types/types'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin'

const ResumenAsistencia = () => {

  const pdfRef = useRef(null)
  const { getUserData } = useAuthentication()
  const router = useRouter()
  const [month, setMonth] = useState({ month: currentMonth() })
  const { dataStudent } = useNavbarSearch()
  const { getDetailsofAttendance } = useDetailsStudents()
  const { resumeAttendanceStudent, studentData, userData } = useGlobalContext()

  const handleChangeValueMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth({
      ...month,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    getUserData()
    if (userData) {
      dataStudent(`${router.query.id}`)
      getDetailsofAttendance(`${router.query.id}`, month.month)
    }
    // dataStudent(`${router.query.id}`)
  }, [month, router.query.id, userData.name])

  const createCalendarOfAttendance = (resumeAttendanceStudents: DetailsPerDayOfStudent[]) => {
    // const lala = "holi"
    resumeAttendanceStudents?.map(item => {
      // console.log('item', item)
      return (
        <div className='text-slate-500'>{item.date}</div>
      )
    })
  }

  const onDownloadPdf = () => {
    const input: any = pdfRef.current
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = canvas.width
      const imageHeight = canvas.height
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
      const imgX = (pdfWidth - imageWidth * ratio) / 2
      const imgY = 30
      pdf.addImage(imgData, 'PNG', imgX, imgY, imageWidth * ratio, imageHeight * ratio)
      pdf.save(`resumen-asistencia-${studentData.name}.pdf`)

    })
  }
  console.log('resumeAttendanceStudent', resumeAttendanceStudent)
  return (
    <div className='p-2'>
      <div className='w-full'>
        <div className='m-auto  w-[100%] md:w-[81%] '>
          <div className='flex justify-end md:justify-between'>
            <div onClick={onDownloadPdf} className='hidden md:block rounded-md bg-red-300 text-center p-3 h-[50px] font-semibold text-white cursor-pointer capitalize'>descargar pdf</div>
            <select className='p-3 bg-white rounded-md w-[200px] mb-5 text-slate-400 shadow-md uppercase outline-none' onChange={handleChangeValueMonth} name="month" >
              <option value={month.month}>--{month.month}--</option>
              {
                EnableMonths().map((month, index) => {
                  return (
                    <option key={index} value={month}>{month}</option>
                  )
                })
              }
            </select>
          </div>

        </div>


      </div>

      {/* <div className='w-full m-auto hidden md:block' ref={pdfRef}> */}
      <div className='w-full m-auto ' ref={pdfRef}>
        <div className='max-w-[1002px] m-auto flex justify-between'>
          <h3 className='text-xl text-slate-500 uppercase text-center mb-5'>asistencia de <span className='font-semibold'>{studentData.name} {studentData.lastname} {studentData.firstname}</span></h3>
          <div className='text-xl text-blue-500 capitalize'><span className='text-slate-400 mr-3'>Mes:</span>{month.month}</div>
        </div>
        <div className='m-auto flex max-w-[1002px] flex-wrap rounded-md overflow-hidden border-[1px] border-slate-300 shadow-md'>
          {/* <div>
          {createCalendarOfAttendance(resumeAttendanceStudent)}
        </div> */}
          {
            resumeAttendanceStudent?.map((item, index) => {
              // console.log('item', item)
              return (
                <div key={item.date} className='text-slate-500 hover:bg-blue-50 cursor-pointer grow border-r-[1px] border-b-[1px] w-[200px] h-[130px] border-slate-300 p-1 bg-white'>
                  <div className='rounded-full w-[30px] h-[30px] bg-yellow-300 flex justify-center items-center'>
                    <div className='text-center m-auto'>
                      {item.date}
                    </div>
                  </div>
                  <div className="capitalize font-semibold">{item.day}</div>
                  <div className='text-[12px]'>Ing.: {item.attendance}</div>
                  <div className='text-[12px]'>Sal.: {item.departure}</div>
                </div>
              )
            })
          }
        </div>

      </div>
      <div className='md:hidden w-[100%] md:w-[81%] m-auto flex justify-between mt-5'>
        <h3 className='text-xl text-slate-500 uppercase mb-1'>asistencia de <span className='font-semibold'>{studentData.name} {studentData.lastname}</span></h3>
        <div className='text-xl text-blue-500 capitalize'><span className='text-slate-400 mr-3'>Mes:</span>{month.month}</div>
      </div>
      <table className='w-[100%] md:w-[81%] shadow-md mt-5 m-auto'>
        <thead className='bg-blue-100 border-b-2 border-gray-200 '>
          <tr className="text-slate-600 capitalize font-nunito ">
            <th className="py-3 md:p-2 pl-1 md:pl-2 text-sm text-center uppercase">fecha</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">dia</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">ingreso</th>
            <th className="py-3 md:p-2 text-sm text-center uppercase">salida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {
            resumeAttendanceStudent?.map((item) => {
              return (
                <tr key={item?.date} className='text-slate-500 h-[40px] hover:bg-hoverTableSale duration-100 cursor-pointer w-full'>
                  <td className='text-sm text-center'>{item?.date}</td>
                  <td className='uppercase text-sm text-center'>{item?.day}</td>
                  <td className='text-center text-sm'>{item?.attendance}</td>
                  <td className='text-center'>{item?.departure}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        resumeAttendanceStudent.length > 0 ?
          null
          :
          <><p className='text-center p-5 text-slate-400'>no existe registros de este mes</p></>
      }
    </div>
  )
}

export default ResumenAsistencia
ResumenAsistencia.Auth = PrivateRouteAdmin