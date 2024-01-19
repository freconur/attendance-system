import { useGlobalContext } from '@/features/context/GlobalContext';
import useNavbarSearch from '@/features/hooks/useNavbarSearch';
import useSidebarState from '@/features/hooks/useSidebarState';
import { convertGrade, valiteGrade } from '@/utils/validateGrade';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { TfiMenu } from "react-icons/tfi";

const NavbarWeb = () => {
  const initialValue = { dni: "" }
  const { pathname } = useRouter()
  const { showSidebarContext } = useSidebarState()
  const { showSidebar } = useGlobalContext()
  const [search, setSearch] = useState(initialValue)
  const { searchStudent, closeSearchStudent, cleanSearchStudent } = useNavbarSearch()
  const { studentDataBySearch } = useGlobalContext()
  const [showContainerStudent, setShowContainerStudent] = useState(false)
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
    <div className='w-full flex justify-between h-[60px] shadow-md bg-white'>
      <div onClick={() => showSidebarContext(!showSidebar)} className=' bg-ggw-1 w-[60px] flex justify-center items-center '>
        <TfiMenu className='text-principal text-3xl cursor-pointer' />
      </div>

      {pathname === "/registros-de-asistencias" ?
        <div className='relative w-full flex justify-center items-center px-5'>

          <input
            onChange={onChangeInputSearch}
            value={search.dni}
            type="text"
            name="dni"
            // onClick={() => setShowContainerStudent(!showContainerStudent)}
            placeholder='escanea o digita el codigo'
            className='p-3 w-full border-[1px] outline-none border-cyan-700 rounded-md'
          />
          {
            Object.keys(studentDataBySearch).length !== 0 ?
              <div className='z-[1000] p-3 absolute top-[58px] w-[94%] bg-white'>
                <div className='flex justify-end '>
                  <div onClick={() => setShowContainerStudent(false)} className='rounded-full bg-red-400 shadow-md w-[30px] h-[30px] mb-3 cursor-pointer'>
                    <p className='m-auto text-white flex justify-center items-center leading-7 font-semibold'>X</p>
                  </div>
                </div>
                  <Link onClick={() => {setShowContainerStudent(false), cleanSearchStudent()}} href={`registros-de-asistencias/${studentDataBySearch.dni}`} className='p-3 shadow-md bg-blue-50 flex justify-between'>
                    <div>
                      <div className='text-slate-500'>DNI: {studentDataBySearch.dni}</div>
                      <div className='text-slate-600 uppercase'>{studentDataBySearch.lastname} {studentDataBySearch.name}</div>
                    </div>
                    <div>
                      <div className='text-slate-600 uppercase'>grado: {convertGrade(`${studentDataBySearch.grade}`)}</div>
                      <div className='text-slate-600 uppercase'>sección: {studentDataBySearch.section}</div>
                    </div>

                  </Link>
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