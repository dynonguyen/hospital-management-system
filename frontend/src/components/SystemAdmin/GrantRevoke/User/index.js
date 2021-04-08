import { Checkbox, Form, Input, Select } from 'antd';
import helper from 'helper';
import React from 'react';
import { useSelector } from 'react-redux';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 20 },
  },
};

function UserGrantRevoke() {
  const { tableSpaceList, tempTableSpaceList } = useSelector(
    (state) => state.system,
  );
  return (
    <div className="sa-grant-content">
      <Form
        {...formItemLayout}
        name="grant-form"
        onFinish={(value) => console.log(value)}>
        {/* username */}
        <Form.Item
          name="username"
          labelAlign="left"
          label="User Name"
          rules={[
            { required: true, message: 'Nhập username !' },
            {
              validator(_, value) {
                if (
                  value.trim() !== '' &&
                  /^([a-z]|[A-Z])+(_|\d|\w)*$/gi.test(value.trim()) === false
                )
                  return Promise.reject(
                    new Error(
                      'Tên người dùng không hợp lệ ! Ví dụ tên đúng: User, User01, User_01',
                    ),
                  );
                return Promise.resolve();
              },
            },
          ]}>
          <Input autoFocus maxLength={40} />
        </Form.Item>

        {/* password */}
        <Form.Item
          name="password"
          labelAlign="left"
          label="New Password"
          hasFeedback
          rules={[
            { required: true, message: 'Nhập password !' },
            { min: 4, message: 'Mật khẩu tối thiểu 4 ký tự!' },
          ]}>
          <Input.Password maxLength={20} />
        </Form.Item>

        {/* confirm password */}
        <Form.Item
          label="Confirm Password"
          name="confirmPw"
          labelAlign="left"
          rules={[
            { required: true, message: 'Xác nhận mật khẩu !' },
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

        {/* default table */}
        <Form.Item
          name="defaultTable"
          labelAlign="left"
          label="Default Tablespace">
          <Select
            showSearch
            placeholder="Select a default tablespace"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {helper.renderOptions(tableSpaceList)}
          </Select>
        </Form.Item>

        {/* temporary table */}
        <Form.Item
          name="tempTable"
          labelAlign="left"
          label="Temporary Tablespace">
          <Select
            showSearch
            placeholder="Select a temporary tablespace"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {helper.renderOptions(tempTableSpaceList)}
          </Select>
        </Form.Item>

        {/* locked account */}
        <Form.Item
          labelAlign="left"
          label="Account is Locked"
          name="isLocked"
          valuePropName="checked">
          <Checkbox defaultChecked={false} />
        </Form.Item>

        {/* edition enabled */}
        <Form.Item
          className="m-0"
          labelAlign="left"
          label="Edition Enabled"
          name="edition"
          valuePropName="checked">
          <Checkbox defaultChecked={false} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserGrantRevoke;
