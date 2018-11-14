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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password
      })
    }).then(resp => resp.json())
  }

  static validate () {
    const token = localStorage.getItem('token')
    return fetch(this.validateUrl, {
      headers: {'Authorization': token}
    }).then(resp => resp.json())
  }



} 

API.init()

window.API = API

export default API