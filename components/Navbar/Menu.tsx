import Link from 'next/link'
import React from 'react'

interface Props {
  showBurger: boolean,
  handleShowBurger: () => void
}
const Menu = ({ showBurger, handleShowBurger }: Props) => {
  return (
    <div className='relative z-50'>
      <ul className={`fixed ${showBurger ? "top-0 bottom-0 right-0 left-0" : "-left-[700px]"} md:hidden duration-300 bg-teal-100 text-navbar  flex flex-wrap md:flex-nowrap  text-[30px] md:text-[20px] font-semibold font-nunito  text-xl capitalize`}>
        <li onClick={handleShowBurger} className='text-teal-700 text-3xl hover:text-white hover:bg-teal-400 hover:text-navbar duration-300 cursor-pointer w-full md:h-full  flex justify-center items-center md:px-[30px]'>
          <Link className='w-full h-full flex justify-center items-center' href="/asistencia">asistencia</Link>
        </li>
        <li onClick={handleShowBurger} className='text-teal-700 text-3xl hover:text-white hover:bg-teal-400 hover:text-navbar duration-300 cursor-pointer w-full md:h-full  flex justify-center items-center md:px-[30px]'>
          <Link className='w-full h-full flex justify-center items-center' href="/registros-de-asistencias">registros</Link>
        </li>
        <li onClick={handleShowBurger} className='text-teal-700 text-3xl hover:text-white hover:bg-teal-400 hover:text-navbar duration-300 cursor-pointer w-full md:h-full  flex justify-center items-center md:px-[30px]'>
          <Link className='w-full h-full flex justify-center items-center' href="registro-de-estudiante">estudiante</Link>
        </li>
      </ul>

      <ul className={`fixed grid overflow-hidden place-content-stretch bg-teal-100 shadow-lg h-[200px] duration-300 rounded-lg w-[150px] ${showBurger ? "right-[20px] bottom-[70px]" : "-right-[700px] bottom-[70px]"} hidden md:block`}>
      <li onClick={handleShowBurger} className='cursor-pointer w-full h-[33.3%] hover:bg-teal-400 duration-300 hover:text-white uppercase font-semibold text-teal-700'>
          <Link className='w-full h-full flex justify-center items-center' href="/asistencia">asistencia</Link>
        </li>
        <li onClick={handleShowBurger} className='cursor-pointer w-full h-[33.3%] hover:bg-teal-400 duration-300 hover:text-white uppercase font-semibold text-teal-700'>
          <Link className='w-full h-full flex justify-center items-center' href="/registros-de-asistencias">registros</Link>
        </li>
        <li onClick={handleShowBurger} className='cursor-pointer w-full h-[33.3%] hover:bg-teal-400 duration-300 hover:text-white uppercase font-semibold text-teal-700'>
          <Link className='w-full h-full flex justify-center items-center' href="registro-de-estudiante">estudiante</Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu