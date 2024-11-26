import { currentYear } from '@/dates/date'
import React from 'react'

const FooterChatbot = () => {
  return (
    <div className='flex justify-center items-center w-[100%] h-[60px] bg-teal-500'>
      <p className='text-white font-dmMono'>
      Desarrollado por Mirasoft {currentYear()}
      </p>
      </div>
  )
}

export default FooterChatbot