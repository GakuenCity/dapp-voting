import React from 'react'
import { IconAdd } from '../IconAdd'
import messages from '../../utils/messages'

export const ButtonAddBallot = ({ extraClassName = '', networkBranch, onClick }) => {
  return (
    <button
      className={`sw-ButtonAddBallot ${extraClassName} sw-ButtonAddBallot-${networkBranch}`}
      onClick={onClick}
      type="button"
    >
      {messages.ADDBALLOT}
      <IconAdd networkBranch={networkBranch} />
    </button>
  )
}
