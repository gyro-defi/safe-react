import { List, Map } from 'immutable'
import { makeTransaction } from 'src/logic/safe/store/models/transaction'
import { getTxTableData, TX_TABLE_RAW_CANCEL_TX_ID } from 'src/routes/safe/components/Transactions/TxsTable/columns'

describe('TxsTable Columns > getTxTableData', () => {
  it('should include CancelTx object inside TxTableData', async () => {
    // Given
    const mockedTransaction = makeTransaction({ nonce: 1, blockNumber: 100 })
    const mockedCancelTransaction = makeTransaction({ nonce: 1, blockNumber: 123 })

    // When
    const txTableData = await getTxTableData(List([mockedTransaction]), Map( { '1': mockedCancelTransaction }))
    const txRow = txTableData.first()

    // Then
    expect(txRow[TX_TABLE_RAW_CANCEL_TX_ID]).toEqual(mockedCancelTransaction)
  })
  it('should not include CancelTx object inside TxTableData', async () => {
    // Given
    const mockedTransaction = makeTransaction({ nonce: 1, blockNumber: 100 })
    const mockedCancelTransaction = makeTransaction({ nonce: 2, blockNumber: 123 })

    // When
    const txTableData = await getTxTableData(List([mockedTransaction]), Map( { '2': mockedCancelTransaction }))
    const txRow = txTableData.first()

    // Then
    expect(txRow[TX_TABLE_RAW_CANCEL_TX_ID]).toBeUndefined()
  })
})
