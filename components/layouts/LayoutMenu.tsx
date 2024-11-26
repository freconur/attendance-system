import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Menu from '../Navbar/Menu'
import NavbarWeb from '../Navbar/NavbarWeb'
import Sidebar from '../sidebar/Sidebar'
import useSidebarState from '@/features/hooks/useSidebarState'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useOnClickOutside from '@/features/hooks/useOnClickOutside'
import { useRouter } from 'next/router'
import useAuthentication from '@/features/hooks/useAuthentication'
import NavbarChatbot from '../Navbar/NavbarChatbot'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutMenu = ({ children }: Props) => {
  const route = useRouter()
  const closeSidebar = useRef<HTMLDivElement>(null)
  const { showSidebarContext } = useSidebarState()
  const { showSidebar } = useGlobalContext()
  const { getUserData } = useAuthentication()
  const { userData } = useGlobalContext()

  useEffect(() => {
    getUserData()
  }, [userData.dni])
  // console.log('layout', userData)
  const handleChangeStateSidebar = () => {
    showSidebarContext(false)
  }
  useOnClickOutside(closeSidebar, handleChangeStateSidebar)

  const showNavbar = () => {
    if (route.pathname === "/login" || route.pathname === "/mis-productos" || route.pathname.includes('resumen-consulta') || route.pathname === '/tareas' || route.pathname === '/cuaderno-de-control') {
      return (
        null
      )
    } else if (route.pathname === "/chatbot") {
        return(
          <>
          <NavbarChatbot/>
          </>
        )
    } else {
      return (
        <>
          <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />
          <NavbarWeb />
        </>
      )
    }
  }
  return (
    <div className='relative'>
      {showNavbar()}
      {/* {route.pathname === "/login" || route.pathname === "/mis-productos" || route.pathname.includes('resumen-consulta') || route.pathname === '/tareas' || route.pathname === '/cuaderno-de-control' ?
        null

        :
        <>
          <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />
          <NavbarWeb />
        </>
      } */}
      {/* <Navbar showBurger={showBurger} handleShowBurger={handleShowBurger} />
      <Menu showBurger={showBurger} handleShowBurger={handleShowBurger}/> */}
      {children}
    </div>
  )
}

export default LayoutMenu