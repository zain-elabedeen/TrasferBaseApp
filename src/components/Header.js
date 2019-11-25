import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    //TODO: Use JWT in request headers or coockies
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <div className='pull-right'>
          {authToken ? (
            <div
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/login`)
              }}
            >
              Logout
            </div>
          ) : 
            ''
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)