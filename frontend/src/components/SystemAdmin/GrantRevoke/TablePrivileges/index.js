import { Button, Checkbox, Table } from 'antd';
import React from 'react';

// fake data
const data = (function fake() {
  let res = [];
  for (let i = 0; i < 10; ++i) {
    res.push({
      key: i,
      tableName: `TABLE ${i}`,
      select: i % 3 === 0,
      insert: i % 2 === 0,
      update: i % 5 === 0,
      delete: i % 3 === 0,
    });
  }
  return res;
})();
const data2 = (function fake() {
  let res = [];
  for (let i = 0; i < 10; ++i) {
    res.push({
      key: i,
      columnName: `COLUMN ${i}`,
      select: true,
      insert: true,
      update: true,
      delete: true,
    });
  }
  return res;
})();

var commonColumns = (isExpand = false) => {
  return [
    {
      title: isExpand ? 'Column' : 'Table',
      dataIndex: isExpand ? 'columnName' : 'tableName',
      key: isExpand ? 'columnName' : 'tableName',
      sorter: (a, b) => {
        if (isExpand) {
          return a.columnName < a.columnName
            ? -1
            : a.columnName > b.columnName
            ? 1
            : 0;
        } else {
          return a.tableName < a.tableName
            ? -1
            : a.tableName > b.tableName
            ? 1
            : 0;
        }
      },
    },
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (value) => <Checkbox defaultChecked={value} />,
      sorter: (a, b) => a.select - b.select,
    },
    {
      title: 'Insert',
      dataIndex: 'insert',
      key: 'insert',
      render: (value) => <Checkbox defaultChecked={value} />,
      sorter: (a, b) => a.insert - b.insert,
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
      render: (value) => <Checkbox defaultChecked={value} />,
      sorter: (a, b) => a.update - b.update,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value) => <Checkbox defaultChecked={value} />,
      sorter: (a, b) => a.delete - b.delete,
    },
  ];
};

//  columns table of table :">
const expandedRowRender = () => {
  return (
    <Table
      columns={commonColumns(true)}
      dataSource={data2}
      pagination={false}
    />
  );
};

function TablePrivGrantRevoke() {
  return (
    <div className="sa-grant-content">
      {/* control */}
      <div className="flex-center-start">
        <Button type="default">Grant All</Button>
        <Button type="default m-lr-8">Revoke All</Button>
        <Button type="default">Select All</Button>
        <Button type="default m-lr-8">Select None</Button>
        <Button type="default">Insert All</Button>
        <Button type="default m-lr-8">Insert None</Button>
        <Button type="default">Update All</Button>
        <Button type="default m-lr-8">Update None</Button>
        <Button type="default">Delete All</Button>
        <Button type="default m-8">Delete None</Button>
      </div>

      {/* grant table */}
      <div className="m-t-16">
        <Table
          columns={commonColumns(false)}
          dataSource={data}
          bordered
          pagination={false}
          scroll={{ y: 480 }}
          expandable={{
            expandedRowRender,
          }}
        />
      </div>
    </div>
  );
}

export default TablePrivGrantRevoke;
