import React, { Component } from 'react';
import './App.css';

// import Card from '@material-ui/core/Card';


// import InputBase from '@material-ui/core/InputBase';


class NewsItem extends Component {

    render() {
    const { news } = this.props
    return (
      <div className="col-6 mb-4">
        <div className="bg-white p-4 rounded">
          <div className="row pb-4">
            <h1 className="display-4 text-left">
            <a href={news.url} target="_blank">{news.title}</a>
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
          <div className="row pt-4">
            <a href={news.url} target="_blank">
              <button className="btn btn-outline-secondary">More</button>
            </a>
          </div>
        </div>
      </div>
      )
  }
}

export default NewsItem;
