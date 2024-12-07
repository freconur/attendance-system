import Image from 'next/image'
import React from 'react'
// import Image from 'next/image'
const HeaderSection = () => {
  return (
    <>
      <Image
        className='hidden cz:block hover:opacity-95 duration-300 cursor-pointer'
        src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/header-landingpage-attendance.jpg?alt=media&token=d07c49f8-8a9f-4e48-85fb-e7d493d6577d"
        alt="imagen de alumno usando la computadora"
        priority
        width="1920"
        height="600"
      />
      <Image
        className='hover:opacity-95 duration-300 cursor-pointer cz:hidden'
        src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/header-movil-tablet.jpg?alt=media&token=b73ab192-500f-440d-8941-d8e2e017ae9d"
        alt="imagen de alumno usando la computadora"
        priority
        width="664"
        height="664"
      />
    </>
  )
}

export default HeaderSection