import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import { AUTH_TOKEN } from '../constants'

import Login from './Login'
import CreateTransfer from './CreateTransfer';
import PayoutList from './PayoutList';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={PayoutList} />
            <Route exact path="/create-transaction" component={CreateTransfer} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App