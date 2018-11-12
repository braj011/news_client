import React, { Component } from 'react';
import './App.css';

// import Card from '@material-ui/core/Card';
import { Card } from 'semantic-ui-react'

// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    const { news } = this.props
    return (
      <Card>
        <div className="content">
          {news.title} - {news.author}
          <p> {news.description} </p>
        </div>
      </Card>
      )
  }
}

export default NewsItem;
