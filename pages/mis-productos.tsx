import Link from 'next/link';
import React from 'react'
import { TbCalendarUser } from "react-icons/tb";
import { GrBook } from "react-icons/gr";
import { MdOutlineFastfood } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
const MisProductos = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='my-10'>
        <h1 className='text-slate-600 uppercase font-semibold text-center text-2xl my-10'>mis productos</h1>
        <div className='flex flex-wrap items-center justify-center gap-10'>
          <div>
          <Link href="/registros-de-asistencias" className='bg-cyan-400 hover:bg-cyan-500 duration-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
            <TbCalendarUser className='text-white text-[90px]' />
          </Link>
            <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>asistencia</h2>
          </div>
          <div>
          <Link href="/mis-productos" className='bg-gray-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
            <GrBook className='text-white text-[90px]' />
          </Link>
            <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>notas</h2>
          </div>
          <div>
          <Link href="/mis-productos" className='bg-gray-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
            <MdOutlineFastfood className='text-white text-[90px]' />
          </Link>
          <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>comedor</h2>
          </div>
          <div>
          <Link href="/mis-productos" className='bg-gray-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
            <FaUserTie className='text-white text-[90px]' />
          </Link>
          <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>profesores</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MisProductos