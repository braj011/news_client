import React from 'react'

import NewsList from './NewsList'
import ProfilePage from './ProfilePage'
import HomeFilterForm from './HomeFilterForm'


class Home extends React.Component {

  componentDidMount() {
     this.props.logged_in ?
        this.props.getProfileNews()
        :
        this.props.getNewsHeadlines() 
  }

  render () {
    return <div>
     
        {this.props.user_name ? 
            null 
          : <HomeFilterForm handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} handleSearch={this.props.handleSearch} searchInput={this.props.searchInput}
            getNewsHeadlines={this.props.getNewsHeadlines} />
          }
    

        {this.props.user_name ? 
          <ProfilePage user={this.props.user_id} username={this.props.user_name} categories={this.props.user_categories} newsData={this.props.filterByAuthorOrArticle()} 
            getProfileNews={this.props.getProfileNews} handleSubmit={this.props.handleSubmit} updateState={this.props.updateState} handleFilter={this.props.handleSearch} /> 
        : <NewsList newsData={this.props.filterByAuthorOrArticle()} handleFilter={this.props.handleSearch} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>}
    </div>
  }
}

export default Home
