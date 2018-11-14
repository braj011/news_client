import React from 'react'

import { countries, categories } from '../country_categories.js'

const HomeFilterForm = (props) => {
  return (
    <div>
      <span>Country</span>
      <select name="country" onChange={props.handleChange}>
       {countries.map(country => <option key={country.code} value={country.code}>{country.name} </option> )}
      </select> 

      <span>Category</span>
      <select name="category"  onChange={props.handleChange}
      // value={props.category}
      >
       {categories.map(category => <option key={category.code} value={category.code}>{category.name} </option> )}
      </select> 
      <button onClick={props.getNewsHeadlines}>Get News</button>
      <div>
        <br></br>
        <input className="filter-author-article" placeholder="Filter by Author or Article" onChange={props.handleSearch} value={props.searchInput}></input>
      </div>
      <input type="button" className="refresh-button" value="&#x21bb;" onClick={props.getNewsHeadlines}/>
    </div>
  )
}

export default HomeFilterForm