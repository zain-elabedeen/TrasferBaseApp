import React, { Component } from 'react'

class Payout extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.payout.amount} ({this.props.payout.currency})
        </div>
      </div>
    )
  }
}

export default Payout