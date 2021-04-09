import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrantedRoles } from 'redux/slices/sql.slice';

function RoleGrantRevoke({ isEdit, isUser }) {
  const { roleList } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const [data, setData] = useState(() =>
    roleList.map((item, key) => ({
      key: key,
      roleName: item,
      granted: false,
      admin: false,
      default: false,
    })),
  );

  const onRoleChecked = async (roleName, columnVal, key) => {
    let newData = [...data];

    if (columnVal.key === 'default' && columnVal.value === true) {
      newData[key].default = true;
      newData[key].granted = true;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
      const newColVal = { key: 'granted', value: true };
      dispatch(setGrantedRoles({ roleName, columnVal: newColVal, isUser }));
    } else if (columnVal.key === 'granted' && columnVal.value === false) {
      newData[key].default = false;
      newData[key].granted = false;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
      const newColVal = { key: 'default', value: false };
      dispatch(setGrantedRoles({ roleName, columnVal: newColVal, isUser }));
    } else {
      newData[key][columnVal.key] = columnVal.value;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
    }

    setData(newData);
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      sorter: (a, b) =>
        a.roleName < b.roleName ? -1 : a.roleName > b.roleName ? 1 : 0,
    },
    {
      title: 'Granted',
      dataIndex: 'granted',
      key: 'granted',
      render: (value, record) => (
        <Checkbox
          checked={value}
          onChange={(e) =>
            onRoleChecked(
              record.roleName,
              {
                key: 'granted',
                value: e.target.checked,
              },
              record.key,
            )
          }
        />
      ),
      sorter: (a, b) => a.granted - b.granted,
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onRoleChecked(
              record.roleName,
              {
                key: 'admin',
                value: e.target.checked,
              },
              record.key,
            )
          }
          checked={value}
        />
      ),
      sorter: (a, b) => a.admin - b.admin,
    },
    {
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onRoleChecked(
              record.roleName,
              {
                key: 'default',
                value: e.target.checked,
              },
              record.key,
            )
          }
          checked={value}
        />
      ),
      sorter: (a, b) => a.default - b.default,
    },
  ];

  return (
    <div className="sa-grant-content">
      {/* control */}
      <div className="flex-center-start">
        <Button type="default">Grant All</Button>
        <Button type="default m-lr-8">Revoke All</Button>
        <Button type="default">Admin All</Button>
        <Button type="default m-lr-8">Admin None</Button>
        <Button type="default">Default All</Button>
        <Button type="default m-8">Default None</Button>
      </div>

      {/* grant table */}
      <div className="m-t-16">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          scroll={{ y: 480 }}
        />
      </div>
    </div>
  );
}

RoleGrantRevoke.propTypes = {
  isEdit: PropTypes.bool,
  isUser: PropTypes.bool,
};

RoleGrantRevoke.defaultProps = {
  isEdit: false,
  isUser: true,
};

export default RoleGrantRevoke;
