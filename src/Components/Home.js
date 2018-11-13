import React from 'react'

import NewsList from './NewsList'
import ProfilePage from './ProfilePage'
import HomeFilterForm from './HomeFilterForm'

class Home extends React.Component {
  render () {
    return <div>
      {this.props.logged_in ? 
            <input type="button" className="get-news-button" value="Get News" onClick={this.props.handleSubmit}/> 
          : <HomeFilterForm handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} handleFilter={this.props.handleSearch} searchInput={this.props.searchInput} />
          }
        {this.props.logged_in ? 
          <ProfilePage user={this.props.user_id} username={this.props.user_name} categories={this.props.user_categories} newsData={this.props.filterByAuthorOrArticle()} 
            getProfileNews={this.props.getProfileNews} handleSubmit={this.props.handleSubmit} updateState={this.props.updateState} handleFilter={this.props.handleSearch} /> 
        : <NewsList newsData={this.props.filterByAuthorOrArticle()}   handleFilter={this.props.handleSearch} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>}
    </div>
  }
}

export default Home
