import React, { Component } from 'react';
import './App.css';

// import Card from '@material-ui/core/Card';


// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    const { news } = this.props
    return (
      <div className="column">
        <div className="card">
          <div className="ui content">
            <h1 className="ui huge header">
            {news.title} 
            </h1> 
            <div className="meta">
              {news.author}
            </div>
            <div > 
              <img className="image"src={news.urlToImage} alt={news.content} />
            </div>
            <p> {news.description} </p>
          </div>
        </div>
      </div>
      )
  }
}

export default NewsItem;
