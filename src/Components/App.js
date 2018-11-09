import React, { Component } from 'react';
import './App.css';
import  Button  from '@material-ui/core/Button'
import NewsList from './NewsList'
// import InputBase from '@material-ui/core/InputBase';


class App extends Component {

  state = {
    logged_in: false,
    searchInput: "",
    news: []
  }

// re-usable code in other components..?
  handleSearch = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  getNews = () => {
    return fetch('http://localhost:3000/news_apis/',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'type': 'everything',
        'query': this.state.searchInput,
        'sort': 'popularity'
      })
    })
        .then(resp => resp.json())
        .then(newsData => this.setState({ news: newsData.articles }))
  }

  componentDidMount() {
    
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.getNews()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >
           Welcome to the source of real news
          </h1>
          <Button variant="contained" color="primary">Sign up</Button>
          <Button variant="contained" color="primary">Log in</Button>
          <form>
              <input type="text" name="search" placeholder="Search..." value={this.state.searchInput} onChange={this.handleSearch} />
            <input type="submit" value="Submit" onClick={this.handleSubmit}/>
          </form>
        </header>
        <NewsList newsData={this.state.news} />
      </div>
    );
  }
}

export default App;
