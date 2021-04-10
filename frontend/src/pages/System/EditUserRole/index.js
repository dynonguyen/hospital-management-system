import { Select } from 'antd';
import systemApi from 'apis/systemApi';
import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import helper from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function EditGrantUserRole() {
  const { usernameList, roleList } = useSelector((state) => state.system);
  const [usernameSelected, setUsernameSelected] = useState('');
  const isRole = useRef(false);

  useEffect(() => {
    let isSubscribe = true;
    (async function getUserRolePriv() {
      try {
        if (usernameSelected !== '') {
          const res = await systemApi.getUserRolePriv(usernameSelected);
          if (res) {
            console.log(res.data);
          }
        }
      } catch (error) {}
    })();

    if (!isRole.current) {
      (async function getUserRolePriv() {
        try {
          if (usernameSelected !== '') {
            const res = await systemApi.getUserRolePriv(usernameSelected);
            if (res) {
              console.log(res.data);
            }
          }
        } catch (error) {}
      })();
    }
    return () => (isSubscribe = false);
  }, [usernameSelected]);

  const onSelectChange = (val) => {
    isRole.current = val.indexOf('(ROLE)') !== -1;
    setUsernameSelected(val.split(' ')[0]);
  };

  return (
    <>
      <div className="p-lr-32 p-t-32">
        <Select
          placeholder="Select a User/Role"
          size="large"
          style={{ width: 360 }}
          showSearch
          optionFilterProp="children"
          onChange={(val) => onSelectChange(val)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {helper.renderOptions(usernameList)}
          {helper.renderOptions(roleList, true)}
        </Select>
      </div>
      {usernameSelected !== '' && (
        <GrantRevoke isEdit={true} isUser={true} username={usernameSelected} />
      )}
    </>
  );
}

export default EditGrantUserRole;
