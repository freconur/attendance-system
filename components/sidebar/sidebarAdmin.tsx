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

  const handleLinkClick = () => {
    showSidebarContext(false)
  }

  return (
    <div className="w-full">
      {/* Sección de cuenta personal */}
      <div className="mb-6">
        <ul className="space-y-2">
          <li className="rounded-lg bg-blue-50 backdrop-blur-sm border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
            <Link 
              onClick={handleLinkClick} 
              href="/mi-cuenta" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-sm font-medium">Mi Cuenta</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Sección de navegación principal */}
      <div className={styles.containerLista}>
        {/* Sección de Estudiantes */}
        <div className={styles.test} role="navigation">
          <ul>
            <li className={styles.dropdown}>
              <div className={styles.containerIcon}>
                <FaUserGraduate className={styles.icons} />
                <Link className={styles.ancla} href="#" aria-haspopup="true">
                  Estudiantes
                </Link>
              </div>
              <ul className={styles.dropdownContent} aria-label="submenu">
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/estudiantes/asistencia"
                    className={styles.anclaje}
                    id="ancla"
                  >
                    Asistencia
                  </Link>
                </li>
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/estudiantes/registro-de-estudiante"
                    id="ancla"
                    className={styles.anclaje}
                  >
                    Crear Usuario
                  </Link>
                </li>
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/estudiantes/registros-de-asistencias"
                    id="ancla"
                    className={styles.anclaje}
                  >
                    Registros
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Sección de Profesores */}
        <div className={styles.test} role="navigation">
          <ul>
            <li className={styles.dropdown}>
              <div className={styles.containerIcon}>
                <FaUserTie className={styles.icons} />
                <Link className={styles.ancla} href="#" aria-haspopup="true">
                  Profesores
                </Link>
              </div>
              <ul className={styles.dropdownContent} aria-label="submenu">
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/empleados/ingreso-salida-empleados"
                    className={styles.anclaje}
                    id="ancla"
                  >
                    Asistencia
                  </Link>
                </li>
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/empleados/asistencia-empleados"
                    id="ancla"
                    className={styles.anclaje}
                  >
                    Registros
                  </Link>
                </li>
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/empleados/registro-empleados"
                    id="ancla"
                    className={styles.anclaje}
                  >
                    Crear Usuario
                  </Link>
                </li>
                <li className={styles.containerAncla}>
                  <Link
                    onClick={handleLinkClick}
                    href="/administracion/empleados/cursos"
                    id="ancla"
                    className={styles.anclaje}
                  >
                    Cursos
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarAdmin