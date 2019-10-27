
import auth0 from 'auth0-js'
import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'godseye.eu.auth0.com',
    clientID: 'UMCRGZLvdVhv0qLpjESzKstydjPdofIZ',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    audience: "http://localhost:5000/",
    scope: 'openid profile email'
  })

  userProfile = {}

  login = () => {
      this.auth0.authorize()
  }

  handleAuth = () => {
    this.auth0.parseHash((err, authResult) => {
      console.log("BEING run");
      if(authResult) {
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)

        let expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()))
        localStorage.setItem('expiresAt', expiresAt)

        this.getProfile();
        console.log("USER: ", this.userProfile);
        setTimeout(() => { history.replace('/authcheck') }, 600);
      } else {
        console.log(err)
      }
    })
  }

  getAccessToken = () => {
    if(localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token')
      return accessToken
    } else {
      return null
    }
  }


  getProfile = () => {
    let accessToken = this.getAccessToken()
    console.log("WHY isn't this logging?");
    if(accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
          if(profile) {
            this.userProfile = { profile }
          }
      } )
    }
  }


  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
    setTimeout(() => { history.replace('/authcheck') }, 200);
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    return new Date().getTime() < expiresAt
  }

}