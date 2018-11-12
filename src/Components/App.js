import React, { Component } from 'react';
import './App.css';
import  Button  from '@material-ui/core/Button'
import NewsList from './NewsList'
import HomeFilterForm from './HomeFilterForm'
// import InputBase from '@material-ui/core/InputBase';


class App extends Component {

  state = {
    logged_in: false,
    searchInput: "",
    news: [],
    country: "us",
    category: "All"

  }

// re-usable code in other components..?
  handleSearch = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  // getNews = () => {
  //   return fetch('http://localhost:3000/news_apis/',  {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       'type': 'everything',
  //       'query': this.state.searchInput,
  //       'sort': 'popularity'
  //     })
  //   })
  //       .then(resp => resp.json())
  //       .then(newsData => this.setState({ news: newsData.articles }))
  // }

  
  getNewsHeadlines = () => {
    return fetch('http://localhost:3000/news_apis/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'country': this.state.country,
        'category': this.state.category
      })
    }).then(resp => resp.json())
      .then(newsData => this.setState({news: newsData.articles}))
      // .then(() => console.log(this.state.news))
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.getNewsHeadlines()
  }


  componentDidMount() {
    this.getNewsHeadlines()
  }



  render() {
    const { handleChange, handleSubmit, getNewsHeadlines } = this
    const { news } = this.state
    return (
      <div className="App">
        <header>
          <h1
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >
           Welcome to the source of #real news
          </h1>
          <Button variant="contained" color="primary">Sign up</Button>
          <Button variant="contained" color="primary">Log in</Button>
          <HomeFilterForm handleChange={handleChange} handleSubmit={handleSubmit} />
          {/* <form>
              <input type="text" name="search" placeholder="Search..." value={this.state.searchInput} onChange={this.handleSearch} />
            <input type="submit" value="Submit" onClick={handleSubmit}/>
          </form> */}
        </header>
        <NewsList newsData={news} 
        // getDefaultNews={handleSubmit} 
        />
      </div>
    );
  }
}

export default App;
