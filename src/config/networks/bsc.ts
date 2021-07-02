import BnbLogo from 'src/config/assets/token_bnb.svg'
import { EnvironmentSettings, ETHEREUM_NETWORK, FEATURES, NetworkConfig, WALLETS } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  clientGatewayUrl: 'https://gnosis-relay-bsc.chrono.tech/v1',
  txServiceUrl: 'https://gnosis-tx-bsc.chrono.tech/api/v1',
  safeAppsUrl: 'https://gnosis-app-bsc.chrono.tech',
  safeUrl: 'https://gnosis-heco.chrono.tech/app',
  gasPriceOracle: {
    url: 'https://ethgasstation.info/json/ethgasAPI.json',
    gasParameter: 'average',
    gweiFactor: '1e9',
  },
  rpcServiceUrl: 'https://bsc-dataseed.binance.org',
  networkExplorerName: 'BscScan',
  networkExplorerUrl: 'https://www.bscscan.com',
  networkExplorerApiUrl: 'https://api.bscscan.com/api',
}

const bsc: NetworkConfig = {
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
    id: ETHEREUM_NETWORK.BSC,
    backgroundColor: '#d0980b',
    textColor: '#ffffff',
    label: 'BSC',
    isTestNet: false,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      logoUri: BnbLogo,
    },
  },
  disabledWallets: [
    WALLETS.TREZOR,
    WALLETS.LEDGER,
    WALLETS.WALLET_CONNECT,
    WALLETS.COINBASE,
    WALLETS.FORTMATIC,
    WALLETS.OPERA,
    WALLETS.OPERA_TOUCH,
    WALLETS.PORTIS,
    WALLETS.TORUS,
    WALLETS.TRUST,
    WALLETS.WALLET_LINK,
    WALLETS.AUTHEREUM,
    WALLETS.LATTICE,
  ],
  disabledFeatures: [FEATURES.DOMAIN_LOOKUP, FEATURES.SPENDING_LIMIT],
}

export default bsc
