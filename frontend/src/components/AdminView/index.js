import {
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import routerConfig from 'configs/routerConfig';
import constant from 'constant';
import helper from 'helper';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.scss';
import TotalStaff from './TotalStaff';

const ADMIN_ROUTES = constant.ROUTES.ADMIN;

// Menu chỉ bao gồm 1 cấp sub menu
const menu = [
  // xem nhân viên
  {
    isSubMenu: false,
    to: ADMIN_ROUTES.VIEW_LIST,
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
        to: ADMIN_ROUTES.ADD_STAFF,
        title: 'Nhân viên',
      },
      {
        to: ADMIN_ROUTES.ADD_DOCTOR,
        title: 'Bác sĩ',
      },
    ],
  },
  // quản lý quyên
  {
    isSubMenu: true,
    title: 'Quản lý quyền',
    icon: <SettingOutlined />,
    list: [
      {
        to: '/',
        title: 'Xem quyền người dùng',
      },
      {
        to: '/',
        title: 'Cấp/Thu hồi quyền',
      },
    ],
  },
  // nhật ký hệ thống
  {
    isSubMenu: true,
    title: 'Nhật ký hệ thống',
    icon: <FileTextOutlined />,
    list: [
      {
        to: '/',
        title: 'Hành động người dùng',
      },
      {
        to: '/',
        title: 'Nhật ký cấp nhật lương',
      },
    ],
  },
];

function AdminView() {
  const { renderRoutes, adminRoutes } = routerConfig;

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
              {renderRoutes(adminRoutes, true)}
              <Route component={TotalStaff} />
            </Switch>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default AdminView;
