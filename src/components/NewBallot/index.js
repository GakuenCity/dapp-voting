import React from 'react'
import moment from 'moment'
import swal from 'sweetalert2'
import { BallotEmissionFundsMetadata } from '../BallotEmissionFundsMetadata'
import { BallotKeysMetadata } from '../BallotKeysMetadata'
import { BallotMinThresholdMetadata } from '../BallotMinThresholdMetadata'
import { BallotProxyMetadata } from '../BallotProxyMetadata'
import { ButtonAddBallot } from '../ButtonAddBallot'
import { FormTextarea } from '../FormTextarea'
import { KeysTypes } from '../KeysTypes'
import { NewBallotMenu } from '../NewBallotMenu'
import { NewBallotMenuInfo } from '../NewBallotMenuInfo'
import { Separator } from '../Separator'
import { Validator } from '../Validator'
import { constants } from '../../utils/constants'
import { getNetworkBranch } from '../../utils/utils'
import { inject, observer } from 'mobx-react'
import messages from '../../utils/messages'
import { sendTransactionByVotingKey } from '../../utils/helpers'
import { enableWallet } from '../../utils/getWeb3'

@inject('commonStore', 'ballotStore', 'validatorStore', 'contractsStore', 'routing', 'ballotsStore')
@observer
export class NewBallot extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  getVotingNetworkBranch = () => {
    const { contractsStore } = this.props

    return contractsStore.netId ? getNetworkBranch(contractsStore.netId) : null
  }

  getStartTimeUnix() {
    return moment
      .utc()
      .add(constants.startTimeOffsetInMinutes, 'minutes')
      .unix()
  }

  checkValidation() {
    const { commonStore, contractsStore, ballotStore } = this.props

    // Temporarily commented (until we implement https://github.com/poanetwork/poa-dapps-voting/issues/120)
    // const { validatorStore } = this.props
    // if (ballotStore.isNewValidatorPersonalData) {
    //   for (let validatorProp in validatorStore) {
    //     if (validatorStore[validatorProp].length === 0) {
    //       swal(messages.WARNING, `Validator ${validatorProp} is empty`, 'warning')
    //       commonStore.hideLoading()
    //       return false
    //     }
    //   }
    // }

    if (!ballotStore.memo) {
      swal(messages.WARNING, messages.DESCRIPTION_IS_EMPTY, 'warning')
      commonStore.hideLoading()
      return false
    }

    if (!ballotStore.isBallotForEmissionFunds) {
      const minBallotDurationInHours = constants.minBallotDurationInDays * 24
      const startTime = this.getStartTimeUnix()
      const minEndTime = moment
        .utc()
        .add(minBallotDurationInHours, 'hours')
        .format()
      let neededMinutes = moment(minEndTime).diff(moment(ballotStore.endTime), 'minutes')
      const neededHours = Math.floor(neededMinutes / 60)
      let duration = moment.unix(ballotStore.endTimeUnix).diff(moment.unix(startTime), 'hours')

      if (duration < 0) {
        duration = 0
      }

      if (neededMinutes > 0) {
        neededMinutes = Math.abs(neededHours * 60 - neededMinutes)
        swal(
          messages.WARNING,
          messages.SHOULD_BE_MORE_THAN_MIN_DURATION(minBallotDurationInHours, duration, neededHours, neededMinutes),
          'warning'
        )
        commonStore.hideLoading()
        return false
      }

      const twoWeeks = moment
        .utc()
        .add(14, 'days')
        .format()
      const exceededMinutes = moment(ballotStore.endTime).diff(moment(twoWeeks), 'minutes')
      if (exceededMinutes > 0) {
        swal(messages.WARNING, messages.SHOULD_BE_LESS_OR_EQUAL_14_DAYS(duration), 'warning')
        commonStore.hideLoading()
        return false
      }
    }

    if (ballotStore.isBallotForKey) {
      for (let ballotKeysProp in ballotStore.ballotKeys) {
        if (ballotKeysProp === 'newVotingKey' || ballotKeysProp === 'newPayoutKey') {
          continue
        }
        if (!ballotStore.ballotKeys[ballotKeysProp]) {
          swal(messages.WARNING, `Ballot ${ballotKeysProp} is empty`, 'warning')
          commonStore.hideLoading()
          return false
        }
        if (ballotStore.ballotKeys[ballotKeysProp].length === 0) {
          swal(messages.WARNING, `Ballot ${ballotKeysProp} is empty`, 'warning')
          commonStore.hideLoading()
          return false
        }
      }

      let isAffectedKeyAddress = contractsStore.web3Instance.utils.isAddress(ballotStore.ballotKeys.affectedKey)

      if (!isAffectedKeyAddress) {
        swal(messages.WARNING, messages.AFFECTED_KEY_IS_NOT_ADDRESS_MSG, 'warning')
        commonStore.hideLoading()
        return false
      }

      let isMiningKeyAddress = contractsStore.web3Instance.utils.isAddress(ballotStore.ballotKeys.miningKey.value)
      if (!isMiningKeyAddress) {
        swal(messages.WARNING, messages.MINING_KEY_IS_NOT_ADDRESS_MSG, 'warning')
        commonStore.hideLoading()
        return false
      }
    }

    if (ballotStore.isBallotForMinThreshold) {
      for (let ballotMinThresholdProp in ballotStore.ballotMinThreshold) {
        if (ballotStore.ballotMinThreshold[ballotMinThresholdProp].length === 0) {
          swal(messages.WARNING, `Ballot ${ballotMinThresholdProp} is empty`, 'warning')
          commonStore.hideLoading()
          return false
        }
      }
    }

    if (ballotStore.isBallotForProxy) {
      for (let ballotProxyProp in ballotStore.ballotProxy) {
        if (ballotStore.ballotProxy[ballotProxyProp].length === 0) {
          swal(messages.WARNING, `Ballot ${ballotProxyProp} is empty`, 'warning')
          commonStore.hideLoading()
          return false
        }
      }

      const isAddress = contractsStore.web3Instance.utils.isAddress(ballotStore.ballotProxy.proposedAddress)

      if (!isAddress) {
        swal(messages.WARNING, messages.PROPOSED_ADDRESS_IS_NOT_ADDRESS_MSG, 'warning')
        commonStore.hideLoading()
        return false
      }
    }

    if (ballotStore.isBallotForEmissionFunds) {
      if (ballotStore.ballotEmissionFunds.receiver.length === 0) {
        swal(messages.WARNING, `Address of funds receiver is empty`, 'warning')
        commonStore.hideLoading()
        return false
      }

      const isAddress = contractsStore.web3Instance.utils.isAddress(ballotStore.ballotEmissionFunds.receiver)

      if (!isAddress) {
        swal(messages.WARNING, messages.PROPOSED_ADDRESS_IS_NOT_ADDRESS_MSG, 'warning')
        commonStore.hideLoading()
        return false
      }
    }

    if (
      !ballotStore.isBallotForKey &&
      !ballotStore.isBallotForMinThreshold &&
      !ballotStore.isBallotForProxy &&
      !ballotStore.isBallotForEmissionFunds
    ) {
      swal(messages.WARNING, messages.BALLOT_TYPE_IS_EMPTY_MSG, 'warning')
      commonStore.hideLoading()
      return false
    }

    return true
  }

  createBallotForKeys = (startTime, endTime) => {
    const { ballotStore, contractsStore } = this.props
    const inputToMethod = {
      startTime,
      endTime,
      affectedKey: ballotStore.ballotKeys.affectedKey,
      affectedKeyType: ballotStore.ballotKeys.keyType,
      newVotingKey: ballotStore.ballotKeys.newVotingKey,
      newPayoutKey: ballotStore.ballotKeys.newPayoutKey,
      miningKey: ballotStore.ballotKeys.miningKey.value,
      ballotType: ballotStore.ballotKeys.keysBallotType,
      memo: ballotStore.memo
    }
    let data
    if (
      inputToMethod.ballotType === ballotStore.KeysBallotType.add &&
      inputToMethod.affectedKeyType === ballotStore.KeyType.mining &&
      (inputToMethod.newVotingKey || inputToMethod.newPayoutKey)
    ) {
      data = contractsStore.votingToChangeKeys.createBallotToAddNewValidator(inputToMethod)
    } else {
      data = contractsStore.votingToChangeKeys.createBallot(inputToMethod)
    }
    return data
  }

  createBallotForMinThreshold = (startTime, endTime) => {
    const { ballotStore, contractsStore } = this.props
    const inputToMethod = {
      startTime,
      endTime,
      proposedValue: ballotStore.ballotMinThreshold.proposedValue,
      memo: ballotStore.memo
    }
    return contractsStore.votingToChangeMinThreshold.createBallot(inputToMethod)
  }

  createBallotForProxy = (startTime, endTime) => {
    const { ballotStore, contractsStore } = this.props
    const inputToMethod = {
      startTime,
      endTime,
      proposedValue: ballotStore.ballotProxy.proposedAddress,
      contractType: ballotStore.ballotProxy.contractType,
      memo: ballotStore.memo
    }
    return contractsStore.votingToChangeProxy.createBallot(inputToMethod)
  }

  createBallotForEmissionFunds = (startTime, endTime) => {
    const { ballotStore, contractsStore } = this.props
    const inputToMethod = {
      startTime,
      endTime,
      receiver: ballotStore.ballotEmissionFunds.receiver,
      memo: ballotStore.memo
    }
    return contractsStore.votingToManageEmissionFunds.createBallot(inputToMethod)
  }

  onClick = async () => {
    const { commonStore, contractsStore, ballotStore, ballotsStore } = this.props
    const { push } = this.props.routing

    try {
      await enableWallet(contractsStore.updateKeys)
    } catch (error) {
      swal('Error', error.message, 'error')
      return
    }

    if (contractsStore.isEmptyVotingKey) {
      swal(messages.WARNING, messages.NO_METAMASK_MSG, 'warning')
      return
    } else if (!contractsStore.networkMatch) {
      swal(messages.WARNING, messages.networkMatchError(contractsStore.netId), 'warning')
      return
    } else if (!contractsStore.isValidVotingKey) {
      swal(messages.WARNING, messages.invalidVotingKeyMsg(contractsStore.votingKey), 'warning')
      return
    }

    commonStore.showLoading()

    const isFormValid = this.checkValidation()

    if (isFormValid) {
      if (ballotStore.ballotType === ballotStore.BallotType.keys) {
        const inputToAreBallotParamsValid = {
          affectedKey: ballotStore.ballotKeys.affectedKey,
          affectedKeyType: ballotStore.ballotKeys.keyType,
          miningKey: ballotStore.ballotKeys.miningKey.value,
          ballotType: ballotStore.ballotKeys.keysBallotType
        }
        let areBallotParamsValid
        areBallotParamsValid = await contractsStore.ballotsStorage.areKeysBallotParamsValid(inputToAreBallotParamsValid)
        if (areBallotParamsValid === null) {
          areBallotParamsValid = await contractsStore.votingToChangeKeys.areBallotParamsValid(
            inputToAreBallotParamsValid
          )
        }
        if (ballotStore.ballotKeys.keysBallotType === ballotStore.KeysBallotType.add) {
          if (ballotStore.ballotKeys.keyType !== ballotStore.KeyType.mining) {
            if (!ballotStore.ballotKeys.miningKey.value) {
              areBallotParamsValid = false
            } else if (ballotStore.ballotKeys.miningKey.value === '0x0000000000000000000000000000000000000000') {
              areBallotParamsValid = false
            }
          }
        }
        if (!areBallotParamsValid) {
          commonStore.hideLoading()
          return swal(messages.WARNING, 'The ballot input params are invalid', 'warning')
        }
      }

      let startTime = this.getStartTimeUnix()
      let endTime = ballotStore.endTimeUnix

      if (ballotStore.ballotType === ballotStore.BallotType.emissionFunds) {
        const votingContract = contractsStore.votingToManageEmissionFunds

        let emissionReleaseTime = Number(await votingContract.emissionReleaseTime())
        const emissionReleaseThreshold = Number(await votingContract.emissionReleaseThreshold())
        const currentTime = Number(await votingContract.getTime())
        emissionReleaseTime = votingContract.refreshEmissionReleaseTime(
          emissionReleaseTime,
          emissionReleaseThreshold,
          currentTime
        )

        if (currentTime < emissionReleaseTime) {
          commonStore.hideLoading()
          const emissionReleaseTimeString = moment
            .unix(emissionReleaseTime)
            .utc()
            .format('MMM Do YYYY, h:mm:ss a')
          swal(messages.WARNING, messages.EMISSION_RELEASE_TIME_IN_FUTURE(emissionReleaseTimeString), 'warning')
          return
        }

        const noActiveBallotExists = await votingContract.noActiveBallotExists()
        if (!noActiveBallotExists) {
          commonStore.hideLoading()
          swal(messages.WARNING, messages.PREVIOUS_BALLOT_NOT_FINALIZED, 'warning')
          return
        }

        const distributionThreshold = Number(await votingContract.distributionThreshold())

        startTime = currentTime + constants.startTimeOffsetInMinutes * 60
        endTime = emissionReleaseTime + distributionThreshold
      }

      let methodToCreateBallot
      let contractType
      let contractInstance

      switch (ballotStore.ballotType) {
        case ballotStore.BallotType.keys:
          methodToCreateBallot = this.createBallotForKeys
          contractType = 'votingToChangeKeys'
          contractInstance = contractsStore.votingToChangeKeys.instance
          break
        case ballotStore.BallotType.minThreshold:
          methodToCreateBallot = this.createBallotForMinThreshold
          contractType = 'votingToChangeMinThreshold'
          contractInstance = contractsStore.votingToChangeMinThreshold.instance
          break
        case ballotStore.BallotType.proxy:
          methodToCreateBallot = this.createBallotForProxy
          contractType = 'votingToChangeProxy'
          contractInstance = contractsStore.votingToChangeProxy.instance
          break
        case ballotStore.BallotType.emissionFunds:
          methodToCreateBallot = this.createBallotForEmissionFunds
          contractType = 'votingToManageEmissionFunds'
          contractInstance = contractsStore.votingToManageEmissionFunds.instance
          break
        default:
          break
      }

      sendTransactionByVotingKey(
        this.props,
        contractInstance.options.address,
        methodToCreateBallot(startTime, endTime),
        async tx => {
          const events = await contractInstance.getPastEvents('BallotCreated', {
            fromBlock: tx.blockNumber,
            toBlock: tx.blockNumber
          })
          const newId = Number(events[0].returnValues.id)
          const card = await contractsStore.getCard(newId, contractType)
          ballotsStore.ballotCards.push(card)

          swal(messages.CONGRATULATIONS, messages.BALLOT_CREATED_SUCCESS_MSG, 'success').then(result => {
            push(`${commonStore.rootPath}`)
            window.scrollTo(0, 0)
          })
        },
        messages.BALLOT_CREATE_FAILED_TX
      )
    }
  }

  componentDidMount() {
    const { ballotStore } = this.props
    ballotStore.changeBallotType(null, ballotStore.BallotType.keys)
  }

  getMenuItems() {
    const { contractsStore, ballotStore } = this.props
    let items = [
      {
        active: ballotStore.BallotType.keys === ballotStore.ballotType,
        onClick: e => ballotStore.changeBallotType(e, ballotStore.BallotType.keys),
        text: messages.VALIDATORMANAGEMENTBALLOT
      },
      {
        active: ballotStore.BallotType.minThreshold === ballotStore.ballotType,
        onClick: e => ballotStore.changeBallotType(e, ballotStore.BallotType.minThreshold),
        text: messages.CONSENSUSTHRESHOLDBALLOT
      },
      {
        active: ballotStore.BallotType.proxy === ballotStore.ballotType,
        onClick: e => ballotStore.changeBallotType(e, ballotStore.BallotType.proxy),
        text: messages.MODIFYPROXYBALLOT
      }
    ]

    if (contractsStore.votingToManageEmissionFunds) {
      items.push({
        active: ballotStore.BallotType.emissionFunds === ballotStore.ballotType,
        onClick: e => ballotStore.changeBallotType(e, ballotStore.BallotType.emissionFunds),
        text: messages.EMISSIONFUNDSBALLOT
      })
    }

    return items
  }

  render() {
    const { contractsStore, ballotStore } = this.props
    const networkBranch = this.getVotingNetworkBranch()
    let metadata
    let minThreshold = 0

    switch (ballotStore.ballotType) {
      case ballotStore.BallotType.keys:
        metadata = <BallotKeysMetadata networkBranch={networkBranch} />
        minThreshold = contractsStore.keysBallotThreshold
        break
      case ballotStore.BallotType.minThreshold:
        metadata = <BallotMinThresholdMetadata networkBranch={networkBranch} />
        minThreshold = contractsStore.minThresholdBallotThreshold
        break
      case ballotStore.BallotType.proxy:
        metadata = <BallotProxyMetadata networkBranch={networkBranch} />
        minThreshold = contractsStore.proxyBallotThreshold
        break
      case ballotStore.BallotType.emissionFunds:
        metadata = <BallotEmissionFundsMetadata networkBranch={networkBranch} />
        minThreshold = contractsStore.emissionFundsBallotThreshold
        break
      default:
        break
    }

    return (
      <section className="new-NewBallot">
        <form className="new-NewBallot_Form">
          <div className="new-NewBallot_MenuContainer">
            <NewBallotMenu menuItems={this.getMenuItems()} networkBranch={networkBranch} />
            <NewBallotMenuInfo
              keys={contractsStore.validatorLimits.keys}
              minThreshold={minThreshold}
              proxy={contractsStore.validatorLimits.proxy}
              validatorLimitsMinThreshold={contractsStore.validatorLimits.minThreshold}
              validatorsLength={contractsStore.validatorsLength}
            />
          </div>
          <div className="new-NewBallot_FormContent">
            <FormTextarea
              id="ballot-description"
              networkBranch={networkBranch}
              onChange={e => ballotStore.setMemo(e)}
              title={messages.BALLOTDESCRIPTION}
              value={ballotStore.memo}
            />
            <Separator />
            {ballotStore.isBallotForKey ? <KeysTypes networkBranch={networkBranch} /> : null}
            {ballotStore.isNewValidatorPersonalData ? <Validator networkBranch={networkBranch} /> : null}
            {metadata}
            <Separator />
            <div className="new-NewBallot_ButtonContainer">
              <ButtonAddBallot onClick={e => this.onClick(e)} networkBranch={networkBranch} />
            </div>
          </div>
        </form>
      </section>
    )
  }
}
