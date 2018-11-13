import React from 'react'
// import { Route, withRouter } from 'react-router-dom'

// import API from './API'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = event =>
  this.setState({ [event.target.name]: event.target.value })

  render () {
    const { username, password } = this.state
    const { handleChange, handleSubmit } = this
    return(
      <form>
          <label className="grey-text" margin='normal'> Username</label>
          <input id='usernameInput' value={username} name='username' className="form-control" 
            onChange={handleChange}/>  
        <br/>
          <label className="grey-text" margin='normal'> Password</label>
          <input id='passwordInput' value={password} type='password' name='password' className="form-control" 
            onChange={handleChange} />
          
        <br/>
        <button variant='contained' type='submit' color='primary' onClick={handleSubmit} >
        
          LOGIN
        </button>
      </form>


    )
  }

} 

export default LoginForm