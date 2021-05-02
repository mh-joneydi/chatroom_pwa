import React, { PureComponent } from 'react';
import Login from './pages/Login';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';
import Err404 from './pages/Err404';
import { connect } from 'react-redux';
import { logIn, logOut } from './redux/actions';
import { getCookie } from './Cookies';
import Chatroom from './pages/Chatroom';
import WithLayoutRoute from './components/HOC/withLayoutRoute';
import Signup from './pages/Signup';


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
    this.date = new Date().getTime()
    console.log(this.date)
  }

  render() {
      return (
        <Router history={history}>
            <Switch>
              <WithLayoutRoute path="/" component={Home} exact />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <WithLayoutRoute path="/chatroom" component={Chatroom} secret/>
              <WithLayoutRoute component={Err404} />
            </Switch>
        </Router>
      );
  }
}

export default connect(null,{ logIn, logOut })(App);
