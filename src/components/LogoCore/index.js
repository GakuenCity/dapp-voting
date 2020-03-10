import React from 'react'
import logoCore from './logo.svg'
import { NavLink } from 'react-router-dom'

export const LogoCore = ({ href = null, extraClass = '' }) => {
  return (
    <NavLink to={href} className={`sw-LogoCore ${extraClass}`}>
      <img className="sw-LogoCore_Image" src={logoCore} alt="" />
    </NavLink>
  )
}
