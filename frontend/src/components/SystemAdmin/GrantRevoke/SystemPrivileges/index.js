import { Button, Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrantedPrivs } from 'redux/slices/sql.slice';

function SystemPrivGrantRevoke({ isUser, isEdit }) {
  const { sysPrivList } = useSelector((state) => state.system);
  const { grantedPriv } = useSelector((state) => state.userRole);

  const dispatch = useDispatch();
  const [data, setData] = useState(() =>
    sysPrivList.map((item, key) => ({
      key,
      privilege: item,
      granted: false,
      admin: false,
    })),
  );

  const onPrivChecked = async (privilege, columnVal, key) => {
    let newData = [...data];
    if (columnVal.key === 'admin' && columnVal.value === true) {
      newData[key].granted = true;
      newData[key].admin = true;
      dispatch(setGrantedPrivs({ privilege, columnVal, isUser }));
      const newColVal = { key: 'granted', value: true };
      dispatch(setGrantedPrivs({ privilege, columnVal: newColVal, isUser }));
    } else if (columnVal.key === 'granted' && columnVal.value === false) {
      newData[key].granted = false;
      newData[key].admin = false;
      dispatch(setGrantedPrivs({ privilege, columnVal, isUser }));
      const newColVal = { key: 'admin', value: false };
      dispatch(setGrantedPrivs({ privilege, columnVal: newColVal, isUser }));
    } else {
      newData[key][columnVal.key] = columnVal.value;
      dispatch(setGrantedPrivs({ privilege, columnVal, isUser }));
    }

    setData(newData);
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
          checked={value}
          onChange={(e) =>
            onPrivChecked(
              record.privilege,
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
      title: 'Admin Option',
      dataIndex: 'admin',
      key: 'admin',
      render: (value, record) => (
        <Checkbox
          checked={value}
          onChange={(e) =>
            onPrivChecked(
              record.privilege,
              {
                key: 'admin',
                value: e.target.checked,
              },
              record.key,
            )
          }
        />
      ),
      sorter: (a, b) => a.admin - b.admin,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      let newData = [...data];
      grantedPriv.forEach((item, key) => {
        const index = newData.findIndex((i) => i.privilege === item.privilege);
        newData[index] = { ...item, key: `key-${key}` };
      });
      setData(newData);
    }
    return () => {};
  }, []);

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
  isEdit: PropTypes.bool,
};

SystemPrivGrantRevoke.defaultProps = {
  isUser: true,
  isEdit: false,
};

export default SystemPrivGrantRevoke;
