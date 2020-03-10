let messages = {}
messages.invalidVotingKeyMsg = key => {
  return `<p><b>${key}</b> 是無效的投票金鑰！<br /> <br /> 請確保您已在乙太坊瀏覽器擴充插件中加載正確的投票金鑰。</p>`
}

messages.wrongRepo = repo => {
  return `<div>出了點問題<br/><br/> 在 ${repo} 倉庫中找不到 contracts.json</div>`
}

messages.networkMatchError = function(netId) {
  return `您目前并沒有連接到正確的網路.
            請在你的錢包APP (MetaMask or Nifty Wallet) 處切換到正確的網路
            可以在 <a href='https://github.com/GakuenCity/wiki/wiki' target='blank'>GitHub</a> 查看更多詳情.
            <b>目前的網路ID</b> 為 <i>${netId}</i>`
}

messages.newBallotMenuInfoListItem1 = (minThreshold, validatorsLength) => {
  return `至少需要 ${validatorsLength} 個投票人中的 ${minThreshold} 票贊成才能通過該提案`
}
messages.ballotThreshold = threshold => {
  return `最少需要 ${threshold} 個投票人投贊成票才能通過該提案`
}
messages.newBallotMenuInfoListItem2 = keys => {
  return `您可以創建 ${keys} 個關於金鑰的提案`
}
messages.newBallotMenuInfoListItem3 = validatorLimitsMinThreshold => {
  return `您可以創建 ${validatorLimitsMinThreshold} 個關於共識的提案`
}
messages.newBallotMenuInfoListItem4 = proxy => {
  return `您可以創建 ${proxy} 個關於代理的提案`
}
messages.emissionFundsContractHint = explorerLink => {
  return `目前的<a href=${explorerLink} target="_blank">基金釋放合約</a>.`
}
messages.timeRange = (beginDateTime, endDateTime) => {
  return `該提案將開始於 ${beginDateTime} (當地時間) 並在 ${endDateTime} (當地時間) 結束`
}
messages.USERDENIEDTRANSACTIONPATTERN = '用戶取消了合約互動'
messages.COIN = '代幣'
messages.ERROR = '錯誤'
messages.WARNING = '警告'
messages.ALL = '全部'
messages.NEWBALLOT = '新葉子'
messages.ADDBALLOT = '建立提案'
messages.EXAMPLEADDR = '例如: 0xffffFFFfFFffffffffffffffFfFFFfffFFFfFFfE.'
messages.SEARCH = '搜寻...'
messages.SELECT = '選取...'
messages.ADDKEY = '新增金鑰'
messages.ADDKEYREMARK = '新增一個金鑰'
messages.REMOVEKEY = '移除金鑰'
messages.REMOVEKEYREMARK = '移除一個金鑰'
messages.SWAPKEY = '替換金鑰'
messages.AFFECTEDKEY = '受影響的金鑰'
messages.AFFECTEDKEYREMARK = '針對這枚金鑰進行投票'
messages.BALLOTEND = '表決結束'
messages.BALLOTENDTIME = '表決的結束時間'
messages.PROPOSEDVALUE = '建議值'
messages.PROPOSEDVALUEREMARK = '每當出現一個新的表決可通過的最小投票閾值'
messages.PROPOSEDADDR = '建議一個新的地址'
messages.PROPOSEDNEWADDR = '新的合約地址'
messages.PROPOSEDRECEIVER = '接收地址'
messages.PROPOSEDADDRREMARK = '使用新的合約地址來替代原來的合約'
messages.CONTRACTTYPE = '合約類型'
messages.CONTRACTTYPEREMARK = '選擇一個正確的合約類型'
messages.NEWMININGKEY = '新的挖礦金鑰'
messages.NEWMININGKEYREMARK = '針對這枚挖礦金鑰進行投票'
messages.MININGKEYV2V = '與之關聯的挖礦金鑰'
messages.NEWPAYOUTKEYREMARK = '和挖礦金鑰配套的支付金鑰'
messages.NEWVOTINGKEYREMARK = '和挖礦金鑰配套的投票金鑰'
messages.SWAPKEYREMARK = '使用一個新的金鑰替代現有的'
messages.NORESULTSTEXT = '沒有合適的選項'
messages.MININGKEY = '挖礦 (Mining) 金鑰'
messages.MININGKEYREMARK = '所選的操作將會針對挖礦金鑰'
messages.PAYOUTKEY = '支付 (Payout) 金鑰'
messages.PAYOUTKEYREMARK = '所選的操作將會針對支付金鑰'
messages.VOTINGKEY = '投票 (Voting) 金鑰'
messages.VOTINGKEYREMARK = '所選的操作將會針對投票金鑰'
messages.CONSENSUSTHRESHOLDBALLOT = '共識閾值提案'
messages.EMISSIONFUNDSBALLOT = '釋放基金提案'
messages.MODIFYPROXYBALLOT = '修改代理合約提案'
messages.VALIDATORMANAGEMENTBALLOT = '驗證人管理提案'
messages.BALLOTDESCRIPTION = '提案説明'
messages.CURRENTAMOUNTOFFUNDS = '目前基金剩餘'
messages.ADDRESSOFFUNDSRECEIVER = '接收地址'
messages.BALLOTEMISSIONFUNDSHINT = '在表決通過的情況下，基金將傳送到該地址'
messages.TRANSACTIONERROR = '合約互動出現錯誤'
messages.VOTED_SUCCESS_MSG = '您已成功投票'
messages.BALLOT_CREATED_SUCCESS_MSG = '您已成功創建新的表決'
messages.FINALIZEBALLOT = '完成表決'
messages.FINALIZE = '已經完成'
messages.CANCELBALLOT = '取消表決'
messages.CANCELED = '已經取消'
messages.FINALIZED_SUCCESS_MSG = '您已成功完成表決'
messages.CANCELED_SUCCESS_MSG = '您已成功取消'
messages.ALREADY_FINALIZED_MSG = '該表決已經被完成'
messages.INVALID_VOTE_MSG = '您無法對此表決進行投票'
messages.INVALID_FINALIZE_MSG = '您無法完成這個表決'
messages.INVALID_CANCEL_MSG = '您無法取消這個表決'
messages.YOU_ALREADY_VOTED = '您已經針對此表決投過票了'
messages.AFFECTED_KEY_IS_NOT_ADDRESS_MSG = '填入的金鑰地址有誤'
messages.MINING_KEY_IS_NOT_ADDRESS_MSG = '投票金鑰不是一個地址'
messages.PROPOSED_ADDRESS_IS_NOT_ADDRESS_MSG = '給出的地址有誤'
messages.END_TIME_SHOULD_BE_GREATER_THAN_NOW_MSG = '投票結束時間應大於現在時間'
messages.BALLOT_TYPE_IS_EMPTY_MSG = '表決類型為空'
messages.USER_DENIED_ACCOUNT_ACCESS = '您拒絕了訪問您賬號的請求'
messages.UNKNOWN_NETWORK = '未知的网路'
messages.NO_METAMASK_MSG = '您的瀏覽器擴充插件已鎖定或未安裝'
messages.NEWBALLOTMENUINFOTITLE = '投票限制'
messages.CONGRATULATIONS = '恭喜！'
messages.ACTION = '動作'
messages.ADD = '新增'
messages.REMOVE = '移除'
messages.SWAP = '替換'
messages.PROPOSER = '提交人挖礦金鑰'
messages.BALLOTTIME = '表決建立時間 (協調世界時)'
messages.KEYTYPE = '金鑰類型'
messages.MINING = '挖礦'
messages.PAYOUT = '支付'
messages.VOTING = '投票'
messages.YES = '贊成'
messages.NO = '反對'
messages.VOTES = '票'
messages.BALLOTID = '表決ID'
messages.BURN = '焚毀'
messages.FREEZE = '凍結'
messages.SEND = '發送'
messages.FINALIZEDESCRIPTIONPLUS = '或在所有的投票人都投出贊成票的時候完成表決'

messages.finalizeDescription = dv => {
  if (Number(dv) === -1) {
    return '你可以在表決時間結束以後完成表決'
  } else {
    return `你可以在 ${dv} 之後取消表決`
  }
}
messages.ballotIsNotActiveMsg = timeToStart => {
  return `該投票尚未開始。 開始時間為: ${timeToStart}`
}
messages.SHOULD_BE_MORE_THAN_MIN_DURATION = (minDuration, duration, neededHours, neededMinutes) => {
  return `投票結束時間至少應該是從現在起的${minDuration}個小時(UTC)。當前持續時間是${duration}小時。
    請添加${neededHours}小時${neededMinutes}分鐘，以設定正確的結束時間。
	`
}
messages.SHOULD_BE_LESS_OR_EQUAL_14_DAYS = duration => {
  return `投票結束時間不應超過14天(UTC)。當前持續時間是${duration}小時。`
}
messages.EMISSION_RELEASE_TIME_IN_FUTURE = emissionReleaseTime => {
  return `您現在不能創建投票。請在${emissionReleaseTime}(UTC)之後進行嘗試。`
}
messages.PREVIOUS_BALLOT_NOT_FINALIZED = '必須先將之前的投票完成'
messages.BALLOT_CREATE_FAILED_TX = `${
  messages.TRANSACTIONERROR
}請確保為投票設定了正確的項。乙太坊瀏覽器擴充插件通常會在傳送請求前對合約進行檢查。`
messages.VOTE_FAILED_TX = `${
  messages.TRANSACTIONERROR
}請確定您還沒有針對這個表決投過票。乙太坊瀏覽器擴充插件通常會在傳送請求前對合約進行檢查。`
messages.FINALIZE_FAILED_TX = `${
  messages.TRANSACTIONERROR
}請確保您沒有發現錯誤。乙太坊瀏覽器擴充插件通常會在傳送請求前對合約進行檢查。`
messages.CANCEL_BALLOT_FAILED_TX = messages.FINALIZE_FAILED_TX

export default messages
