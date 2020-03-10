import React from 'react'
import logoTest from './logo.svg'
import { NavLink } from 'react-router-dom'

export const LogoTest = ({ href = null, extraClass = '' }) => {
  return (
    <NavLink to={href} className={`sw-LogoTest ${extraClass}`}>
      <img className="sw-LogoTest_Image" src={logoTest} alt="" />
    </NavLink>
  )
}
