import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';
import store from "./store/store";
import auth from './services/Auth';
import './scss/app.scss'
import {Spinner} from "./components/Spinner/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

const history = createBrowserHistory();
const rootElement = document.getElementById('root');

const loading = () => {
  return(
    <Spinner/>
  )
};

// Login
const Login = Loadable({
  loader: () => import('./views/Login/Login'),
  loading
});

// Forgot Password
const ForgotPassword = Loadable({
  loader: () => import('./views/Login/ForgotPassword'),
  loading
});

// Password Reset Confirm
const PasswordResetConfirm = Loadable({
  loader: () => import('./views/Login/PasswordResetConfirm'),
  loading
});

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./components/DefaultLayout'),
  loading
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            <Route exact path="/forgot-password" name="Forgot Password" component={ForgotPassword}/>
            <Route path="/password-reset/:uid/:token" name="Password Reset Confirm" component={PasswordResetConfirm}/>
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, rootElement);
};

store.subscribe(render);
render();
