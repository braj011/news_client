import React from 'react'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
// import API from './API'

class LoginButtons extends React.Component {
 

  render () {
    const { handleSubmit, handleSignup, signout, logged_in } = this.props
    return(
        <div>
          {!logged_in ?  
          <div>
            <Link to="/signup">
              <button className="auth-button">Sign up</button>
            </Link>
            <Route path='/signup' render={props => <SignupForm {...props} handleSignup={handleSignup} />} />

            <Link to="/login">
              <button className="auth-button" >Log in</button>
            </Link>
            <Route path='/login' render={props => <LoginForm {...props} handleSubmit={handleSubmit} />} />
          </div>
          :
          <div>
            <input type="button" className="get-news-button" value="Log Out" onClick={signout}/>
          </div>
          }
    </div>
    )
  }

} 

export default LoginButtons