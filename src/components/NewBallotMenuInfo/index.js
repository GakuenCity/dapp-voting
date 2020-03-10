import React from 'react'
import messages from '../../utils/messages'

export const NewBallotMenuInfo = ({ minThreshold, validatorsLength, keys, validatorLimitsMinThreshold, proxy }) => {
  return (
    <div className="mn-NewBallotMenuInfo">
      <h2 className="mn-NewBallotMenuInfo_Title">{messages.NEWBALLOTMENUINFOTITLE}</h2>
      <ul className="mn-NewBallotMenuInfo_List">
        <li className="mn-NewBallotMenuInfo_ListItem">
          {messages.newBallotMenuInfoListItem1(minThreshold, validatorsLength)}
        </li>
        <li className="mn-NewBallotMenuInfo_ListItem">{messages.newBallotMenuInfoListItem2(Number(keys))}</li>
        <li className="mn-NewBallotMenuInfo_ListItem">
          {messages.newBallotMenuInfoListItem3(Number(validatorLimitsMinThreshold))}
        </li>
        <li className="mn-NewBallotMenuInfo_ListItem">{messages.newBallotMenuInfoListItem4(Number(proxy))}</li>
      </ul>
    </div>
  )
}
