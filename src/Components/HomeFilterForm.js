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
      <button onClick={props.handleSubmit}>Get News</button>
    </div>
  )
}

export default HomeFilterForm