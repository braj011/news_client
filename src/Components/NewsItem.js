import React, { Component } from 'react';
import './App.css';

// import Card from '@material-ui/core/Card';


// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    const { news } = this.props
    return (
      <div className="col-6">
      <div className="bg-white p-4 rounded">
          <div className="row pb-4">
            <h1 className="text-left">
            {news.title} 
            </h1> 
            <div className="meta">
              {news.author}
            </div>
          </div>
          <div className="col-lg"> 
            <img className="img-fluid rounded" src={news.urlToImage} alt={news.content} />
          </div>
          <div className="row pt-4 text-left">
           {news.description}
          </div>
        </div>
      </div>
      )
  }
}

export default NewsItem;
