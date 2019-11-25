import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FormControl, Col, DropdownButton, MenuItem} from 'react-bootstrap'
import { Query } from 'react-apollo'
import { tsImportEqualsDeclaration } from '@babel/types';

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

const LIST_USERS_QUERY = gql`
  {
    listUsers {
      id
      name
      account {
        id
      }
    }
  }
`

const UsersList = ({value, onSelect}) => (
  <Query query={LIST_USERS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching payouts</div>
      if (error) return <div>Error loading payouts</div>

      const users = data.listUsers

      return (
        <DropdownButton 
          name="receiverAccountId"
          title="Select user account" 
          id="_users_list"
          value={value}
          onSelect={onSelect}
        >
          {
            users.map(user => (
              <MenuItem key={user.id} eventKey={user.account.id}>
                { user.name }
              </MenuItem>
           ))
          }
        </DropdownButton>
      );
    }}
  </Query>
);

class CreateTransfer extends Component {
  state = {
    receiverAccountId: '',
    targetCurrency: '',
    amount: 0
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUserChange(value) {
    this.setState({receiverAccountId: value})
  }

  render() {
    const { receiverAccountId, targetCurrency, amount } = this.state
    return (
      <Col xs={8} md={4}>
        <div>
          <h3>Create Transfer</h3>
          <UsersList
            value={this.state.receiverAccountId}
            onSelect={this.handleUserChange.bind(this)} />
          <FormControl
              name="targetCurrency"
              type="text"
              value={this.state.targetCurrency}
              placeholder="Target currency"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl
              name="amount"
              type="number"
              value={this.state.amount}
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