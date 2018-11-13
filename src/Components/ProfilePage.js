import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem';
// import InputBase from '@material-ui/core/InputBase';
import Categories from './Categories';

class ProfilePage extends Component {

      displayAllNews = () => {
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }
   
    render() {
    return (
      <div className="container">
        <h1>Welcome, {this.props.username} </h1>
          <Categories categories={this.props.categories} user={this.props.user} updateState={this.props.updateState}/>
           <div>
             <input type="button" className="get-news-button" value="&#x21bb;" onClick={this.props.handleSubmit}/>
             <input className="filter-author-article" placeholder="Filter by Author or Article" onChange={this.props.handleFilter} value={this.props.searchInput}></input>
           </div>
         <div className="row">
          {this.displayAllNews()}
         </div>
      </div>
    );
  }
}

export default ProfilePage;
