import React, { Component } from 'react';
import './App.css';
import  Button  from '@material-ui/core/Button'

// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    return (
      <div>
        {this.props.news.title} - {this.props.news.author}
      </div>
    );
  }
}

export default NewsItem;
