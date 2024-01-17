import { useGlobalContext } from '@/features/context/GlobalContext';
import useNavbarSearch from '@/features/hooks/useNavbarSearch';
import useSidebarState from '@/features/hooks/useSidebarState';
import { convertGrade, valiteGrade } from '@/utils/validateGrade';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";


const NavbarWeb = () => {
  const initialValue = { dni: "" }
  const { pathname } = useRouter()
  const { showSidebarContext } = useSidebarState()
  const { showSidebar } = useGlobalContext()
  const [search, setSearch] = useState(initialValue)
  const { searchStudent } = useNavbarSearch()
  const { studentData } = useGlobalContext()
  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (search.dni.length === 8) {
      searchStudent(search.dni)
      setSearch(initialValue)
    }
  }, [search.dni])
  return (
    <div className='w-full flex justify-between h-[70px] shadow-md bg-white'>
      <div onClick={() => showSidebarContext(!showSidebar)} className=' bg-blue-400 w-[60px] flex justify-center items-center '>
        <TiThMenu className='text-white text-3xl cursor-pointer' />
      </div>

      {pathname === "/registros-de-asistencias" ?
        <div className='relative w-full flex justify-center items-center px-5'>

          <input
            onChange={onChangeInputSearch}
            value={search.dni}
            type="text"
            name="dni"
            placeholder='escanea o digita el codigo'
            className='p-3 w-full border-[1px] outline-none border-cyan-700 rounded-md'
          />
          {
            studentData ?
              <div className='z-[1000] p-3 absolute top-[58px] w-[94%] bg-white'>
                <div className='flex justify-end '>
                  <div className='rounded-full bg-red-400 shadow-md w-[30px] h-[30px] mb-3 cursor-pointer'>
                    <p className='m-auto text-white flex justify-center items-center leading-7 font-semibold'>X</p>
                  </div>
                </div>
                <div className='p-3 shadow-md bg-blue-50 flex justify-between'>
                  <div>
                    <div className='text-slate-500'>DNI: {studentData.dni}</div>
                    <div className='text-slate-600 uppercase'>{studentData.lastname} {studentData.name}</div>
                  </div>
                  <div>
                    <div className='text-slate-600 uppercase'>grado: {convertGrade(`${studentData.grade}`)}</div>
                    <div className='text-slate-600 uppercase'>sección: {studentData.section}</div>
                  </div>

                </div>
              </div>
              :
              null
          }
        </div>
        :
        null
      }

    </div>
  )
}

export default NavbarWeb