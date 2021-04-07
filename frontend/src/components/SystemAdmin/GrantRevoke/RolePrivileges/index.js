import { Button, Checkbox, Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Role Name',
    dataIndex: 'roleName',
    key: 'roleName',
    sorter: (a, b) =>
      a.roleName < a.roleName ? -1 : a.roleName > b.roleName ? 1 : 0,
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

// fake data

const data = (function fake() {
  let res = [];
  for (let i = 0; i < 20; ++i) {
    res.push({
      key: i,
      roleName: `SYS_ADMIN ${i}`,
      granted: i % 3 === 0,
      admin: i % 2 === 0,
      default: i % 4 === 0,
    });
  }
  return res;
})();

function RoleGrantRevoke() {
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

export default RoleGrantRevoke;
