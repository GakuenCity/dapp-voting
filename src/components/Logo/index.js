import React from 'react'
import { LogoCore } from '../LogoCore'
import { LogoTest } from '../LogoTest'
import { constants } from '../../utils/constants'

export const Logo = ({ href = null, extraClass = '', networkBranch = '' }) => {
  switch (networkBranch) {
    case constants.TEST:
      return <LogoTest href={href} extraClass={extraClass} />
    case constants.CORE:
      return <LogoCore href={href} extraClass={extraClass} />
    default:
      return <LogoCore href={href} extraClass={extraClass} />
  }
}
