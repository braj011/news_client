import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem'
// import InputBase from '@material-ui/core/InputBase';


class NewsList extends Component {

    displayAllNews = () => {
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }

    render() {
    return (
      <div>
        {this.displayAllNews()}
      </div>
    );
  }
}

export default NewsList;
