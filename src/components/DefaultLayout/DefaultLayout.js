import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import auth from '../../services/Auth'

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

// sidebar nav config
import navUser from '../../navigation/navigation-user';
import navAdmin from '../../navigation/navigation-admin';

// routes config
import routes from '../../navigation/routes';

import style from './DefaultLayout.module.css';
import {connect} from "react-redux";
import Page404 from "./Page404";
import resetUser from "./actions/resetUser";

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = ({is_admin, resetUser, ...props}) => {
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const signOut = (e) => {
    e.preventDefault();
    auth.removeToken();
    resetUser();
    props.history.push('/login')
  };

  const containerStyle = {
    zIndex: 1999
  };

  const getRoutes = () => {
    return is_admin ? routes.filter(r => r.users === 'all') : routes;
  };

  const getStartPage = () => {
    return is_admin ? <Redirect from="/" exact to="/reference/reports"/> : <Redirect from="/" exact to="/my-reports" />
  };

  const generateRoutes = () => {
    return(
      <Suspense fallback={loading()}>
        <Switch>
          {getRoutes().map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  <route.component {...props} />
                )} />
            ) : (null);
          })}
          {getStartPage()}
          <Route component={Page404} />
        </Switch>
      </Suspense>
    )
  };

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        draggable={false}
        style={containerStyle}
      />
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e=>signOut(e)}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={is_admin ? navAdmin : navUser} {...props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container className={style.Container}>
            {generateRoutes()}
          </Container>
        </main>
      </div>

    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUser: () => {
      dispatch(resetUser())
    }
  }
};

const mapStateToProps = (store) => (
  {
    is_admin: store.user.is_admin
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
