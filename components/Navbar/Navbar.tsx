import React from 'react'
import { TiThMenu } from "react-icons/ti";

interface Props {
  showBurger: boolean,
  handleShowBurger: () => void
}
const Navbar = ({ showBurger, handleShowBurger }: Props) => {
  return (
    <div onClick={handleShowBurger} className='z-50 cursor-pointer fixed w-[40px] h-[40px] bg-teal-600 rounded-full shadow-lg bottom-5 right-5 grid place-content-center'>
      <TiThMenu className='text-white text-2xl'/>
    </div>
  )
}

export default Navbar