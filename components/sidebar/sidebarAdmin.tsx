import React, { useState } from 'react'
import Link from "next/link";
import useSidebarState from '@/features/hooks/useSidebarState';
import { useRouter } from 'next/router';
import styles from './sideBarList.module.css'
import { PiStudent } from "react-icons/pi";
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';
const SidebarAdmin = () => {
  const { showSidebarContext } = useSidebarState()
  const [showOpcionesEstudiantes, setShowOpcionesEstudiantes] = useState(false)
  const route = useRouter()
  console.log('showOpcionesEstudiantes', showOpcionesEstudiantes)
  return (
    <div className=' '>
      <>

        <ul className=' capitalize p-1 font-comfortaa  px-2 mb-3 '>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/mi-cuenta" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>mi cuenta</span>
            </Link>
          </li>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/mensajeria" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>mensajeria</span>
            </Link>
          </li>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/cuaderno-control" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>cuaderno control</span>
            </Link>
          </li>
        </ul>
      </>
      <div className={styles.containerLista}>

        <div className={styles.test} role="navigation">
          <ul >
            <li className={styles.dropdown}>
              <div className={styles.containerIcon}>

                <FaUserGraduate className={styles.icons} />
                <Link className={styles.ancla} href="" aria-haspopup="true">
                  Estudiantes
                  {/* <label>Estudiantes</label> */}
                </Link>
              </div>
              <ul className={styles.dropdownContent} aria-label="submenu">
                <li className={styles.containerAncla}><Link
                  onClick={() => showSidebarContext(false)}
                  href="/administracion/estudiantes/asistencia"
                  className={styles.anclaje}
                  id="ancla">Asistencia</Link></li>
                <li className={styles.containerAncla}><Link
                  onClick={() => showSidebarContext(false)}
                  href="/administracion/estudiantes/registro-de-estudiante"
                  id="ancla"
                  className={styles.anclaje} >Crear usuario</Link></li>
                <li className={styles.containerAncla}><Link
                  onClick={() => showSidebarContext(false)}
                  href="/administracion/estudiantes/registros-de-asistencias"
                  id="ancla"
                  className={styles.anclaje}>Registros</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.test} role="navigation">
          <ul>
            <li className={styles.dropdown}>
              <div className={styles.containerIcon}>
                <FaUserTie className={styles.icons} />
                <Link className={styles.ancla} href="" aria-haspopup="true">
                  Profesores
                  {/* <label>Estudiantes</label> */}
                </Link>
              </div>
              <ul className={styles.dropdownContent} aria-label="submenu">
                <li className={styles.containerAncla}>
                  <Link
                    onClick={() => showSidebarContext(false)}
                    href="/administracion/empleados/ingreso-salida-empleados"
                    className={styles.anclaje}
                    id="ancla">Asistencia</Link>
                </li>
                <li className={styles.containerAncla}><Link
                  onClick={() => showSidebarContext(false)}
                  href="/administracion/empleados/asistencia-empleados"
                  id="ancla"
                  className={styles.anclaje} >Registros</Link></li>
                <li className={styles.containerAncla}><Link
                  onClick={() => showSidebarContext(false)}
                  href="/administracion/empleados/registro-empleados"
                  id="ancla"
                  className={styles.anclaje}>Crear usuario</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <ul className={styles.contenedorGeneralEstudiantes}>
          <li className={styles.containerListaEstudiantes} >Estudiantes

            <ul className={styles.listaEstudiantes}>
              <li className='rounded-md text-textTitulos text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize  duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/asistencia" className={styles.hoverDecoration}>
                  Tomar asistencia
                </Link>
              </li>
              <li className='rounded-md text-textTitulos text-sm flex items-center gap-x-4 cursor-pointer mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registro-de-estudiante" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registrar estudiante</span>
                </Link>
              </li>
              <li className='rounded-md text-textTitulos text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
                <Link onClick={() => showSidebarContext(false)} href="/administracion/estudiantes/registros-de-asistencias" className="my-1  p-2">
                  <span className='text-base flex-1 ml-2 text-md'>registros de asistencia</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul> */}
      </div>

      {/* <div className='py-5 border-t-[1px] border-textTitulos'>
        <ul className=' capitalize p-1 font-comfortaa  px-2 mb-5'>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/ingreso-salida-empleados" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>Asistencia</span>
            </Link>
          </li>

          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/asistencia-empleados" className="my-1 p-2">
              <span className='text-base flex-1 ml-2 text-md'>Registros</span>
            </Link>
          </li>
          <li className='rounded-md text-textTitulos pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:border-[1px] hover:border-colorNavbar hover:text-colorNavbar duration-300 outline-none mx-2 whitespace-nowrap drop-shadow-lg'>
            <Link onClick={() => showSidebarContext(false)} href="/administracion/empleados/registro-empleados" className="my-1  p-2">
              <span className='text-base flex-1 ml-2 text-md'>agregar empleado</span>
            </Link>
          </li>

        </ul>
      </div> */}
    </div>
  )
}

export default SidebarAdmin