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
        Profile Page for {this.props.username}<br />
        Categories: {this.props.categories.map(categoryItem => <span>{categoryItem.name} </span>)}
        {this.displayAllNews()}
      </div>
    );
  }
}

export default ProfilePage;
