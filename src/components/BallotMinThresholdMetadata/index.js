import React from 'react'
import { FormInput } from '../FormInput'
import { inject, observer } from 'mobx-react'
import messages from '../../utils/messages'

@inject('ballotStore')
@observer
export class BallotMinThresholdMetadata extends React.Component {
  render() {
    const { ballotStore, networkBranch } = this.props

    return (
      <div className="frm-BallotMinThresholdMetadata">
        <div className="frm-BallotMinThresholdMetadata_Row">
          <FormInput
            hint={messages.PROPOSEDVALUEREMARK}
            id="key"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'proposedValue', 'ballotMinThreshold')}
            title={messages.PROPOSEDVALUE}
            type="number"
            value={ballotStore.ballotMinThreshold.proposedValue}
          />
          <FormInput
            hint={messages.BALLOTENDTIME}
            id="datetime-local"
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
