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
import navigation from '../../navigation/navigation';

// routes config
import routes from '../../navigation/routes';

import style from './DefaultLayout.module.css';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const signOut = (e) => {
    e.preventDefault();
    auth.removeToken();
    props.history.push('/login')
  };

  const containerStyle = {
    zIndex: 1999
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
        <AppSidebar fixed display="lg" width={300}>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container className={style.Container}>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
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
                <Redirect from="/" to="/my-reports" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>

    </div>
  );
};

export default DefaultLayout;
