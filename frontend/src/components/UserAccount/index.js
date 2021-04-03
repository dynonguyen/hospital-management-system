import {
  ExportOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import loginApi from 'apis/loginApi';
import avt from 'assets/icons/admin.png';
import constant from 'constant';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from 'redux/slices/user.slice';
import './index.scss';

function UserAccount() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogout = async () => {
    try {
      const response = await loginApi.postLogout();
      if (response && response.status === 200) {
        message.success('Đăng xuất thành công', 1);
        setTimeout(() => {
          dispatch(setUser(''));
        }, 1500);
      }
    } catch (error) {
      message.error('Đăng xuất thất bại');
    }
  };

  return (
    <div className="user-account">
      <div className="container flex-center--ver justify-content-end">
        {/* user information */}
        <div className="user-account-item user-account--info flex-center--ver">
          <img className="m-r-8" src={avt} alt="Avatar" />
          <h3 className="name">
            {username} <MailOutlined className="p-lr-4" />
            <span>(8)</span>
          </h3>
        </div>
        {/* account setting */}
        <div className="user-account-item user-account--setting">
          <Link to={constant.ROUTES.ACCOUNT}>
            <span>
              Tài khoản <SettingOutlined className="p-l-4" />
            </span>
          </Link>
        </div>
        {/* logout */}
        <div
          className="user-account-item user-account--logout"
          onClick={onLogout}>
          <span className="cur-pointer">
            Đăng xuất <ExportOutlined className="p-l-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
