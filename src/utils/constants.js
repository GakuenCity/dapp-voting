let constants = {}
constants.organization = 'GakuenCity'
constants.repoName = 'chain-spec'
constants.addressesSourceFile = 'contracts.json'
constants.ABIsSources = {
  KeysManager: 'KeysManager.abi.json',
  PoaNetworkConsensus: 'PoaNetworkConsensus.abi.json',
  BallotStorage: 'BallotsStorage.abi.json',
  EmissionFunds: 'EmissionFunds.abi.json',
  ProxyStorage: 'ProxyStorage.abi.json',
  ValidatorMetadata: 'ValidatorMetadata.abi.json',
  VotingToChangeKeys: 'VotingToChangeKeys.abi.json',
  VotingToChangeMinThreshold: 'VotingToChangeMinThreshold.abi.json',
  VotingToChangeProxyAddress: 'VotingToChangeProxyAddress.abi.json',
  VotingToManageEmissionFunds: 'VotingToManageEmissionFunds.abi.json'
}
constants.userDeniedTransactionPattern = 'User denied transaction'
constants.NEW_MINING_KEY = {
  label: '新的挖礦密鑰',
  lastNameAndKey: '',
  fullName: '',
  value: '0x0000000000000000000000000000000000000000'
}

constants.minBallotDurationInDays = 2
constants.startTimeOffsetInMinutes = 5
constants.endTimeDefaultInMinutes = 2890
constants.getTransactionReceiptInterval = 5000
constants.rootPath = '/poa-dapps-voting'

constants.navigationData = [
  {
    icon: 'all',
    title: '全部',
    url: `${constants.rootPath}`
  },
  {
    icon: 'active',
    title: '正在進行',
    url: `${constants.rootPath}/active`
  },
  {
    icon: 'finalize',
    title: '等待敲定',
    url: `${constants.rootPath}/tofinalize`
  },
  {
    disabled: true,
    title: '新的表決',
    url: `${constants.rootPath}/new`
  }
]

constants.CORE = 'core'
constants.TEST = 'test'

constants.NETWORKS = {
  '1004440004': {
    NAME: 'CoreNet',
    FULLNAME: '主網路',
    RPC: 'https://infura.xyd4.com',
    BRANCH: constants.CORE,
    SORTORDER: 1,
    TESTNET: false
  },
  '1014440004': {
    NAME: 'TestNet',
    FULLNAME: '測試網路',
    RPC: 'https://infura.pzhacm.org',
    BRANCH: constants.TEST,
    SORTORDER: 2,
    TESTNET: true
  }
}

module.exports = {
  constants
}
