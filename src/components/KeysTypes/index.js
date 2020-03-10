import React from 'react'
import { inject, observer } from 'mobx-react'
import { FormHint } from '../FormHint'
import messages from '../../utils/messages'

@inject('ballotStore')
@observer
export class KeysTypes extends React.Component {
  render() {
    const { ballotStore, networkBranch } = this.props
    const keyButtons = [
      [
        {
          checked: ballotStore.isAddKeysBallotType,
          hint: messages.ADDKEYREMARK,
          id: 'add-key',
          name: 'key-control',
          onChange: e => ballotStore.changeKeysBallotType(e, ballotStore.KeysBallotType.add),
          text: messages.ADDKEY,
          value: ballotStore.KeysBallotType.add
        },
        {
          checked: ballotStore.isRemoveKeysBallotType,
          hint: messages.REMOVEKEYREMARK,
          id: 'remove-key',
          name: 'key-control',
          onChange: e => ballotStore.changeKeysBallotType(e, ballotStore.KeysBallotType.remove),
          text: messages.REMOVEKEY,
          value: ballotStore.KeysBallotType.remove
        },
        {
          checked: ballotStore.isSwapKeysBallotType,
          hint: messages.SWAPKEYREMARK,
          id: 'swap-key',
          name: 'key-control',
          onChange: e => ballotStore.changeKeysBallotType(e, ballotStore.KeysBallotType.swap),
          text: messages.SWAPKEY,
          value: ballotStore.KeysBallotType.swap
        }
      ],
      [
        {
          checked: ballotStore.isMiningKeyType,
          hint: messages.MININGKEYREMARK,
          id: 'mining-key',
          name: 'keys',
          onChange: e => ballotStore.changeKeyType(e, ballotStore.KeyType.mining),
          text: messages.MININGKEY,
          value: ballotStore.KeyType.mining
        },
        {
          checked: ballotStore.isPayoutKeyType,
          hint: messages.PAYOUTKEYREMARK,
          id: 'payout-key',
          name: 'keys',
          onChange: e => ballotStore.changeKeyType(e, ballotStore.KeyType.payout),
          text: messages.PAYOUTKEY,
          value: ballotStore.KeyType.payout
        },
        {
          checked: ballotStore.isVotingKeyType,
          hint: messages.VOTINGKEYREMARK,
          id: 'voting-key',
          name: 'keys',
          onChange: e => ballotStore.changeKeyType(e, ballotStore.KeyType.voting),
          text: messages.VOTINGKEY,
          value: ballotStore.KeyType.voting
        }
      ]
    ]

    return (
      <div className={`frm-KeysTypes frm-KeysTypes-${networkBranch}`}>
        {keyButtons.map((row, index) => (
          <div className="frm-KeysTypes_Row" key={index}>
            {row.map((item, index) => (
              <div className="frm-KeysTypes_Td" key={index}>
                <div className="frm-KeysTypes_Button">
                  <input
                    checked={item.checked}
                    className="frm-KeysTypes_Radio"
                    id={item.id}
                    name={item.name}
                    onChange={item.onChange}
                    type="radio"
                    value={item.value}
                  />
                  <label className={`frm-KeysTypes_Label frm-KeysTypes_Label-${networkBranch}`} htmlFor={item.id}>
                    {item.text}
                  </label>
                </div>
                <FormHint text={item.hint} networkBranch={networkBranch} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
