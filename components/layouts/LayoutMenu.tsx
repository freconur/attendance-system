import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Menu from '../Navbar/Menu'


interface Props {
  children:JSX.Element | JSX.Element[]
}
const LayoutMenu = ({children} : Props) => {
  const [showBurger, setShowBurger] = useState(false)
  const handleShowBurger = () => {
    setShowBurger(!showBurger)
  }
  return (
    <div className='relative'>
      <Navbar showBurger={showBurger} handleShowBurger={handleShowBurger} />
      <Menu showBurger={showBurger} handleShowBurger={handleShowBurger}/>
      {children}
    </div>
  )
}

export default LayoutMenu