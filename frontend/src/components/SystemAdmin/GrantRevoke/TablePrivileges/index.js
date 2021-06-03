import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grantAllTable, setCreateUserTable } from 'redux/slices/sql.slice';

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

  const [expandData, setExpandData] = useState(() => {
    let newData = {};
    for (const key in colTableList) {
      newData[key] = colTableList[key].map((item, index) => ({
        key: index,
        tableName: key,
        selectDisabled: false,
        updateDisabled: false,
        columnName: item,
        select: false,
        update: false,
      }));
    }
    return newData;
  });

  const onTableChecked = (checked, tableName, key) => {
    // check select, update on row then check all in column
    if (key === 'select') {
      let newData = { ...expandData };
      newData[tableName] = newData[tableName].map((item) => ({
        ...item,
        select: checked,
        selectDisabled: checked,
      }));
      setExpandData(newData);
    } else if (key === 'update') {
      let newData = { ...expandData };
      newData[tableName] = newData[tableName].map((item) => ({
        ...item,
        update: checked,
        updateDisabled: checked,
      }));
      setExpandData(newData);
    }

    // dispatch action
    dispatch(setCreateUserTable({ checked, tableName, key }));
    setDataMainTable(
      dataMainTable.map((item) =>
        item.tableName === tableName ? { ...item, [key]: checked } : item,
      ),
    );
  };

  // main column of table
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

  // expand column of table
  const onExpandChange = (record) => {};

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
      render: (value, record) => (
        <Checkbox
          onChange={(e) => onExpandChange(record)}
          disabled={record.selectDisabled}
          checked={value}
        />
      ),
      sorter: (a, b) => a.select - b.select,
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
      render: (value, record) => (
        <Checkbox disabled={record.updateDisabled} checked={value} />
      ),
      sorter: (a, b) => a.update - b.update,
    },
  ];

  //  columns table of table
  const expandedRowRender = (e) => {
    const { tableName } = e;
    return (
      <Table
        columns={expandColumns}
        dataSource={expandData[tableName]}
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
    let newExpandData = {};
    for (const key in colTableList) {
      newExpandData[key] = colTableList[key].map((item, index) => ({
        key: index,
        tableName: key,
        selectDisabled: true,
        updateDisabled: true,
        columnName: item,
        select: true,
        update: true,
      }));
    }
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
    setExpandData(newExpandData);
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
    let newExpandData = {};
    for (const key in colTableList) {
      newExpandData[key] = colTableList[key].map((item, index) => ({
        key: index,
        tableName: key,
        selectDisabled: false,
        updateDisabled: false,
        columnName: item,
        select: false,
        update: false,
      }));
    }
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
    setExpandData(newExpandData);
  };

  const handleSelectAll = (isGrant = true) => {
    let newData = dataMainTable.map((item) => ({
      ...item,
      select: isGrant,
    }));
    let newExpandData = {};
    for (const key in colTableList) {
      newExpandData[key] = expandData[key].map((item, index) => ({
        ...item,
        select: isGrant,
        selectDisabled: isGrant,
      }));
    }
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
    setExpandData(newExpandData);
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
    let newExpandData = {};
    for (const key in colTableList) {
      newExpandData[key] = expandData[key].map((item, index) => ({
        ...item,
        update: isGrant,
        updateDisabled: isGrant,
      }));
    }
    dispatch(grantAllTable(newData));
    setDataMainTable(newData);
    setExpandData(newExpandData);
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
