import React, { Component } from 'react';
import './App.css';
import API from './API'
// import InputBase from '@material-ui/core/InputBase';


class Categories extends Component {

  state = {
    addCategory: true,
    newCategory: ''
  }
 
     displayCategories = () => {
      return this.props.categories.map((categoryItem, idx) => 

        <button type="button" className="btn btn-secondary" key={idx} onClick={() => this.deleteCategory(categoryItem.id, this.props.user)} id={categoryItem.id}>
          {categoryItem.name}
        </button>

        )
     }
    
     handleClick = () => {
       this.setState({ addCategory: !this.state.addCategory })
     }

     updateCategory = (e) => {
         this.setState({ newCategory: e.target.value })
     }

     addCategory = (e) => {
       e.preventDefault()
      API.addCategory(this.state.newCategory)
        .then(data => { API.createCategoryUser(data.id, this.props.user) 
        this.props.updateState(data)
      })
      .then(() => this.setState({ newCategory: '',  addCategory: false}))
      .then(this.props.getProfileNews)
     }

     deleteCategory = (categoryID, userID) => {
      API.deleteCategory(categoryID, userID).then(data => {this.props.updateState(data.category_id)})
      .then(this.props.getProfileNews)
     }


    render() {
    return (
       <div className="row">
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon1">Categories</button>
                </div>
                
                  {this.displayCategories()}
        
            <form className="input-group" onSubmit={this.addCategory}>
                {this.state.addCategory ? null :
                <input type="text" className="form-control" placeholder="Add Category" value={this.state.newCategory} onChange={this.updateCategory}/>
                }
                <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.handleClick}>+</button>
                </div>
            </form>
          </div>        
      </div>

    );
  }
}

export default Categories;
