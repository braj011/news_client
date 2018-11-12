import React, { Component } from 'react';
import './App.css';
import  Button  from '@material-ui/core/Button'
import NewsList from './NewsList'
import SearchBar from './SearchBar'
import ProfilePage from './ProfilePage'
// import InputBase from '@material-ui/core/InputBase';


class App extends Component {

  state = {
    logged_in: true,
    searchInput: "",
    news: [],
    user_id: 2,
    user_name: '',
    user_categories: []
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

  getProfileNews = () => {
    if (this.state.news.length > 0) {
      this.setState({ news: []})
    }
    let categories = this.state.user_categories.map(categoryItem => categoryItem.name)
    return fetch('http://localhost:3000/news_apis_profile/',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'type': 'everything',
        'query': categories.join(" "),
        'sort': 'popularity'
      })
    })
        .then(resp => resp.json())
        .then(newsData => this.setState({ news: newsData.articles }))
        
  }

  getProfile = () => {
    return fetch (`http://localhost:3000/users/${this.state.user_id}`)
    .then(resp => resp.json())
    .then(user => this.setState({ user_name: user[0].username, user_categories: user[1] }))
    
} 

  componentDidMount() {
  // this.state.logged_in? this.getProfile() : this.getNewsHeadlines() 
  this.getProfile()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.getProfileNews()
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
          {this.state.logged_in ? <input type="button" value="Get News" onClick={this.handleSubmit}/> : <SearchBar searchInput={this.state.searchInput} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit}/>}
        </header>
        {this.state.logged_in ? <ProfilePage user={this.state.user_id} username={this.state.user_name} categories={this.state.user_categories} newsData={this.state.news} getProfileNews={this.getProfileNews}/> : <NewsList newsData={this.state.news} />}
      </div>
    );
  }
}

export default App;
