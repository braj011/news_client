import React, { Component } from 'react';
import './App.css';
// import InputBase from '@material-ui/core/InputBase';


class SearchBar extends Component {


    render() {
    return (
      <div>
        <form>
              <input type="text" name="search" placeholder="Search..." value={this.props.searchInput} onChange={this.props.handleSearch} />
            <input type="button" value="Get News" onClick={this.props.handleSubmit}/>
          </form>
      </div>
    );
  }
}

export default SearchBar;
