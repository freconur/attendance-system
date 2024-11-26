import React from 'react'
import FooterChatbot from '../footer/footerChatbot'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutLadingPage = ({ children }: Props) => {
  return (
    <>
      <div className='p-4'>
        <div className=' w-full'>
          <div className='m-auto  w-[100%] xl:w-[55%] '>
            {children}
          </div>
        </div>
      </div>
      <FooterChatbot />
    </>
  )
}

export default LayoutLadingPage