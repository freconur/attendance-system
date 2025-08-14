import { useGlobalContext } from '@/features/context/GlobalContext'
import { validateRol } from '@/utils/validateRolEmployee'
import Image from 'next/image'
import React from 'react'
import logo from '../../assets/divino-maestro-logo.png'
import styles from './SidebarInfoUser.module.css'

const SidebarInfoUser = () => {
  const { userData } = useGlobalContext()
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src={logo}
            alt="imagen de cabecera"
            priority
            width={70}
            height={70}
          />
      </div>
      <div>
        <p className={styles.institutionName}>{userData.institutionName}</p>
      </div>
      {/* <div className='mt-1 w-full flex justify-center items-center'>
        {userData.pictureProfile ?
          <div className='rounded-full h-[100px] w-[100px] shadow-md overflow-hidden'>
            <Image
              src={userData.pictureProfile as string}
              alt={userData.name as string}
              width={200}
              height={200}
              priority
            />
          </div>
          :
          <div className='bg-green-400 w-[100px] h-[100px] rounded-full m-auto flex justify-content items-center'>
            <p className='text-center text-4xl uppercase font-semibold m-auto'>{userData.name ? userData.name[0]: null}</p>
          </div>
        }
      </div> */}
      <div className={styles.userName}><p>{userData.name} {userData.lastname} {userData.firstname}</p></div>
      <div className={styles.userRole}><p>{validateRol(Number(userData.rol))}</p></div>
    </div>
  )
}

export default SidebarInfoUser