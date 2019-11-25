import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'

import Login from './Login'
import CreateTransfer from './CreateTransfer';
import PayoutList from './PayoutList';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={PayoutList} />
            <Route exact path="/create-transfer" component={CreateTransfer} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App