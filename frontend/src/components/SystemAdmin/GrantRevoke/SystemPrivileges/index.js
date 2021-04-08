import { Button, Checkbox, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const columns = [
  {
    title: 'Privilege',
    dataIndex: 'privilege',
    key: 'privilege',
    sorter: (a, b) =>
      a.privilege < b.privilege ? -1 : a.privilege > b.privilege ? 1 : 0,
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

function SystemPrivGrantRevoke() {
  const { sysPrivList } = useSelector((state) => state.system);
  const data = sysPrivList.map((item, key) => ({
    key,
    privilege: item,
    granted: false,
    admin: false,
  }));

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
