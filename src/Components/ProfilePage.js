import React, { Component } from 'react';
import './App.css';
import NewsItem from './NewsItem';
// import InputBase from '@material-ui/core/InputBase';
import Categories from './Categories';


class ProfilePage extends Component {

      displayAllNews = () => {
      return this.props.newsData.map((item, idx) => <NewsItem news={item} key={idx}/>)
    }
   
    render() {
    return (
      <div>
      <div className="row pt-4">
        <div className="col-8 pl-4">
          <Categories categories={this.props.categories} user={this.props.user} updateState={this.props.updateState} getProfileNews={this.props.getProfileNews}/>
          </div>
           <div className="col-4 text-right">
             <input className="form-control" placeholder="Filter by Author or Article" onChange={this.props.handleFilter} value={this.props.searchInput}></input>
           </div>
           </div>
         <div className="row mt-4">
          {this.displayAllNews()}
         </div>
      </div>
    );
  }
}

export default ProfilePage;
