import React, { useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Menu from '../Navbar/Menu'
import NavbarWeb from '../Navbar/NavbarWeb'
import Sidebar from '../sidebar/Sidebar'
import useSidebarState from '@/features/hooks/useSidebarState'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useOnClickOutside from '@/features/hooks/useOnClickOutside'
import { useRouter } from 'next/router'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutMenu = ({ children }: Props) => {
  const route = useRouter()
  const closeSidebar = useRef<HTMLDivElement>(null)
  const { showSidebarContext } = useSidebarState()
  const { showSidebar } = useGlobalContext()
  const handleChangeStateSidebar = () => {
    showSidebarContext(false)
  }
  useOnClickOutside(closeSidebar, handleChangeStateSidebar)
  return (
    <div className='relative'>
      {route.pathname === "/login"  || route.pathname === "/mis-productos" ?
        null :
        <>
          <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />
          <NavbarWeb />
        </>
      }
      {/* <Navbar showBurger={showBurger} handleShowBurger={handleShowBurger} />
      <Menu showBurger={showBurger} handleShowBurger={handleShowBurger}/> */}
      {children}
    </div>
  )
}

export default LayoutMenu