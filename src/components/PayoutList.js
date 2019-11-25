import React, { Component } from 'react'
import Payout from './Payout'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Table, Button, Row, Col } from 'react-bootstrap'

export const PAYOUT_QUERY = gql`
  {
    listPayouts {
      id
      accountId
      amount
      currency
      createdAt
      updatedAt
      status
      transfer {
        id
        senderAccount {
          id
          user {
            id
            name
          }
        }
        receiverAccount {
          id
          user {
            id
            name
          }
        }
      }
    }
  }
`

class PayoutList extends Component {
  render() {
    return (
      <Query query={PAYOUT_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching payouts</div>
          if (error) return <div>Error loading payouts</div>

          const payoutsToRender = data.listPayouts

          return (
            <Col xs={12} md={8}>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                  <h1>
                    Transactions
                  </h1>
                </Col>
                <Col xs={6} md={4}>
                  <Button
                    className='button-large'
                    bsStyle='primary'
                    bsSize="large"
                    onClick={ () => (this.props.history.push(`/create-transfer`))}>
                    Create Transaction
                  </Button>
                </Col>
              </Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutsToRender && payoutsToRender.map(
                    payout =>
                    <Payout key={payout.id}
                      payout={payout}
                    />
                  )}
                </tbody>
              </Table>
            </Col>
          )
        }}
      </Query>
    )
  }
}

export default PayoutList