import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  grantAllRole,
  setEditUserRole,
  setGrantedRoles,
} from 'redux/slices/sql.slice';

function RoleGrantRevoke({ isEdit, isUser }) {
  const { roleList } = useSelector((state) => state.system);
  const { grantedRole } = useSelector((state) => state.userRole);
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

  const onRoleChecked = (roleName, columnVal, key) => {
    let newData = [...data];
    if (columnVal.key === 'default' && columnVal.value === true) {
      newData[key].default = true;
      newData[key].granted = true;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
      const newColVal = { key: 'granted', value: true };
      dispatch(setGrantedRoles({ roleName, columnVal: newColVal, isUser }));
    } else if (columnVal.key === 'admin' && columnVal.value === true) {
      newData[key].admin = true;
      newData[key].granted = true;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
      const newColVal = { key: 'granted', value: true };
      dispatch(setGrantedRoles({ roleName, columnVal: newColVal, isUser }));
    } else if (columnVal.key === 'granted' && columnVal.value === false) {
      newData[key].default = false;
      newData[key].granted = false;
      newData[key].admin = false;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
      const newColVal = { key: 'default', value: false };
      dispatch(setGrantedRoles({ roleName, columnVal: newColVal, isUser }));
    } else {
      newData[key][columnVal.key] = columnVal.value;
      dispatch(setGrantedRoles({ roleName, columnVal, isUser }));
    }

    setData(newData);
  };

  const onEditRoleChecked = (e, key, checkedKey) => {
    const { checked } = e.target;

    let newData = data.map((item) => {
      if (item.key === key) {
        if (checkedKey === 'granted' && checked === false) {
          item[checkedKey] = false;
          item.default = false;
          item.admin = false;
        } else if (
          (checkedKey === 'admin' || checkedKey === 'default') &&
          checked === true
        ) {
          item[checkedKey] = true;
          item.granted = true;
        } else {
          item[checkedKey] = checked;
        }
        dispatch(
          setEditUserRole({
            ...item,
            key,
          }),
        );
      }

      return item;
    });

    setData(newData);
  };

  let columns = [
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
          onChange={
            isEdit
              ? (e) => onEditRoleChecked(e, record.key, 'granted')
              : (e) =>
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
          onChange={
            isEdit
              ? (e) => onEditRoleChecked(e, record.key, 'admin')
              : (e) =>
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
  ];

  if (isUser)
    columns.push({
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
      render: (value, record) => (
        <Checkbox
          onChange={
            isEdit
              ? (e) => onEditRoleChecked(e, record.key, 'default')
              : (e) =>
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
    });

  useEffect(() => {
    if (isEdit) {
      let newData = [...data];
      grantedRole.forEach((item, key) => {
        const index = newData.findIndex((i) => i.roleName === item.roleName);
        newData[index] = { ...item, key: `revoke-${key}` };
      });
      setData(newData);
    }
    return () => {};
  }, []);

  // event control option
  const handleGrantAll = () => {
    let newData = data.map((item) => ({ ...item, granted: true }));
    dispatch(
      grantAllRole({
        list: newData.map((item) => ({
          roleName: item.roleName,
          granted: item.granted,
          default: item.default,
          admin: item.admin,
        })),
        isUser,
      }),
    );
    setData(newData);
  };

  const handleRevokeAll = () => {
    let newData = data.map((item) => ({
      ...item,
      granted: false,
      admin: false,
      default: false,
    }));
    dispatch(grantAllRole({ list: [], isUser }));
    setData(newData);
  };

  const handleAdminAll = () => {
    let newData = data.map((item) => ({
      ...item,
      granted: true,
      admin: true,
    }));
    dispatch(grantAllRole({ list: newData, isUser }));
    setData(newData);
  };

  const handleAdminNone = () => {
    let newData = data.map((item) => ({
      ...item,
      admin: false,
    }));
    dispatch(grantAllRole({ list: newData, isUser }));
    setData(newData);
  };

  const handleDefaultAll = () => {
    let newData = data.map((item) => ({
      ...item,
      granted: true,
      default: true,
    }));
    dispatch(grantAllRole({ list: newData, isUser }));
    setData(newData);
  };

  const handleDefaultNone = () => {
    let newData = data.map((item) => ({
      ...item,
      default: false,
    }));
    dispatch(grantAllRole({ list: newData, isUser }));
    setData(newData);
  };

  return (
    <div className="sa-grant-content">
      {/* control */}
      <div className="flex-center-start">
        <Button type="default" onClick={handleGrantAll}>
          Grant All
        </Button>
        <Button type="default m-lr-8" onClick={handleRevokeAll}>
          Revoke All
        </Button>
        <Button type="default" onClick={handleAdminAll}>
          Admin All
        </Button>
        <Button type="default m-lr-8" onClick={handleAdminNone}>
          Admin None
        </Button>
        {isUser && (
          <>
            <Button type="default" onClick={handleDefaultAll}>
              Default All
            </Button>
            <Button type="default m-8" onClick={handleDefaultNone}>
              Default None
            </Button>
          </>
        )}
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
