import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FormControl, Col} from 'react-bootstrap'

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { receiverAccountId, targetCurrency, amount } = this.state
    return (
      <Col xs={8} md={4}>
        <div>
          <h3>Create Transfer</h3>
          <FormControl
            name="receiverAccountId"
            type="text"
            value={this.state.value}
            placeholder="Receiver Account"
            onChange={this.handleChange.bind(this)}
          />
         <FormControl
            name="targetCurrency"
            type="text"
            value={this.state.value}
            placeholder="Target currency"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl
            name="amount"
            type="number"
            value={this.state.value}
            placeholder="Transfer amount"
            onChange={this.handleChange.bind(this)}
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
      </Col>
    )
  }
}

export default CreateTransfer