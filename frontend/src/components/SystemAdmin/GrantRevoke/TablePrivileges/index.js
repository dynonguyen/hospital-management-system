import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grantAllTable, setCreateUserTable } from 'redux/slices/sql.slice';

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

function TablePrivGrantRevoke({ isUser, isEdit }) {
  const dispatch = useDispatch();
  const { grantedTable } = useSelector((state) => state.userRole);
  const { userTableList, colTableList } = useSelector((state) => state.system);
  const [dataMainTable, setDataMainTable] = useState(() => {
    return isEdit
      ? userTableList.map((item, key) => {
          const index = grantedTable.findIndex((i) => i.tableName === item);
          if (index === -1)
            return {
              key,
              tableName: item,
              select: false,
              insert: false,
              update: false,
              delete: false,
            };
          return {
            key,
            tableName: item,
            select: grantedTable[index].select,
            insert: grantedTable[index].insert,
            update: grantedTable[index].update,
            delete: grantedTable[index].delete,
          };
        })
      : userTableList.map((item, key) => ({
          key,
          tableName: item,
          select: false,
          insert: false,
          update: false,
          delete: false,
          grantOption: false,
        }));
  });

  const onTableChecked = (checked, tableName, key) => {
    dispatch(setCreateUserTable({ checked, tableName, key }));
    setDataMainTable(
      dataMainTable.map((item) =>
        item.tableName === tableName ? { ...item, [key]: checked } : item,
      ),
    );
  };

  let mainColumns = [
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
          onChange={(e) => {
            onTableChecked(e.target.checked, record.tableName, 'select');
          }}
          checked={value}
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
          checked={value}
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
          checked={value}
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
          checked={value}
        />
      ),
    },
  ];

  if (isUser && !isEdit)
    mainColumns.push({
      title: 'Grant Option',
      dataIndex: 'grantOption',
      key: 'grantOption',
      render: (value, record) => (
        <Checkbox
          onChange={(e) =>
            onTableChecked(e.target.checked, record.tableName, 'grantOption')
          }
          checked={value}
        />
      ),
    });

  //  columns table of table
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

  // event control button
  const handleGrantAll = () => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      select: true,
      insert: true,
      update: true,
      delete: true,
      grantOption: true,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  const handleRevokeAll = () => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      select: false,
      insert: false,
      update: false,
      delete: false,
      grantOption: false,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  const handleSelectAll = (isGrant = true) => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      select: isGrant,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  const handleInsertAll = (isGrant = true) => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      insert: isGrant,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  const handleUpdateAll = (isGrant = true) => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      update: isGrant,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  const handleDeleteAll = (isGrant = true) => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      delete: isGrant,
    }));
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
  };

  return (
    <div className="sa-grant-content">
      {/* control */}
      {!isEdit && (
        <div className="flex-center-start">
          <Button type="default" onClick={handleGrantAll}>
            Grant All
          </Button>
          <Button type="default m-lr-8" onClick={handleRevokeAll}>
            Revoke All
          </Button>
          <Button type="default" onClick={() => handleSelectAll(true)}>
            Select All
          </Button>
          <Button type="default m-lr-8" onClick={() => handleSelectAll(false)}>
            Select None
          </Button>
          <Button type="default" onClick={() => handleInsertAll(true)}>
            Insert All
          </Button>
          <Button type="default m-lr-8" onClick={() => handleInsertAll(false)}>
            Insert None
          </Button>
          <Button type="default" onClick={() => handleUpdateAll(true)}>
            Update All
          </Button>
          <Button type="default m-lr-8" onClick={() => handleUpdateAll(false)}>
            Update None
          </Button>
          <Button type="default" onClick={() => handleDeleteAll(true)}>
            Delete All
          </Button>
          <Button type="default m-8" onClick={() => handleDeleteAll(false)}>
            Delete None
          </Button>
        </div>
      )}

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

TablePrivGrantRevoke.propTypes = {
  isUser: PropTypes.bool,
  isEdit: PropTypes.bool,
};

TablePrivGrantRevoke.defaultProps = {
  isUser: true,
  isEdit: false,
};

export default TablePrivGrantRevoke;
