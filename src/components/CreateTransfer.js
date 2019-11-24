import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_TRANSFER_MUTATION = gql`
  mutation createTrasnfer(
    $receiverAccountId: ID!,
    $targetCurrency: String!, 
    $amount: String!
  ) {
    createTransfer(
      receiverAccountId: $receiverAccountId,
      targetCurrency: $targetCurrency,
      amount: $amount
    ) {
        id
        senderAccountId
        receiverAccountId
        amount,
        status
      }
}        
`

class CreateTransfer extends Component {
  state = {
    receiverAccountId: '',
    targetCurrency: '',
    amount: 0
  }

  render() {
    const { receiverAccountId, targetCurrency, amount } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={receiverAccountId}
            onChange={e => this.setState({ receiverAccountId: e.target.value })}
            type="text"
            placeholder="Receiver account id"
          />
          <input
            className="mb2"
            value={targetCurrency}
            onChange={e => this.setState({ targetCurrency: e.target.value })}
            type="text"
            placeholder="Target currency"
          />
          <input
            className="mb2"
            value={amount}
            onChange={e => this.setState({ amount: e.target.value })}
            type="number"
            placeholder="Transfer amount"
          />
        </div>

        <Mutation 
          mutation={CREATE_TRANSFER_MUTATION} 
          variables={{ receiverAccountId, targetCurrency, amount }}
          onCompleted={() => this.props.history.push('/')}
        >
          {
            createTransferMutation => 
              <button onClick={createTransferMutation}>Create</button>
          }
        </Mutation>
      </div>
    )
  }
}

export default CreateTransfer