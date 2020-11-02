import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';
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
const Login = React.lazy(() => import('./views/Login/Login'));

// Forgot Password
const ForgotPassword = React.lazy(() => import('./views/Login/ForgotPassword'));

// Password Reset Confirm
const PasswordResetConfirm = React.lazy(() => import('./views/Login/PasswordResetConfirm'));

// Containers
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout/DefaultLayout'));

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            <Route exact path="/forgot-password" name="Forgot Password" component={ForgotPassword}/>
            <Route path="/password-reset/:uid/:token" name="Password Reset Confirm" component={PasswordResetConfirm}/>
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
};

const render = () => {
  ReactDOM.render(<App />, rootElement);
};

store.subscribe(render);
render();
