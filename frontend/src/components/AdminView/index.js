import {
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import helper from 'helper';
import React from 'react';
import './index.scss';

// Menu chỉ bao gồm 1 cấp sub menu
const menu = [
  // xem nhân viên
  {
    isSubMenu: false,
    to: '/',
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
        to: '/',
        title: 'Quản lý',
      },
      {
        to: '/',
        title: 'Bác sĩ',
      },
      {
        to: '/',
        title: 'Nhân viên',
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
  return (
    <div className="admin-view control-box-shad w-100">
      <Row>
        <Col className="menu-border" span={24} md={6}>
          <Menu defaultSelectedKeys={['0']} mode="inline">
            {helper.renderMenu(menu)}
          </Menu>
        </Col>

        {/* main content */}
        <Col span={24} md={18}></Col>
      </Row>
    </div>
  );
}

export default AdminView;
