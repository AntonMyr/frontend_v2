import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import Context from './utils/context';
import AuthCheck from './utils/authcheck';

import Home from './hooks/home';
import Header from './hooks/header';
import HooksContainer1 from './hooks/hook1';
import Callback from './hooks/callback';
import HooksForm from './hooks/hooks_form1';
import PrivateComponent from './hooks/privatecomponent';
import Profile from './hooks/profile';
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
              <Route path='/hooksform' component={HooksForm} />
              <Route path='/profile' component={Profile} />
              <Route path='/hookscontainer' component={HooksContainer1} />
              <Route path='/authcheck' component={AuthCheck} />
              <Route path='/notifications' component={Notifications} />
              <PrivateRoute path='/privateroute'
                            auth={context.authState}
                            component={PrivateComponent} />
              <PrivateRoute path="/profile"
                            auth={context.authState}
                            component={Profile} />
              <Route path='/callback' render={(props) => {
                context.handleAuth(props); return <Home />
                }}/>

            </Switch>
          </div>
          </Router>
        </div>
  )}

export default Routes;