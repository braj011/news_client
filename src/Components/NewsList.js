import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem'
import { Card } from 'semantic-ui-react'

// import InputBase from '@material-ui/core/InputBase';


class NewsList extends Component {

    displayAllNews = () => {
      // this.props.getDefaultNews()
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }

    render() {
    return (
      <div>
        
      <Card.Group itemsPerRow={6}>
        {this.displayAllNews()}
        </Card.Group>
      </div>
    );
  }
}

export default NewsList;
