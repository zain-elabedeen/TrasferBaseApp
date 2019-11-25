import React, { Component } from 'react'
import Moment from 'react-moment';

class Payout extends Component {
  state = {}

  render() {
    const { payout } = this.props

    const amountColor = payout.amount < 0 ? 'red' : 'green'
    const fromName = payout.amount > 0 ? payout.transfer.senderAccount.user.name : 'You'
    const toName = payout.amount < 0 ? payout.transfer.receiverAccount.user.name : 'You'

    return (
      <tr>
        <td>{fromName}</td>
        <td>{toName}</td>
        <td><font color={amountColor}>{payout.amount}</font></td>
        <td>{payout.currency}</td>
        <td><Moment format="MMM, DD YYYY HH:mm">{payout.createdAt}</Moment></td>
        <td><Moment format="MMM, DD YYYY HH:mm">{payout.updatedAt}</Moment></td>
      </tr>
    )
  }
}

export default Payout
