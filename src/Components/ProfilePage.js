import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem'
// import InputBase from '@material-ui/core/InputBase';


class ProfilePage extends Component {

      displayAllNews = () => {
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }

    
       ComponentDidMount(){ 
        
    }

    render() {
    return (
      <div>
        <h1>Welcome, {this.props.username}</h1>
        <br />
        <h3>Your categories: </h3>
        <div class="ui segment">
          {this.props.categories.map(categoryItem => <span>{categoryItem.name} </span>)}
        </div>
        {this.displayAllNews()}
      </div>
    );
  }
}

export default ProfilePage;
