import { useEffect, useState } from 'react'
import { checkIfExecTxWillFail } from 'src/logic/safe/transactions/gas'

type TransactionWillFailProps = {
  data: string
  safeAddress: string
  txRecipient: string
  txAmount?: string
}

export const useCheckIfTransactionWillFail = ({
  data,
  safeAddress,
  txAmount,
  txRecipient,
}: TransactionWillFailProps): boolean => {
  const [txWillFail, setTxWillFail] = useState(false)

  useEffect(() => {
    if (!data.length) {
      return
    }
    const checkIfTxWillFailAsync = async () => {
      const txWillFailResult = await checkIfExecTxWillFail({
        safeAddress,
        txTo: txRecipient,
        data,
        txAmount,
      })
      setTxWillFail(txWillFailResult)
    }

    checkIfTxWillFailAsync()
  }, [data, safeAddress, txAmount, txRecipient])

  return txWillFail
}
