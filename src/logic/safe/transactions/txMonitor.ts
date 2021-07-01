import { TransactionReceipt } from 'web3-core'

import { web3ReadOnly } from 'src/logic/wallets/getWeb3'
import { sameAddress } from 'src/logic/wallets/ethAddresses'
import { sameString } from 'src/utils/strings'

type TxMonitorProps = {
  sender: string
  hash: string
  data: string
  nonce?: number
  gasPrice?: string
}

type TxMonitorOptions = {
  delay?: number
}

/**
 * Recursively inspects a pending tx. Until it's found, and returns the mined tx receipt
 *
 * @param {object} txParams
 * @param {string} txParams.sender
 * @param {string} txParams.hash
 * @param {string} txParams.data
 * @param {number | undefined} txParams.nonce
 * @param {string | undefined} txParams.gasPrice
 * @param {function(txReceipt: TransactionReceipt): void} cb - called with the tx receipt as argument when tx is mined
 * @param {object} options
 * @param {number} options.delay
 */
export const txMonitor = async (
  { sender, hash, data, nonce, gasPrice }: TxMonitorProps,
  cb: (txReceipt: TransactionReceipt) => void,
  tries = 0,
  options?: TxMonitorOptions,
): Promise<void> => {
  if (tries > 720) {
    return
  }
  setTimeout(async () => {
    if (nonce === undefined || gasPrice === undefined) {
      // this block is accessed only the first time, to lookup the tx nonce and gasPrice
      // find the nonce for the current tx
      const transaction = await web3ReadOnly.eth.getTransaction(hash)

      if (transaction !== null) {
        // transaction found
        return txMonitor(
          { sender, hash, data, nonce: transaction.nonce, gasPrice: transaction.gasPrice },
          cb,
          tries + 1,
          options,
        )
      } else {
        return txMonitor({ sender, hash, data }, cb, tries + 1, options)
      }
    }
    const firstTxReceipt = await web3ReadOnly.eth.getTransactionReceipt(hash)
    if (firstTxReceipt) {
      return
    }
    const latestBlock = await web3ReadOnly.eth.getBlock('latest', true)

    const replacementTransaction = latestBlock.transactions.find((transaction) => {
      // TODO: use gasPrice, timestamp or another better way to differentiate
      return (
        sameAddress(transaction.from, sender) &&
        transaction.nonce === nonce &&
        !sameString(transaction.hash, hash) &&
        // if `data` differs, then it's a replacement tx, not a speedup
        sameString(transaction.input, data)
      )
    })
    if (replacementTransaction) {
      const transactionReceipt = await web3ReadOnly.eth.getTransactionReceipt(replacementTransaction.hash)
      if (transactionReceipt === null) {
        // pending transaction
        return txMonitor(
          {
            sender,
            hash: replacementTransaction.hash,
            data: replacementTransaction.input,
            nonce,
            gasPrice: replacementTransaction.gasPrice,
          },
          cb,
          tries + 1,
          options,
        )
      }
      cb(transactionReceipt)
      return
    }

    return txMonitor({ sender, hash, data, nonce, gasPrice }, cb, tries + 1, options)
  }, options?.delay ?? 5000)
}
