import { useGlobalContext } from '@/features/context/GlobalContext';
import useNavbarSearch from '@/features/hooks/useNavbarSearch';
import useSidebarState from '@/features/hooks/useSidebarState';
import { convertGrade, valiteGrade } from '@/utils/validateGrade';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import useAuthentication from '@/features/hooks/useAuthentication';

const NavbarWeb = () => {
  const initialValue = { dni: "" }
  const { pathname } = useRouter()
  const { showSidebarContext } = useSidebarState()
  const { showSidebar } = useGlobalContext()
  const [search, setSearch] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const { searchStudent, closeSearchStudent, cleanSearchStudent } = useNavbarSearch()
  const { studentDataBySearch, employeeDataSearch } = useGlobalContext()
  const [showContainerStudent, setShowContainerStudent] = useState(false)
  
  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }
  
  useEffect(() => {
    if (search.dni.length === 8) {
      setIsLoading(true)
      searchStudent(search.dni)
        .finally(() => {
          setIsLoading(false)
          setSearch(initialValue)
        })
    }
  }, [search.dni])
  
  return (
    <nav className='w-full relative z-[100] flex justify-between items-center h-16 px-6 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'>
      {/* Botón del menú */}
      <button 
        onClick={() => showSidebarContext(!showSidebar)} 
        className='flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-200 group'
        aria-label="Abrir menú"
      >
        <HiOutlineMenu className='text-gray-700 text-2xl group-hover:text-gray-900 group-hover:scale-110 transition-all duration-200' />
      </button>

      {/* Barra de búsqueda */}
      {pathname.includes('administracion') && (
        <div className='relative flex-1 max-w-2xl mx-8'>
          <div className='relative'>
            <input
              onChange={onChangeInputSearch}
              value={search.dni}
              type="text"
              name="dni"
              placeholder='Escanea o digita el código DNI...'
              className='w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400'
              disabled={isLoading}
            />
            <div className='absolute inset-y-0 left-0 flex items-center pl-4'>
              {isLoading ? (
                <div className='w-5 h-5'>
                  <svg className='animate-spin w-5 h-5 text-blue-500' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                </div>
              ) : (
                <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              )}
            </div>
            
            {/* Indicador de loading en el input */}
            {isLoading && (
              <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
                <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
              </div>
            )}
          </div>

          {/* Resultado de búsqueda */}
          {Object.keys(studentDataBySearch).length !== 0 && (
            <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50'>
              {/* Header del resultado */}
              <div className='flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50'>
                <span className='text-sm font-medium text-gray-600'>Resultado de búsqueda</span>
                <button 
                  onClick={cleanSearchStudent}
                  className='flex items-center justify-center w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200'
                  aria-label="Cerrar búsqueda"
                >
                  <svg className='w-3 h-3 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>

              {/* Información del estudiante */}
              <Link 
                onClick={() => { setShowContainerStudent(false), cleanSearchStudent() }} 
                href={`/info/${studentDataBySearch.dni}`} 
                className='block p-4 hover:bg-gray-50 transition-colors duration-200'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='text-xs text-gray-500 font-medium mb-1'>
                      DNI: {studentDataBySearch.dni}
                    </div>
                    <div className='text-sm font-semibold text-gray-900 leading-tight'>
                      {studentDataBySearch.lastname} {studentDataBySearch.firstname} {studentDataBySearch.name}
                    </div>
                  </div>
                  <div className='text-right ml-4'>
                    <div className='inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium'>
                      {convertGrade(`${studentDataBySearch.grade}`)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Espaciador derecho para mantener el botón centrado cuando no hay búsqueda */}
      {!pathname.includes('administracion') && <div className='flex-1'></div>}
    </nav>
  )
}

export default NavbarWeb