import Link from 'next/link';
import React, { useEffect } from 'react'
import { TbCalendarUser } from "react-icons/tb";
import { GrBook } from "react-icons/gr";
import { MdOutlineFastfood } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import useAuthentication from '@/features/hooks/useAuthentication';
import { useGlobalContext } from '@/features/context/GlobalContext';
import { useMyProducts } from '@/features/hooks/useMyProducts';
const MisProductos = () => {
  const { getUserData } = useAuthentication()
  const { userData, validateMyProducts } = useGlobalContext()
  const { valideteMyProducts } = useMyProducts()
  useEffect(() => {
    getUserData()
    if (userData) {
      valideteMyProducts()
    }
  }, [userData.name])
  console.log('validateMyProducts', validateMyProducts)
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='my-10'>
        <h1 className='text-slate-600 uppercase font-semibold text-center text-2xl my-10'>mis productos</h1>
        <div className='flex flex-wrap items-center justify-center gap-10'>
          <div className=''>
            {
              validateMyProducts.attendance ?
                <div>
                  <Link href="/registros-de-asistencias" className='bg-cyan-400 hover:bg-cyan-500 duration-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center m-auto'>
                    <TbCalendarUser className='text-white text-[90px]' />
                  </Link>
                  <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>estudiantes</h2>
                </div>
                :
                <div>
                  <div className='bg-gray-300 duration-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
                    <TbCalendarUser className='text-white text-[90px]' />
                  </div>
                  <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>estudiantes</h2>
                </div>
            }
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
            {
              validateMyProducts.employeeAttendance ?
                <>
                  <Link href="/asistencia-de-empleados" className='bg-green-400 hover:bg-green-500 duration-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
                    <FaUserTie className='text-white text-[90px]' />
                  </Link>
                  <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>empleados</h2>
                </>
                :
                <>
                  <div className='bg-gray-300 rounded-full shadow-md w-[150px] h-[150px] flex justify-center items-center'>
                    <FaUserTie className='text-white text-[90px]' />
                  </div>
                  <h2 className='uppercase text-slate-400 font-semibold text-center my-3'>empleados</h2>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MisProductos