import Image from 'next/image'
import React from 'react'
import sidebarImage from '../../assets/sidebar-app-ugel.png'
const BackgroundSidebar = () => {
  return (
    <Image
        className='absolute bottom-0 top-0 right-0 left-0 z-1 opacity-50'
        src={sidebarImage}
        alt="foto de perfil"
        // fill
        width={250}
        height={1080}
      />
  )
}

export default BackgroundSidebar