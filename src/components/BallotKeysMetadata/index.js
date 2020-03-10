import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { inject, observer } from 'mobx-react'
import messages from '../../utils/messages'

@inject('ballotStore', 'contractsStore')
@observer
export class BallotKeysMetadata extends React.Component {
  showNewVotingPayoutKeys() {
    const { ballotStore, contractsStore } = this.props

    return (
      ballotStore.isNewValidatorPersonalData &&
      contractsStore.votingToChangeKeys &&
      contractsStore.votingToChangeKeys.doesMethodExist('createBallotToAddNewValidator')
    )
  }

  render() {
    const { ballotStore, contractsStore, networkBranch } = this.props
    let options = []

    for (var key in contractsStore.validatorsMetadata) {
      if (contractsStore.validatorsMetadata.hasOwnProperty(key)) {
        options.push(contractsStore.validatorsMetadata[key])
      }
    }

    return (
      <div className="frm-BallotKeysMetadata">
        <div className="frm-BallotKeysMetadata_Row">
          <FormInput
            id="key"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'affectedKey', 'ballotKeys')}
            title={ballotStore.isNewValidatorPersonalData ? messages.NEWMININGKEY : messages.AFFECTEDKEY}
            value={ballotStore.ballotKeys.affectedKey}
            hint={`${ballotStore.isNewValidatorPersonalData ? messages.NEWMININGKEYREMARK : messages.AFFECTEDKEYREMARK}
            <br>${messages.EXAMPLEADDR}`}
          />
          <FormSelect
            disabled={ballotStore.isNewValidatorPersonalData}
            hint={`${messages.MININGKEYV2V}<br />${messages.EXAMPLEADDR}`}
            id="mining-key-select"
            name="form-field-name"
            networkBranch={networkBranch}
            onChange={ballotStore.setMiningKey}
            options={options}
            placeholder={messages.SELECT}
            noResultsText={messages.NORESULTSTEXT}
            title={messages.MININGKEY}
            value={ballotStore.ballotKeys.miningKey}
          />
        </div>
        {this.showNewVotingPayoutKeys() ? (
          <div className="frm-BallotKeysMetadata_Row">
            <FormInput
              hint={`${messages.NEWVOTINGKEYREMARK}<br />${messages.EXAMPLEADDR}`}
              id="new-voting-key"
              networkBranch={networkBranch}
              onChange={e => ballotStore.changeBallotMetadata(e, 'newVotingKey', 'ballotKeys')}
              title={messages.VOTINGKEY}
              value={ballotStore.ballotKeys.newVotingKey}
            />
            <FormInput
              hint={`${messages.NEWPAYOUTKEYREMARK}<br />${messages.EXAMPLEADDR}`}
              id="new-payout-key"
              networkBranch={networkBranch}
              onChange={e => ballotStore.changeBallotMetadata(e, 'newPayoutKey', 'ballotKeys')}
              title={messages.PAYOUTKEY}
              value={ballotStore.ballotKeys.newPayoutKey}
            />
          </div>
        ) : null}
        <div className="frm-BallotKeysMetadata_Row">
          <FormInput
            hint={messages.BALLOTENDTIME}
            id="datetime-local"
            min={ballotStore.endTime}
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'endTime')}
            title={messages.BALLOTEND}
            type="datetime-local"
            value={ballotStore.endTime}
          />
        </div>
      </div>
    )
  }
}
