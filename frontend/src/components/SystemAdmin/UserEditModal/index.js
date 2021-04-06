import { Form, Input, Modal, Switch } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function UserEditUser({ username, isLocked, onFinishEdit, onCancel }) {
  return (
    <Modal
      visible={true}
      onCancel={onCancel}
      title={`Chỉnh sửa người dùng ${username}`}
      centered
      okButtonProps={{ htmlType: 'submit', form: 'basic' }}>
      <Form
        name="basic"
        initialValues={{ password: '', confirmPw: '', isLocked }}
        {...formItemLayout}
        onFinish={(value) => onFinishEdit(value)}>
        <Form.Item
          label="New Password"
          name="password"
          hasFeedback
          rules={[{ min: 4, message: 'Mật khẩu tối thiểu 4 ký tự!' }]}>
          <Input.Password autoFocus maxLength={20} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPw"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
          hasFeedback>
          <Input.Password maxLength={20} />
        </Form.Item>
        <Form.Item
          label="Account is locked"
          name="isLocked"
          valuePropName="checked">
          <Switch defaultChecked={isLocked} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserEditUser.propTypes = {
  isLocked: PropTypes.bool,
  username: PropTypes.string,
  onFinishEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

UserEditUser.defaultProps = {
  isLocked: false,
  username: 'User',
  onFinishEdit: function () {},
  onCancel: function () {},
};

export default UserEditUser;
