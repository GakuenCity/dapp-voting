import React from 'react'
import moment from 'moment'
import { FormInput } from '../FormInput'
import { constants } from '../../utils/constants'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import messages from '../../utils/messages'

@inject('ballotStore', 'contractsStore')
@observer
export class BallotEmissionFundsMetadata extends React.Component {
  @observable emissionFundsBalance = 'Loading...'
  @observable noActiveBallotExists
  @observable beginDateTime
  @observable endDateTime

  constructor(props) {
    super(props)
    this.getEmissionFundsBalance()
    this.getNoActiveBallotExists()
    this.getDateTimeLimits()
  }

  @action('Get EmissionFunds balance')
  getEmissionFundsBalance = async () => {
    const { contractsStore } = this.props
    this.emissionFundsBalance =
      contractsStore.web3Instance.utils.fromWei(await contractsStore.emissionFunds.balance(), 'ether') +
      ' ' +
      messages.COIN
  }

  @action('Get VotingToManageEmissionFunds.noActiveBallotExists')
  getNoActiveBallotExists = async () => {
    this.noActiveBallotExists = await this.props.contractsStore.votingToManageEmissionFunds.noActiveBallotExists()
  }

  @action('Get beginDateTime and endDateTime')
  getDateTimeLimits = async () => {
    const { votingToManageEmissionFunds } = this.props.contractsStore
    const dateTimeFormat = 'MM/DD/YYYY h:mm A'

    this.beginDateTime = '...loading date...'
    this.endDateTime = '...loading date...'

    let emissionReleaseTime = Number(await votingToManageEmissionFunds.emissionReleaseTime())
    const emissionReleaseThreshold = Number(await votingToManageEmissionFunds.emissionReleaseThreshold())
    const currentTime = Number(await votingToManageEmissionFunds.getTime())
    const distributionThreshold = Number(await votingToManageEmissionFunds.distributionThreshold())
    emissionReleaseTime = votingToManageEmissionFunds.refreshEmissionReleaseTime(
      emissionReleaseTime,
      emissionReleaseThreshold,
      currentTime
    )

    const releasePlusDistribution = emissionReleaseTime + distributionThreshold

    if (currentTime < releasePlusDistribution) {
      this.beginDateTime = moment.unix(emissionReleaseTime).format(dateTimeFormat)
      this.endDateTime = moment.unix(releasePlusDistribution).format(dateTimeFormat)
    } else {
      const futureEmissionReleaseTime = emissionReleaseTime + emissionReleaseThreshold
      this.beginDateTime = moment.unix(futureEmissionReleaseTime).format(dateTimeFormat)
      this.endDateTime = moment.unix(futureEmissionReleaseTime + distributionThreshold).format(dateTimeFormat)
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.getEmissionFundsBalance, constants.getTransactionReceiptInterval)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    const { ballotStore, contractsStore, networkBranch } = this.props
    let note

    if (this.noActiveBallotExists === true) {
      note = <p>{messages.timeRange(this.beginDateTime, this.endDateTime)}</p>
    } else if (this.noActiveBallotExists !== true) {
      note = <p>To be able to create a new ballot, the previous ballot of this type must be finalized.</p>
    }

    const networkName = constants.NETWORKS[contractsStore.netId].NAME.toLowerCase()
    let explorerLink = `https://blockscout.com/poa/${networkName}/address/${contractsStore.emissionFunds.address}`
    if (networkName === 'core') {
      explorerLink = `https://explorer.xyd4.com/address/${contractsStore.emissionFunds.address}`
    } else {
      explorerLink = `https://explorer.pzhacm.org/address/${contractsStore.emissionFunds.address}`
    }
    return (
      <div className="frm-BallotEmissionFundsMetadata">
        <div className="frm-BallotEmissionFundsMetadata_Row">
          <FormInput
            hint={messages.BALLOTEMISSIONFUNDSHINT}
            id="receiver"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'receiver', 'ballotEmissionFunds')}
            title={messages.ADDRESSOFFUNDSRECEIVER}
            value={ballotStore.ballotEmissionFunds.receiver}
          />
          <FormInput
            disabled={true}
            hint={messages.emissionFundsContractHint(explorerLink)}
            id="amount"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'receiver', 'ballotEmissionFunds')}
            title={messages.CURRENTAMOUNTOFFUNDS}
            value={this.emissionFundsBalance}
          />
        </div>
        {note}
      </div>
    )
  }
}
