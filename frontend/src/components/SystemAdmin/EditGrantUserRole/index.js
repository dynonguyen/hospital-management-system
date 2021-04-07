import { Select } from 'antd';
import React from 'react';
import GrantRevoke from '../GrantRevoke';
const { Option } = Select;
function EditGrantUserRole() {
  return (
    <>
      <div className="p-lr-32 p-t-32">
        <Select
          placeholder="Select a Role/User"
          size="large"
          style={{ width: 360 }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          <Option value="1">Admin (User)</Option>
          <Option value="2">Sys_Admin (Role)</Option>
        </Select>
      </div>
      <GrantRevoke isEdit={true} />
    </>
  );
}

export default EditGrantUserRole;
