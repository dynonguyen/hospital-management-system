import PropTypes from 'prop-types';
import { Button, Checkbox, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrantedPrivs } from 'redux/slices/sql.slice';

function SystemPrivGrantRevoke({ isUser }) {
  const { sysPrivList } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const data = sysPrivList.map((item, key) => ({
    key,
    privilege: item,
    granted: false,
    admin: false,
  }));
  const onPrivChecked = async (privilege, columnVal) => {
    dispatch(setGrantedPrivs({ privilege, columnVal, isUser }));
  };

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
      render: (value, record) => (
        <Checkbox
          defaultChecked={value}
          onChange={(e) =>
            onPrivChecked(record.privilege, {
              key: 'granted',
              value: e.target.checked,
            })
          }
        />
      ),
      sorter: (a, b) => a.granted - b.granted,
    },
    {
      title: 'Admin Option',
      dataIndex: 'admin',
      key: 'admin',
      render: (value, record) => (
        <Checkbox
          defaultChecked={value}
          onChange={(e) =>
            onPrivChecked(record.privilege, {
              key: 'admin',
              value: e.target.checked,
            })
          }
        />
      ),
      sorter: (a, b) => a.admin - b.admin,
    },
  ];

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

SystemPrivGrantRevoke.propTypes = {
  isUser: PropTypes.bool,
};

SystemPrivGrantRevoke.defaultProps = {
  isUser: true,
};

export default SystemPrivGrantRevoke;
