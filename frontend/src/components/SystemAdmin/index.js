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
import { Menu, message, Tooltip } from 'antd';
import loginApi from 'apis/loginApi';
import logoUrl from 'assets/images/logo.png';
import CreateUser from 'pages/System/CreateUser';
import SystemDashboard from 'pages/System/Dashboard';
import SystemUserList from 'pages/System/UserList';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from 'redux/slices/user.slice';
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

const componentRender = [
  {
    key: 'dashboard',
    component: <SystemDashboard />,
  },
  {
    key: 'user-list',
    component: <SystemUserList />,
  },
  {
    key: 'create-user',
    component: <CreateUser />,
  },
];

function renderActiveComponent(key = 'dashboard', list = []) {
  const result = list.find((item) => item.key === key);
  return result ? result.component : <></>;
}

function SystemAdmin() {
  const [inlineCollapsed, setInlineCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('create-user');
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  // event: logout
  const onLogout = async () => {
    try {
      const response = await loginApi.postLogout();
      if (response && response.status === 200) {
        message.success('Đăng xuất thành công', 1);
        setTimeout(() => {
          dispatch(setUser('', []));
        }, 1500);
      }
    } catch (error) {
      message.error('Đăng xuất thất bại');
    }
  };

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
              <span className="fw-b">{username}</span>
            </li>
            <li className="info-item d-flex" onClick={onLogout}>
              <ExportOutlined className="icon m-r-4" />
              <span className="fw-b">Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-grow-1">
        {/* Menu */}
        <div
          className={`system-admin-menu ${inlineCollapsed ? 'collapsed' : ''}`}>
          <Menu
            className="h-100"
            // defaultSelectedKeys={menuList[0].key}
            defaultSelectedKeys="create-user"
            defaultOpenKeys="privileges"
            inlineCollapsed={inlineCollapsed}
            mode="inline"
            theme="dark">
            {renderMenu(menuList)}
          </Menu>
        </div>

        {/* Content */}
        <div className="flex-grow-1 pos-rel">
          {renderActiveComponent(activeKey, componentRender)}
        </div>
      </div>
    </div>
  );
}

export default SystemAdmin;
