import constant from 'constant';
import HomePage from 'pages/Home';
import React from 'react';
import { Route } from 'react-router';
const { ROUTES } = constant;
const NotFound = React.lazy(() => import('components/NotFound'));
const Login = React.lazy(() => import('pages/Login'));

const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: () => <HomePage />,
  },
  {
    path: ROUTES.NOTFOUND,
    exact: true,
    component: () => <NotFound />,
  },
  {
    path: ROUTES.ACCOUNT,
    exact: true,
    component: () => <>Account</>,
  },
];

const renderRoutes = (routes, isAuth = false) => {
  return routes.map((route, index) => {
    const { path, exact, component } = route;
    const componentRender = isAuth ? component : Login;
    return (
      <Route
        path={path}
        exact={exact}
        key={index}
        component={componentRender}
      />
    );
  });
};

export default {
  routes,
  renderRoutes,
};
