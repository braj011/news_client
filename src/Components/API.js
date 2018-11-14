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

} 

API.init()

window.API = API

export default API