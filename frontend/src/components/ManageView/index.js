import { TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import routerConfig from 'configs/routerConfig';
import constant from 'constant';
import helper from 'helper';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.scss';
import TotalStaff from './TotalStaff';

const MANAGE_ROUTES = constant.ROUTES.MANAGE;

// Menu chỉ bao gồm 1 cấp sub menu
const menu = [
  // xem nhân viên
  {
    isSubMenu: false,
    to: MANAGE_ROUTES.VIEW_LIST,
    title: 'Danh sách nhân viên',
    icon: <TeamOutlined />,
  },
  // thêm nhân viên
  {
    isSubMenu: true,
    title: 'Thêm nhân viên',
    icon: <UsergroupAddOutlined />,
    list: [
      {
        to: MANAGE_ROUTES.ADD_STAFF,
        title: 'Nhân viên',
      },
      {
        to: MANAGE_ROUTES.ADD_DOCTOR,
        title: 'Bác sĩ',
      },
    ],
  },
];

function ManageView() {
  const { renderRoutes, manageRoutes } = routerConfig;

  return (
    <Router>
      <div className="admin-view control-box-shad w-100">
        <Row>
          <Col className="menu-border" span={24} md={6}>
            <Menu defaultSelectedKeys={['0']} mode="inline">
              {helper.renderMenu(menu)}
            </Menu>
          </Col>

          {/* main content */}
          <Col className="main-content" span={24} md={18}>
            <Switch>
              {renderRoutes(manageRoutes, true)}
              <Route component={TotalStaff} />
            </Switch>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default ManageView;
