import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import Context from './utils/context';
import AuthCheck from './utils/authcheck';

import Home from './hooks/home';
import Header from './hooks/header';
import Callback from './hooks/callback';
import Notifications from './hooks/Notifications';



const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/login'}} />
  }
  />
)



const Routes = () => {
    const context = useContext(Context)

    console.log(`https://${process.env.REACT_APP_DOMAIN}/v2/logout`)

    
    // Make so path / is either home screen or login screen
    // Might have to add auth0 lock instead somehow
      return(
        <div className="mainDiv">
          <Router history={history} >
          <Header />
          <div>
            <Switch>
              <PrivateRoute exact auth={context.authState} path='/' component={Home} />
              <Route path='/login' render={(props) => {
                context.authObj.login(); 
              }} />
              <Route path='/logout' component={() => { 
                 window.location.href = `https://${process.env.REACT_APP_DOMAIN}/v2/logout`; 
                 return null;
              }}/>
              <Route path='/authcheck' component={AuthCheck} />
              <PrivateRoute exat auth={context.authState} path='/notifications' component={Notifications} />
             
              <Route path='/callback' render={(props) => {
                context.handleAuth(props); return <Home />
                }}/>

            </Switch>
          </div>
          </Router>
        </div>
  )}

export default Routes;