import {
  ExportOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function UserAccount({ avt, userName, onLogout }) {
  return (
    <div className="user-account">
      <div className="container flex-center--ver justify-content-end">
        {/* user information */}
        <div className="user-account-item user-account--info flex-center--ver">
          <img className="m-r-8" src={avt} alt="Avatar" />
          <h3 className="name">
            {userName} <MailOutlined className="p-lr-4" />
            <span>(8)</span>
          </h3>
        </div>
        {/* account setting */}
        <div className="user-account-item user-account--setting">
          <Link to="/">
            <span>
              Tài khoản <SettingOutlined className="p-l-4" />
            </span>
          </Link>
        </div>
        {/* logout */}
        <div className="user-account-item user-account--logout">
          <span className="cur-pointer">
            Đăng xuất <ExportOutlined className="p-l-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

// check prop types
UserAccount.propTypes = {
  onLogout: PropTypes.func,
  userName: PropTypes.string,
  avt: PropTypes.string,
};

UserAccount.defaultProps = {
  onLogout: () => {},
  avt: 'https://picsum.photos/200',
  userName: 'Anonymous',
};

export default UserAccount;
