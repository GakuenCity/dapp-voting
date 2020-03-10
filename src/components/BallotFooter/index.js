import React from 'react'

import { ButtonFinalize } from '../ButtonFinalize'
import messages from '../../utils/messages'

export const BallotFooter = ({
  buttonText,
  buttonState,
  description = '',
  networkBranch,
  onClick,
  voteId,
  voteType,
  voted
}) => {
  return (
    <div className={`bc-BallotFooter bc-BallotFooter-${networkBranch}`}>
      <ButtonFinalize onClick={onClick} text={buttonText} state={buttonState} networkBranch={networkBranch} />
      {description ? <p className="bc-BallotFooter_Description">{description}</p> : null}
      {voted ? <div className="bc-BallotFooter_Voted">{messages.YOU_ALREADY_VOTED}</div> : null}
      <div className="bc-BallotFooter_ID">
        {voteType} {messages.BALLOTID}: <span className="bc-BallotFooter_voteID">{voteId}</span>
      </div>
    </div>
  )
}
