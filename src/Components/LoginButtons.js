import React from 'react'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
// import API from './API'

class LoginButtons extends React.Component {
 

  render () {
    const { handleSubmit, signout} = this.props
    return(
        <div>
        <Link to="/signup">
        <button className="auth-button">Sign up</button>
      </Link>
        {/* <Route path='/signup' render={props => <SignupForm {...props} />} /> */}

      <Link to="/login">
        <button className="auth-button" >Log in</button>
      </Link>
      <Route path='/login' render={props => <LoginForm {...props} handleSubmit={handleSubmit} />} />
      <input type="button" className="get-news-button" value="Log Out" onClick={signout}/>
    </div>
    )
  }

} 

export default LoginButtons