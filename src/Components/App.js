import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Link, Switch } from 'react-router-dom'

import API from './API'
import LoginButtons from './LoginButtons'
// import NewsList from './NewsList'
// import HomeFilterForm from './HomeFilterForm'
import Home from './Home'

// import ProfilePage from './ProfilePage'

class App extends Component {

  state = {
    logged_in: false,
    searchInput: "",
    news: [],
    user_id: "",
    user_name: "",
    user_categories: [],
    country: "us",
    category: "All"
  }

  updateState = (update) => {
    if (Number.isInteger(update)){
      this.setState({ user_categories: this.state.user_categories.filter(item => item.id !== update) })
    } else {
    this.setState({ user_categories: [...this.state.user_categories, update] })
        }
  }

  login = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({ user_name: user.username, user_id: user.id})
    this.props.history.push('/home')
    API.getProfile(this.state.user_id)
          .then(user => {
            this.setState({ user_categories: user[1] })
          })
          .then(this.getProfileNews) 
  }

  signout = () => {
    localStorage.removeItem('token')
    this.setState({ user_name: '', user_id: '', logged_in: false, user_categories: [] })
    this.props.history.push('/home')
    this.getNewsHeadlines()
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
  
  getNewsHeadlines = () => {
    if (this.state.news.length > 0) {
      this.setState({ news: []})
    }
    const token = localStorage.getItem('token')
    return fetch('http://localhost:3000/news_apis/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
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

  

  componentDidMount() {
    if (!localStorage.getItem('token')) return 
    API.validate()
    .then(user => this.login(user))
    .then(this.props.history.push('/home'))
    .catch(error => {
      this.getNewsHeadlines() 
      this.props.history.push('/home')
    })
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  handleSubmit = (username, password) => {
   
    // this.state.logged_in ? this.getProfileNews() : this.getNewsHeadlines()
    API.login(username, password)
      .then(this.login)
      .catch(err => console.log(err))
  }

  render() {
    const { handleChange, handleSubmit, handleSearch, filterByAuthorOrArticle, signout } = this
    const { searchInput, logged_in, user_categories, user_name, user_id } = this.state
    return (
      <div className="App">
        <header>
          <h1
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >Welcome to the source of #real news
          </h1>
          
          <LoginButtons handleSubmit={handleSubmit} signout={signout}/>
        </header>
          
        <Route path='/home' render={props => <Home {...props} user_name={user_name} user_id={user_id} user_categories={user_categories} handleChange={handleChange} handleSubmit={handleSubmit} handleFilter={handleSearch} 
        searchInput={searchInput} filterByAuthorOrArticle={filterByAuthorOrArticle} logged_in={logged_in} />} />


       
       {/* <SearchBar searchInput={this.state.searchInput} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit}/> */}
      </div>
    );
  }
}

export default withRouter(App);
