import xDaiLogo from 'src/config/assets/token_xdai.svg'
import { EnvironmentSettings, ETHEREUM_NETWORK, FEATURES, NetworkConfig, WALLETS } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  clientGatewayUrl: 'https://gnosis-relay-heco.chrono.tech/v1',
  txServiceUrl: 'https://gnosis-tx-heco.chrono.tech/api/v1',
  safeAppsUrl: 'https://gnosis-app-heco.chrono.tech',
  safeUrl: 'https://gnosis-heco.chrono.tech/app',
  gasPrice: 1e9,
  rpcServiceUrl: 'https://http-mainnet-node.huobichain.com',
  networkExplorerName: 'Etherscan',
  networkExplorerUrl: 'https://testnet.hecoinfo.com/',
  networkExplorerApiUrl: 'https://api-testnet.hecoinfo.com/api',
}

const hecomain: NetworkConfig = {
  environment: {
    dev: {
      ...baseConfig,
    },
    staging: {
      ...baseConfig,
    },
    production: {
      ...baseConfig,
    },
  },
  network: {
    id: ETHEREUM_NETWORK.HUOBI,
    backgroundColor: '#48A8A6',
    textColor: '#ffffff',
    label: 'HT',
    isTestNet: false,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
      logoUri: xDaiLogo,
    },
  },
  disabledWallets: [
    WALLETS.TREZOR,
    WALLETS.LEDGER,
    WALLETS.COINBASE,
    WALLETS.FORTMATIC,
    WALLETS.OPERA,
    WALLETS.OPERA_TOUCH,
    WALLETS.TORUS,
    WALLETS.TRUST,
    WALLETS.WALLET_LINK,
    WALLETS.AUTHEREUM,
    WALLETS.LATTICE,
  ],
  disabledFeatures: [FEATURES.DOMAIN_LOOKUP],
}

export default hecomain
