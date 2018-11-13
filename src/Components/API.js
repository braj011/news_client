class API {
  static init () {
 
    this.newsUrl = 'http://localhost:3000/news_apis'  // for when on local 
    this.baseUrl = 'http://localhost:3000'
    this.loginUrl = this.baseUrl + '/login'
    this.validateUrl = this.baseUrl + '/validate'

  }

} 

API.init()

window.API = API

export default API