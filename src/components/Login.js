import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FormControl, Button, Col} from 'react-bootstrap'

import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      id
      name
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
      }
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div className='Login'>
        <h3>{login ? 'Login' : 'Sign Up'}</h3>
        <div className="flex flex-column">
          {!login && (
             <FormControl
              name="name"
              type="text"
              value={this.state.value}
              placeholder="Name"
              onChange={this.handleChange.bind(this)}
            />
          )}
          <FormControl
            name="email"
            type="text"
            value={this.state.value}
            placeholder="Email"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Col xs={4} md={6}>
                <Button onClick={mutation}>
                  {login ? 'Login' : 'Create account'}
                </Button>
              </Col>
            )}
          </Mutation>
          <Col xs={4} md={6}>
            <Button onClick={() => this.setState({ login: !login })} >
              {login ? 'Create new account' : 'Login'}
            </Button>
          </Col>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    // Redirect user to home page after login
    if(this.state.login) {
      const { token } = data.signIn
      this._saveUserData(token)
      this.props.history.push(`/`)
    } else {
      // Render login page after sign up
     this.setState({ login: true})
    }
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login