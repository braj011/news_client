import React from 'react'

import { countries, categories } from '../country_categories.js'

const HomeFilterForm = (props) => {
  return (
    <div className="row">
      <div className="col-6 pb-2">
        <div className="form-row align-items-center">
          <div className="form-group col">
            <span>Country: </span>
              <select name="country" className="form-control" onChange={props.handleChange}>
                {countries.map(country => <option key={country.code} value={country.code} >{country.name} </option> )}
              </select> 
          </div>
        <div className="form-group col">
          <span>Category: </span>
            <select name="category" className="form-control" onChange={props.handleChange}>
              {categories.map(category => <option key={category.code} value={category.code}>{category.name} </option> )}
            </select> 
        </div>
        <div className="form-group col pt-4 text-left">
          <button className="btn btn-outline-info" onClick={props.getNewsHeadlines}>Get News</button>
        </div>
      </div>
    </div>
      <div className="col-6 pt-4">
        <input className="form-control " placeholder="Filter by Author or Article" onChange={props.handleSearch} value={props.searchInput} />
      </div>
      
    </div>
  )
}

export default HomeFilterForm