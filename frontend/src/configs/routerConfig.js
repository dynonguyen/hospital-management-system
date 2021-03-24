import constant from 'constant';
import HomePage from 'pages/Home';
import React from 'react';
import { Route } from 'react-router';
const { ROUTES } = constant;
const NotFound = React.lazy(() => import('components/NotFound'));
const Login = React.lazy(() => import('pages/Login'));
const AddStaff = React.lazy(() => import('components/AdminView/AddStaff'));
const TotalStaff = React.lazy(() => import('components/AdminView/TotalStaff'));

// main route for app
const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    isProtect: true,
    component: () => <HomePage />,
  },
  {
    path: ROUTES.ADMIN.ROOT,
    exact: false,
    isProtect: true,
    component: () => <HomePage />,
  },
  {
    path: ROUTES.NOTFOUND,
    exact: true,
    isProtect: false,
    component: () => <NotFound />,
  },
  {
    path: ROUTES.ACCOUNT,
    exact: true,
    isProtect: true,
    component: () => <>Account</>,
  },
];

// route for admin page
const adminRoutes = [
  {
    path: ROUTES.ADMIN.VIEW_LIST,
    exact: false,
    isProtect: true,
    component: () => <TotalStaff />,
  },
  {
    path: ROUTES.ADMIN.ADD_STAFF,
    exact: false,
    isProtect: true,
    component: () => <AddStaff isDoctor={false} />,
  },
  {
    path: ROUTES.ADMIN.ADD_DOCTOR,
    exact: false,
    isProtect: true,
    component: () => <AddStaff isDoctor={true} />,
  },
];

const renderRoutes = (routes, isAuth = false) => {
  return routes.map((route, index) => {
    const { path, exact, component, isProtect } = route;
    const componentRender = !isProtect ? component : isAuth ? component : Login;
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
  adminRoutes,
  renderRoutes,
};
