import {
  ApartmentOutlined,
  AuditOutlined,
  BellOutlined,
  DashboardOutlined,
  ExportOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Tooltip } from 'antd';
import logoUrl from 'assets/images/logo.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const { SubMenu } = Menu;

const menuList = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    isSub: false,
  },
  {
    key: 'user-list',
    title: 'User List',
    icon: <UsergroupAddOutlined />,
    isSub: false,
  },
  {
    key: 'privileges',
    title: 'User / Role Privileges',
    icon: <ApartmentOutlined />,
    isSub: true,
    subMenu: [
      {
        key: 'role-priv',
        title: 'Role Privilege List',
      },
      {
        key: 'user-priv',
        title: 'User Privilege List',
      },
      {
        key: 'create-user',
        title: 'Create User',
      },
      {
        key: 'create-role',
        title: 'Create Role',
      },
    ],
  },
  {
    key: 'grant',
    title: 'Grant / Revoke Privileges',
    icon: <ShareAltOutlined />,
  },
  {
    key: 'audit',
    title: 'Database Auditing',
    icon: <AuditOutlined />,
    isSub: false,
  },
];

function SystemAdmin() {
  const [inlineCollapsed, setInlineCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('dashboard');

  // event: set key active
  const onSelectMenuItem = (key) => {
    if (key !== activeKey) setActiveKey(key);
  };

  // fn: render menu
  function renderMenu(list = []) {
    return (
      list.length > 0 &&
      list.map((item) => {
        const { key, title, icon, isSub } = item;
        return isSub ? (
          <SubMenu title={title} icon={icon} key={key}>
            {item.subMenu.map((sub) => (
              <Menu.Item
                key={sub.key}
                onClick={() => onSelectMenuItem(sub.key)}>
                {sub.title}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item
            key={key}
            icon={icon}
            onClick={() => onSelectMenuItem(key)}>
            {title}
          </Menu.Item>
        );
      })
    );
  }

  return (
    <div className="system-admin w-100vw flex-col">
      {/* Header */}
      <div className="system-admin-header flex-center--ver">
        <div className="brand flex-center--ver h-100">
          <Link to="/">
            <img src={logoUrl} alt="Logo" />
          </Link>
          <h1 className="m-l-8">HOSMS</h1>
        </div>
        <div className="info flex-center-between w-100 h-100">
          <Tooltip
            title={`${inlineCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}`}>
            <div onClick={() => setInlineCollapsed(!inlineCollapsed)}>
              {!inlineCollapsed ? (
                <MenuFoldOutlined className="menu-fold-icon" />
              ) : (
                <MenuUnfoldOutlined className="menu-fold-icon" />
              )}
            </div>
          </Tooltip>
          <ul className="flex-center--ver justify-content-end">
            <li className="info-item">
              <MailOutlined className="icon" />
            </li>
            <li className="info-item">
              <BellOutlined className="icon" />
            </li>
            <li className="info-item d-flex">
              <UserOutlined className="icon m-r-4" />
              <span className="fw-b">Admin 01</span>
            </li>
            <li className="info-item d-flex">
              <ExportOutlined className="icon m-r-4" />
              <span className="fw-b">Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Menu */}
      <div className="d-flex flex-grow-1">
        <div
          className={`system-admin-menu ${inlineCollapsed ? 'collapsed' : ''}`}>
          <Menu
            className="h-100"
            defaultSelectedKeys={menuList[0].key}
            defaultOpenKeys={['privileges']}
            inlineCollapsed={inlineCollapsed}
            mode="inline"
            theme="dark">
            {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default SystemAdmin;
