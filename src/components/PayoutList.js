import React, { Component } from 'react'
import Payout from './Payout'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
            <div>
              {payoutsToRender && payoutsToRender.map(
                payout => 
                  <Payout key={payout.id}
                   payout={payout}
                  />
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default PayoutList