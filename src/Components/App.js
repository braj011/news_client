import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Link } from 'react-router-dom'

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
    if (user.error) {
      alert(user.error)
      this.props.history.push('/login')
    } else {
      localStorage.setItem('token', user.token)
      this.setState({ user_name: user.username, user_id: user.id})
      this.props.history.push('/home')
      API.getProfile(this.state.user_id)
            .then(user => {
              this.setState({ user_categories: user[1], logged_in: true })
            })
            .then(this.getProfileNews) 
    } 
  }

  signout = () => {
    localStorage.removeItem('token')
    this.setState({ user_name: "", user_id: "", logged_in: false, user_categories: [] })
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
    if (localStorage.getItem('token')) { 
    API.validate()
      .then(user => this.login(user))
      .then(this.props.history.push('/home'))
      .catch(error => {
        this.props.history.push('/home')
        
      })
    } 
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

  handleSignup = (username, password) => {
    API.signup(username, password)
      .then(this.login)
      .catch(err => console.log(err))
  }

  render() {

    const { handleChange, handleSubmit, handleSignup, handleSearch, filterByAuthorOrArticle, signout, updateState, getProfileNews, getNewsHeadlines } = this

    const { searchInput, logged_in, user_categories, user_name, user_id } = this.state
    return (
      <div className="App container">
        <header>
          <div className="row">
          <div className="col-6 text-left"> 
          <div className="row">
          <div className="col-4">
            <Link to="/home">
              <h1 className="App-link" target="_blank" rel="noopener noreferrer">
                  #RealNews       
              </h1>  
            </Link>
            </div>
                <div className="col-8 pt-2 pl-4"> 
                  {this.state.logged_in ? <button className="btn btn-outline-success" onClick={getProfileNews} >&#x21bb;</button>
                  : <button className="btn btn-outline-success" onClick={getNewsHeadlines} >&#x21bb;</button>}
                  
                </div>
              </div>
           </div>
          <div className="col-6 text-right">
          <LoginButtons handleSubmit={handleSubmit} handleSignup={handleSignup} signout={signout}
          user_name={user_name} getProfileNews={getProfileNews} getNewsHeadlines={getNewsHeadlines} user_id={user_id} user_categories={user_categories} 
          handleChange={handleChange} handleSearch={handleSearch} 
          searchInput={searchInput} filterByAuthorOrArticle={filterByAuthorOrArticle} logged_in={logged_in} updateState={updateState}
          />
          </div>
        </div>
        </header>
        
          <Route path='/home' render={props => <Home {...props} user_name={user_name} getProfileNews={getProfileNews} getNewsHeadlines={getNewsHeadlines} user_id={user_id} user_categories={user_categories} 
          handleChange={handleChange} handleSubmit={handleSubmit} handleSearch={handleSearch} 
          searchInput={searchInput} filterByAuthorOrArticle={filterByAuthorOrArticle} logged_in={logged_in} updateState={updateState}/>} />
  

       
       {/* <SearchBar searchInput={this.state.searchInput} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit}/> */}
      </div>
    );
  }
}

export default withRouter(App);
