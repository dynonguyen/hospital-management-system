import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import routerConfig from 'configs/routerConfig';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getUser } from 'redux/slices/user.slice';
import 'utils/scss/index.scss';
const NotFound = React.lazy(() => import('components/NotFound'));
const { routes, renderRoutes } = routerConfig;

function App() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuth = username ? true : false;
  // get user
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Suspense
          fallback={
            <Spin
              className="trans-center"
              size="large"
              indicator={LoadingOutlined}
              tip="Đang tải dữ liệu ..."
            />
          }>
          <Switch>
            {renderRoutes(routes, isAuth)}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
