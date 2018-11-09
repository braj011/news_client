import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Button  from '@material-ui/core/Button'
// import InputBase from '@material-ui/core/InputBase';


class App extends Component {

  state = {
    logged_in: false,
    searchInput: ""
  }

// re-usable code in other components..?
  handleSearch = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  handle

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h1
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >
           Welcome to the source of real news
          </h1>
          <Button variant="contained" color="primary">Sign up</Button>
          <br></br>
          <Button variant="contained" color="primary">Log in</Button>
          <form>
              <input type="text" name="search" placeholder="Search..." value={this.state.searchInput} onChange={this.handleSearch} />
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
