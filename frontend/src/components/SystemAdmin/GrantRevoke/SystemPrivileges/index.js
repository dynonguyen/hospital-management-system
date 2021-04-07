import { Button, Checkbox, Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Privilege',
    dataIndex: 'privilege',
    key: 'privilege',
    sorter: (a, b) =>
      a.privilege < a.privilege ? -1 : a.privilege > b.privilege ? 1 : 0,
  },
  {
    title: 'Granted',
    dataIndex: 'granted',
    key: 'granted',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.granted - b.granted,
  },
  {
    title: 'Admin Option',
    dataIndex: 'admin',
    key: 'admin',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.admin - b.admin,
  },
];

// fake data

const data = (function fake() {
  let res = [];
  for (let i = 0; i < 20; ++i) {
    res.push({
      key: i,
      privilege: `CREATE ${i}`,
      granted: i % 3 === 0,
      admin: i % 2 === 0,
    });
  }
  return res;
})();

function SystemPrivGrantRevoke() {
  return (
    <div className="sa-grant-content">
      {/* control */}
      <div className="flex-center-start">
        <Button type="default">Grant All</Button>
        <Button type="default m-lr-8">Revoke All</Button>
        <Button type="default">Admin All</Button>
        <Button type="default m-8">Admin None</Button>
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

export default SystemPrivGrantRevoke;
