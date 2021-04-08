import { Select } from 'antd';
import helper from 'helper';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GrantRevoke from '../GrantRevoke';
const { Option } = Select;

function EditGrantUserRole() {
  const { usernameList } = useSelector((state) => state.system);
  const [usernameSelected, setUsernameSelected] = useState('');
  return (
    <>
      <div className="p-lr-32 p-t-32">
        <Select
          placeholder="Select a Role/User"
          size="large"
          style={{ width: 360 }}
          showSearch
          optionFilterProp="children"
          onChange={(val) => setUsernameSelected(val)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {helper.renderOptions(usernameList)}
        </Select>
      </div>
      {usernameSelected !== '' && (
        <GrantRevoke isEdit={true} username={usernameSelected} />
      )}
    </>
  );
}

export default EditGrantUserRole;
