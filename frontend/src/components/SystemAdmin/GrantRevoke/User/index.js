import { Checkbox, Form, Input, Select } from 'antd';
import React from 'react';
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
          rules={[{ required: true, message: 'Nhập username !' }]}>
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
            <Option value="sys">SYSTEM</Option>
            <Option value="temp">TEMP</Option>
            <Option value="hms">JMS</Option>
          </Select>
        </Form.Item>

        {/* temporary table */}
        <Form.Item
          name="tenpTable"
          labelAlign="left"
          label="Temporary Tablespace">
          <Select
            showSearch
            placeholder="Select a temporary tablespace"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value="sys">SYSTEM</Option>
            <Option value="temp">TEMP</Option>
            <Option value="hms">JMS</Option>
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
