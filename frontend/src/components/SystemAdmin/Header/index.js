import {
  BellOutlined,
  ExportOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logoUrl from 'assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
function SystemAdminHeader() {
  return (
    <div className="system-admin-header flex-center--ver">
      <div className="brand flex-center--ver h-100">
        <Link to="/">
          <img src={logoUrl} alt="Logo" />
        </Link>
        <h1 className="m-l-8">HOSMS</h1>
      </div>
      <ul className="info flex-center--ver justify-content-end w-100 h-100">
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
  );
}

export default SystemAdminHeader;
