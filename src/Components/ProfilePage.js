import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem'
// import InputBase from '@material-ui/core/InputBase';


class ProfilePage extends Component {

      displayAllNews = () => {
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }

    
     displayCategories = () => {
      return this.props.categories.map((categoryItem, idx) => <button key={idx}>{categoryItem.name} </button>)
     }

    render() { 
    return (
      <div>
        <h1>Welcome, {this.props.username}</h1>
        <h3>Your categories: </h3>
        <div className="ui segment">
          {this.displayCategories()}
          <input type="button" className="get-news-button" value="&#x21bb;" onClick={this.props.handleSubmit}/>
        </div>
         <div>
          <input className="filter-author-article" placeholder="Filter by Author or Article" onChange={this.props.handleFilter} value={this.props.searchInput}></input>
         </div>
        {this.displayAllNews()}
      </div>
    );
  }
}

export default ProfilePage;
