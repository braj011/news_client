class API {
  static init () {
 
    this.baseUrl = 'http://localhost:3000/news_apis'  // for when on local 

  }

  static getNews () {
    return fetch(this.baseUrl)
        .then(resp => resp.json())
  }

  // static getNewsHeadlines () {

  // }

} 

API.init()

export default API;