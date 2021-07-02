import maticLogo from 'src/config/assets/token_matic.svg'
import { EnvironmentSettings, ETHEREUM_NETWORK, FEATURES, NetworkConfig, WALLETS } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  clientGatewayUrl: 'https://gnosis-relay-polygon.chrono.tech/v1',
  txServiceUrl: 'https://gnosis-tx-polygon.chrono.tech/api/v1',
  safeAppsUrl: 'https://gnosis-app-polygon.chrono.tech',
  safeUrl: 'https://gnosis-polygon.chrono.tech/app',
  gasPriceOracle: {
    url: 'https://gasstation-mainnet.matic.network',
    gasParameter: 'standard',
    gweiFactor: '1e9',
  },
  rpcServiceUrl: 'https://rpc-mainnet.matic.network',
  networkExplorerName: 'MainNet Matic Explorer',
  networkExplorerUrl: 'https://explorer-mainnet.maticvigil.com',
  networkExplorerApiUrl: 'https://api.polygonscan.com/api',
}

const polygon: NetworkConfig = {
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
    id: ETHEREUM_NETWORK.POLYGON,
    backgroundColor: '#8B50ED',
    textColor: '#ffffff',
    label: 'Polygon',
    isTestNet: false,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
      logoUri: maticLogo,
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
    WALLETS.WALLET_CONNECT,
    WALLETS.PORTIS,
  ],
  disabledFeatures: [FEATURES.DOMAIN_LOOKUP, FEATURES.SPENDING_LIMIT],
}

export default polygon
