import { ExclamationCircleOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, message, Modal } from 'antd';
import loginApi from 'apis/loginApi';
import logoUrl from 'assets/images/logo.png';
import FieldInput from 'components/Custom/FieldInput';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './index.scss';

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Nhập username')
    .max(50, 'Tối đa 50 ký tự'),
  password: yup.string().trim().required('Nhập password'),
});

function LoginPage() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const inputRef = useRef(null);

  const onLogin = async ({ username, password }) => {
    try {
      const response = await loginApi.postLogin(username, password);
      if (response && response.status === 200) {
        message.success(response.data.message, 2);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error(
          'Đăng nhập thất bại. Người dùng không tồn tại hoắc sai mật khẩu',
          2,
        );
      }
    }
  };

  // modal
  function confirm() {
    Modal.confirm({
      title: 'Quên mật khẩu ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Vui lòng liên hệ Quản trị viên để nhận lại mật khẩu. Cảm ơn',
      okText: 'OK',
    });
  }
  // auto focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="login flex-center--ver flex-dir-col">
        <div className="d-flex flex-dir-col align-i-center">
          <Link to="/">
            <img className="m-b-8" src={logoUrl} alt="Photo" />
          </Link>
          <h1 className="t-center">HOPMS - Đăng nhập</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onLogin)}>
          <FieldInput
            label="Tên đăng nhập"
            onlyLabel={true}
            name="username"
            placeholder="Tên đăng nhập"
            register={(e) => {
              register(e, { required: true });
              inputRef.current = e;
            }}
            errors={errors.username}
          />

          <div className="m-t-8 m-b-24">
            <FieldInput
              label="Mật khẩu"
              onlyLabel={true}
              name="password"
              placeholder="Mật khẩu"
              register={register}
              errors={errors.password}
              type="password"
            />
          </div>

          <div className="flex-center-between">
            <span className="forgot-pw" onClick={confirm}>
              Quên mật khẩu?
            </span>
            <Button
              type="primary"
              className="w-50"
              size="large"
              htmlType="submit">
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
