import { Button, Checkbox, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUserTable } from 'redux/slices/sql.slice';

const expandColumns = [
  {
    title: 'Column',
    dataIndex: 'columnName',
    key: 'columnName',
    sorter: (a, b) =>
      a.columnName < b.columnName ? -1 : a.columnName > b.columnName ? 1 : 0,
  },
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.select - b.select,
  },
  {
    title: 'Update',
    dataIndex: 'update',
    key: 'update',
    render: (value) => <Checkbox defaultChecked={value} />,
    sorter: (a, b) => a.update - b.update,
  },
];

function TablePrivGrantRevoke() {
  const dispatch = useDispatch();
  const { userTableList, colTableList } = useSelector((state) => state.system);
  const dataMainTable = userTableList.map((item, key) => ({
    key,
    tableName: item,
    select: false,
    insert: false,
    update: false,
    delete: false,
    grantOption: false,
  }));

  const onTableChecked = (checked, tableName, key) => {
    dispatch(setCreateUserTable({ checked, tableName, key }));
  };

  const mainColumns = [
    {
      title: 'Table',
      dataIndex: 'tableName',
      key: 'tableName',
      sorter: (a, b) =>
        a.tableName < b.tableName ? -1 : a.tableName > b.tableName ? 1 : 0,
    },
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'select')
          }
          defaultChecked={value}
        />
      ),
    },
    {
      title: 'Insert',
      dataIndex: 'insert',
      key: 'insert',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'insert')
          }
          defaultChecked={value}
        />
      ),
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'update')
          }
          defaultChecked={value}
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'delete')
          }
          defaultChecked={value}
        />
      ),
    },
    {
      title: 'Grant Option',
      dataIndex: 'grantOption',
      key: 'grantOption',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'grantOption')
          }
          defaultChecked={value}
        />
      ),
    },
  ];

  //  columns table of table :">
  const expandedRowRender = (e) => {
    const { tableName } = e;

    const expandData = colTableList[tableName].map((item, key) => ({
      key,
      columnName: item,
      select: false,
      update: false,
    }));

    return (
      <Table
        columns={expandColumns}
        dataSource={expandData}
        pagination={false}
      />
    );
  };

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
          columns={mainColumns}
          dataSource={dataMainTable}
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
