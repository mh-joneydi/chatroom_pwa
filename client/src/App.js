import React, { PureComponent } from 'react';
import Login from './pages/Login';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import { connect } from 'react-redux';
import { logIn, logOut } from './redux/actions';
import { getCookie } from './Cookies';
import Chatroom from './pages/Chatroom';
import Signup from './pages/Signup';
import SecretRoute from './components/HOC/SecretRoute';


class App extends PureComponent {
  constructor(props){
    super(props);
    this.user = getCookie('user');
    if(this.user) {
        this.user = JSON.parse(this.user);
        props.logIn(this.user);
    }else {
        props.logOut()
    }
  }

  render() {
      return (
        <Router history={history}>
            <Switch>
              <SecretRoute path="/" component={Chatroom} exact />
              <Route path="/login" component={Login} exact/>
              <Route path="/signup" component={Signup} exact/>
              <Route render={()=><Redirect to='/' />} />
            </Switch>
        </Router>
      );
  }
}

export default connect(null,{ logIn, logOut })(App);
