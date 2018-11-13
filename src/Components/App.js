import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

// import API from './API'
import LoginForm from './LoginForm'
import NewsList from './NewsList'
import HomeFilterForm from './HomeFilterForm'

import ProfilePage from './ProfilePage'


class App extends Component {

  state = {
    logged_in: false,
    searchInput: "",
    news: [],
    user_id: 2,
    user_name: '',
    user_categories: [],
    country: "us",
    category: "All",
    loginClicked: false
  }

  updateState = (update) => {
    if (Number.isInteger(update)){
      this.setState({ user_categories: this.state.user_categories.filter(item => item.id !== update) })
    } else {
    this.setState({ user_categories: [...this.state.user_categories, update] })
        }
  }


  handleSearch = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  filterByAuthorOrArticle = () => {
    return this.state.news.filter(article => {
      // if (article.author) {
        return article.author.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
            || article.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
      // } 
    })
  }  

  loginClick = () => {
    this.setState({ loginClicked: !this.state.loginClicked })
  }
  
  getNewsHeadlines = () => {
    if (this.state.news.length > 0) {
      this.setState({ news: []})
    }
    return fetch('http://localhost:3000/news_apis/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'country': this.state.country,
        'category': this.state.category
      })
    }).then(resp => resp.json())
      .then(newsData => {
        const news = newsData.articles.map(article => {
          if (!article.author) {
            return {...article, author: "Unknown"}
            // spreading existing articles and if author key is falsey, it gets replaced with "Unknown"
          } else {
            return article
          }
        })
        this.setState({news: news})
      }) 
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
        'query': categories.join(" OR "),
        'sort': 'popularity'
      })
    })
        .then(resp => resp.json())
        .then(newsData => {
          const news = newsData.articles.map(article => {
            if (!article.author) {
              return {...article, author: "Unknown"}
              // spreading existing articles and if author key is falsey, it gets replaced with "Unknown"
            } else {
              return article
            }
          })
          this.setState({news: news})
        }) 
    }

  getProfile = () => {
    return fetch (`http://localhost:3000/users/${this.state.user_id}`)
    .then(resp => resp.json())
    .then(user => this.setState({ user_name: user[0].username, user_categories: user[1] }))
    
} 

  componentDidMount() {
  this.state.logged_in ? 
    this.getProfile().then(this.getProfileNews) 
    : 
    this.getNewsHeadlines() 
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.state.logged_in ? this.getProfileNews() : this.getNewsHeadlines()
  }

  render() {
    const { handleChange, handleSubmit, handleSearch, filterByAuthorOrArticle, loginClick } = this
    const { searchInput, loginClicked } = this.state
    return (
      <div className="App">
        <header>
          <h1
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >Welcome to the source of #real news
          </h1>
          <button className="auth-button">Sign up</button>
          <button className="auth-button" onClick={loginClick}>Log in</button>
          { loginClicked ?
              <Route path='/login' render={props => <LoginForm {...props} />} />
              : 
              null
          }
          

          {this.state.logged_in ? 
            <input type="button" className="get-news-button" value="Get News" onClick={this.handleSubmit}/> 
          : <HomeFilterForm handleChange={handleChange} handleSubmit={handleSubmit} handleFilter={handleSearch} searchInput={searchInput} />}
        </header>
        {this.state.logged_in ? 
          <ProfilePage user={this.state.user_id} username={this.state.user_name} categories={this.state.user_categories} newsData={filterByAuthorOrArticle()} 
            getProfileNews={this.getProfileNews} handleSubmit={handleSubmit} updateState={this.updateState} handleFilter={handleSearch} /> 
        : <NewsList newsData={this.filterByAuthorOrArticle()}   handleFilter={handleSearch} handleChange={handleChange} handleSubmit={handleSubmit}/>}


       
       {/* <SearchBar searchInput={this.state.searchInput} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit}/> */}
      </div>
    );
  }
}

export default App;
