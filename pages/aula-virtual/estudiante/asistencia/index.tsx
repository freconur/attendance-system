import { currentMonth, EnableMonths } from '@/dates/date'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useAulaVirtual } from '@/features/hooks/useAulaVirtual'
import useDetailsStudents from '@/features/hooks/useDetailsStudent'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import header from '../../../../assets/header-aula-virtual.jpg'

const AsistenciaAulaVirtual = () => {
  const [month, setMonth] = useState({ month: currentMonth() })
  const { getDetailsofAttendance } = useDetailsStudents()
  const { validateUserAulaVirutal, getDetailsofAttendanceAulaVirtual } = useAulaVirtual()
  const router = useRouter()
  const pdfRef = useRef(null)
  const { resumeAttendanceStudent, studentData, dataAulavirtual, idInstitucion } = useGlobalContext()
  useEffect(() => {
    // dataStudent(`${router.query.id}`)
    // getDetailsofAttendance(`${router.query.id}`, month.month)
    if (`${router.query.dni}`.length > 0 && `${router.query.idInstitucion}`.length > 0) {
      validateUserAulaVirutal({ dni: `${router.query.dni}`, institucion: `${router.query.idInstitucion}` })
      getDetailsofAttendanceAulaVirtual(`${router.query.dni}`, month.month, `${router.query.idInstitucion}`)
    }
  }, [router.query.dni, router.query.idInstitucion])

  const handleChangeValueMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth({
      ...month,
      [e.target.name]: e.target.value
    })
  }
  const onDownloadPdf = () => {
    const input: any = pdfRef.current
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('portrait', 'mm', 'a4', true)
      // const pdf = new jsPDF('landscape', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = canvas.width
      const imageHeight = canvas.height
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
      const imgX = (pdfWidth - imageWidth * ratio) / 2
      const imgY = 30
      pdf.addImage(imgData, 'PNG', imgX, imgY, imageWidth * ratio, imageHeight * ratio)
      pdf.save(`resumen-asistencia-${dataAulavirtual.name}.pdf`)

    })
  }
  // console.log('dataAulavirtual', dataAulavirtual)
  // console.log('idInstitucion', idInstitucion)
  // console.log('dataAula institucion', router.query.idInstitucion)
  console.log('resumeAttendanceStudent', resumeAttendanceStudent)
  return (
    <div className=''>
      <div className='grid relative  h-[350px]  bg-headerPsicolinguistica overflow-hidden drop-shadow-lg'>
        <div className='top-0 bottom-0 rigth-0 left-0 bg-green-700 z-[15] absolute w-full opacity-30'></div>
        <Image
          className='absolute object-cover h-[100%] w-full bottom-0 top-[0px] right-0 left-0 z-[10] opacity-80'
          src={header}
          alt="imagen de cabecera"
          // objectFit='fill
          priority
        />
        <div className='w-[60%] max-lg:w-[80%] max-xl:w-[80%] m-auto pt-20'>
          <div className='grid items-center justify-start mb-20'>
            <h1 className="text-textTitulos relative z-[20] text-3xl font-bold font-martianMono capitalize text-left">Asistencia de {dataAulavirtual.name} {dataAulavirtual.lastname} {dataAulavirtual.firstname}</h1>
          </div>
          {/* <button className='relative z-[20] p-3   text-textTitulos  rounded-sm drop-shadow-lg '>Agregar preguntas</button> */}
          <div className='w-full relative z-[20] grid items-center '>
            <div className='m-auto w-full'>
              {/* <div className='flex justify-end md:justify-between'> */}
              <div className='flex justify-between'>
                {/* <div className='flex justify-end md:justify-between'> */}
                <div onClick={onDownloadPdf} className=' rounded-md bg-gradient-to-r from-colorTercero to-colorSecundario text-center p-3 h-[50px] font-semibold text-white cursor-pointer capitalize drop-shadow-lg'>descargar pdf</div>
                {/* <div onClick={onDownloadPdf} className='hidden md:block rounded-md bg-gradient-to-r from-colorTercero to-colorSecundario text-center p-3 h-[50px] font-semibold text-white cursor-pointer capitalize drop-shadow-lg'>descargar pdf</div> */}
                <select className='p-3 bg-white rounded-md xm:w-[200px] mb-5 text-slate-400 drop-shadow-lg uppercase outline-none' onChange={handleChangeValueMonth} name="month" >
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

        </div>
      </div>
      {/* <div className=" w-[60%] m-auto pt-10"> */}
      <div className=" w-[90%] xm:w-[80%] m-auto pt-10 xl:w-[60%]">

        {/* <div className='w-full m-auto ' ref={pdfRef}>
          <div className='w-full m-auto flex justify-between'>
            <h3 className='text-xl text-slate-500 uppercase text-center mb-5'>asistencia de <span className='font-semibold'>{dataAulavirtual.name} {dataAulavirtual.lastname} {dataAulavirtual.firstname}</span></h3>
            <div className='text-xl text-blue-500 capitalize'><span className='text-slate-400 mr-3'>Mes:</span>{month.month}</div>
          </div>
          <div className='m-auto flex max-w-[1002px] flex-wrap rounded-md overflow-hidden border-[1px] border-slate-300 shadow-md'>
            {
              resumeAttendanceStudent?.map((item, index) => {
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

        </div> */}
        <div className='md:hidden w-[100%] m-auto flex justify-between mt-5'>
          {/* <div className='md:hidden w-[100%] md:w-[81%] m-auto flex justify-between mt-5'> */}
          {/* <h3 className='text-xl text-slate-500 uppercase mb-1'>asistencia de <span className='font-semibold'>{dataAulavirtual.name} {dataAulavirtual.lastname}</span></h3>
          <div className='text-xl text-blue-500 capitalize'><span className='text-slate-400 mr-3'>Mes:</span>{month.month}</div> */}
        </div>
        <table ref={pdfRef} className='w-[100%]  shadow-md m-auto'>
          {/* <table ref={pdfRef} className='w-[100%] max-md:w-[81%] shadow-md m-auto'> */}
          <thead className=' border-b-2 border-gray-200 bg-gradient-to-r from-colorTercero to-colorSecundario'>
            <tr className="text-textTitulos font-martianMono capitalize ">
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
                    <td className='text-sm text-center font-dmMono'>{item?.date}</td>
                    <td className='uppercase text-sm text-center font-dmMono'>{item?.day}</td>
                    <td className='text-center text-sm font-dmMono'>{item?.attendance}</td>
                    <td className='text-center font-dmMono'>{item?.departure}</td>
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
    </div>
  )
}

export default AsistenciaAulaVirtual