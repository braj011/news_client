import React from 'react'

// import API from './API'

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = event =>
  this.setState({ [event.target.name]: event.target.value })

  render () {
    const { username, password } = this.state
    const { handleChange } = this
    const { handleSignup } = this.props
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
        <button variant='contained' type='submit' color='primary' onClick={e => {
          e.preventDefault()
          handleSignup(this.state.username, this.state.password)
          }} > 
          Submit
        </button>
      </form>


    )
  }

} 

export default SignupForm