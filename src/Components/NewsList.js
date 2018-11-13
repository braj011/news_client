import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem'

// import InputBase from '@material-ui/core/InputBase';


class NewsList extends Component {

    displayAllNews = () => {
      // this.props.getDefaultNews()
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }

    render() {
    return (
      <div className="main-content">
        <div className="row">
          {this.displayAllNews()}
        </div>
      </div>
    );
  }
}

export default NewsList;
