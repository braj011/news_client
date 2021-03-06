class API {
  static init () {
 
    this.newsUrl = 'http://localhost:3000/news_apis'  // for when on local 

    this.baseUrl = 'http://localhost:3000'
    this.loginUrl = this.baseUrl + '/login'
    this.signupUrl = this.baseUrl + '/signup'
    this.validateUrl = this.baseUrl + '/validate'

  }

  static login (username, password) {
    return fetch(this.loginUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    }).then(resp => resp.json())
  }

  static signup (username, password) {
    return fetch(this.signupUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        username,
        password
      })
    }).then(resp => resp.json())
  }

  static validate () {
    return this.get(this.validateUrl)
  }

  static get (url) {
    const token = localStorage.getItem('token')
    return fetch(url, {
      headers: {'Authorization': token}
    }).then(resp => resp.json())
  }

  static getProfile (id) {
    return this.get(`http://localhost:3000/users/${id}`)
}

static addCategory (newCategory) {
 return fetch('http://localhost:3000/categories/',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': newCategory
      })
    })
        .then(resp => resp.json())
        
}

static createCategoryUser (categoryID, userID){
  return fetch('http://localhost:3000/categories_users/',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'user': userID,
        'category': categoryID
      })
    })
        .then(resp => resp.json())   
    }   

static deleteCategory (categoryID, userID) {
  return fetch('http://localhost:3000/categories_users/',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'user': userID,
        'category': categoryID, 
        'type': 'delete'
      })
    })
        .then(resp => resp.json())
}


} 

API.init()

window.API = API

export default API