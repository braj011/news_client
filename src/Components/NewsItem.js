import React, { Component } from 'react';
import './App.css';
import  Button  from '@material-ui/core/Button'

// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    return (
      <ul>
        <li>{this.props.news.title} - {this.props.news.author}</li>
      </ul>
    );
  }
}

export default NewsItem;
