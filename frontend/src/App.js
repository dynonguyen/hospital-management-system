import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import routerConfig from 'configs/routerConfig';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'utils/scss/index.scss';
const NotFound = React.lazy(() => import('components/NotFound'));
const { routes, renderRoutes } = routerConfig;

function App() {
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
            {renderRoutes(routes, true)}
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
