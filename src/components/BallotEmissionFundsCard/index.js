import React from 'react'
import { BallotCard } from '../BallotCard'
import { BallotDataPair } from '../BallotDataPair'
import { inject, observer } from 'mobx-react'
import messages from '../../utils/messages'

@inject('contractsStore')
@observer
export class BallotEmissionFundsCard extends React.Component {
  render() {
    const { id, votingState, pos, contractsStore } = this.props
    const amount = contractsStore.web3Instance.utils.fromWei(votingState.amount, 'ether')
    return (
      <BallotCard votingType="votingToManageEmissionFunds" votingState={votingState} id={id} pos={pos}>
        <BallotDataPair dataType="proposed-receiver" title={messages.PROPOSEDRECEIVER} value={[votingState.receiver]} />
        <BallotDataPair
          dataType="funds-amount"
          title={messages.CURRENTAMOUNTOFFUNDS}
          value={[`${amount} ${messages.COIN}`]}
        />
      </BallotCard>
    )
  }
}
