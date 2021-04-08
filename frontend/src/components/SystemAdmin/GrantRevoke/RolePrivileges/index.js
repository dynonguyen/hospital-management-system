import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

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
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.granted - b.granted,
  },
  {
    title: 'Admin',
    dataIndex: 'admin',
    key: 'admin',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.admin - b.admin,
  },
  {
    title: 'Default',
    dataIndex: 'default',
    key: 'default',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.default - b.default,
  },
];

function RoleGrantRevoke({ isEdit }) {
  const { roleList } = useSelector((state) => state.system);
  const data = roleList.map((item, key) => ({
    key: key,
    roleName: item,
    granted: false,
    admin: false,
    default: false,
  }));
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
};

RoleGrantRevoke.defaultProps = {
  isEdit: false,
};

export default RoleGrantRevoke;
